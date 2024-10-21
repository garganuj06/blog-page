import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authservice from '../Appwrite/auth'
import { useSelector } from 'react-redux'


// Mechanism to protect routes and pages

function Protected({children,authentication=true}) {
    const navigate=useNavigate()
    const [loader,setLoader]=useState(true)
    const authStatus=useSelector((state)=>state.status)

    useEffect(()=>{
        if(authentication && authStatus!==authentication){
            navigate("/login")
        }else if(!authentication && authStatus!==authentication){
            navigate("/")
        }
        setLoader(false)
    },[navigate,authentication,authStatus])
  return (
    loader?<h1>Loading..</h1>:<>{children}</>
  )
}

export default Protected