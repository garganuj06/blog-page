import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.js";

export class AuthService{
    client=new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwrite_url)
            .setProject(conf.project_id);
            this.account=new Account(this.client);
    }

    async createAccount({email,password,name}){
        try {
            const userAccount=await this.account.create(ID.unique(),email,password,name);
            if (userAccount) {
                // login
                console.log(userAccount);
                
                return this.login({email,password});
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email,password}){
        try {
            console.log("logging in...");
            
            return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            throw error;
        }
    }

    async getUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getUser :: error", error);
        }
        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }

}

const authservice= new AuthService()

export default authservice
