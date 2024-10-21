import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from "../conf/conf.js";

export class Service {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client.setEndpoint(conf.appwrite_url).setProject(conf.project_id);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.database_id,
        conf.collection_id,
        slug,
        { title, content, featuredImage, status, userId }
      );
    } catch (error) {
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.database_id,
        conf.collection_id,
        slug,
        {
          title,
          content,
          status,
          featuredImage,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.database_id,
        conf.collection_id,
        slug
      );
      return true;
    } catch (error) {
      throw error;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.database_id,
        conf.collection_id,
        slug
      );
    } catch (error) {
      throw error;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.database_id,
        conf.collection_id,
        queries
      );
    } catch (error) {
      throw error;
    }
  }

  // File Upload Service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(conf.bucket_id, ID.unique(), file);
    } catch (error) {
      throw error;
    }
  }

  async deleteFile(fileID) {
    try {
      await this.bucket.deleteFile(conf.bucket_id, fileID);
      return true;
    } catch (error) {
      throw error;
    }
  }

  getFilePreview(fileID) {
    return this.bucket.getFilePreview(conf.bucket_id, fileID);
  }
}

const service = new Service();

export default service;
