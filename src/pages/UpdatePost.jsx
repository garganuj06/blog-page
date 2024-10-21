import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import service from '../Appwrite/config';
import { Container, Postform } from '../comp';

function UpdatePost() {
    const [post,setPost]=useState()
    const {slug}=useParams();
    const navigate=useNavigate();

    useEffect(()=>{
        if(slug){
            service.getPost(slug).then((post)=>{
                if(post){
                    setPost(post)
                }
            })
        }else{
            navigate('/')
        }
    },[navigate,slug])

  return post? <div className='py-8'>
    <Container>
        <Postform post={post}/>
    </Container>
  </div>:null
}

export default UpdatePost