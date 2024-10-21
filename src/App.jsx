import React,{useState,useEffect} from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import {login,logout} from "./redux/authSlice"
import authservice from './Appwrite/auth'
import { Header,Footer } from './comp'
import { Outlet } from 'react-router-dom'

function App() {
  // console.log(import.meta.env.VITE_APPWRITE_URL)
  const [loading, setLoading] = useState(true)

  const dispatch=useDispatch()

  useEffect(()=>{
    authservice.getUser()
    .then((userData)=>{
      if(userData){
        dispatch(login(userData))
      }else{
        dispatch(logout())
      }
    })
    .finally(setLoading(false))
  },[])

  return loading?(<div>Loading...</div>):(
  <div className='min-h-screen flex flex-wrap content-between bg-gray-500'>
    <div className='w-full h-screen block'>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  </div>)
}

export default App
