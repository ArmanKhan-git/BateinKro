import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { Routes,Route, Navigate } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import HomePage from './pages/HomePage'
import LogInPage from './pages/LogInPage'
import SettingPage from './pages/SettingPage'
import ProfilePage from './pages/ProfilePage'
import './App.css'
import { axiosInstance } from './lib/axios'
import { useAuthStore } from './store/useAuthStore'
import {Loader} from "lucide-react"
import { Toaster } from 'react-hot-toast'


function App() {
 const {authUser,checkAuth,isCheckingAuth,onlineUsers}=useAuthStore()
 console.log({onlineUsers})

 useEffect(()=>{
  checkAuth();
 },[checkAuth])

  console.log({authUser})

  if(isCheckingAuth && !authUser)
    return(
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    )

  return (
  <div>
    <Navbar />

    <Routes>
      <Route path='/' element={authUser ? <HomePage /> : <Navigate to ="/login" />}/>
      <Route path='/signup' element={!authUser ? <SignUpPage />: <Navigate to = "/"/>}/>
      <Route path='/login' element={!authUser ? <LogInPage />: <Navigate to = "/"/>}/>
      <Route path='/themes' element={<SettingPage />}/>
      <Route path='/profile' element={authUser ?<ProfilePage />: <Navigate to ="/login" />}/>

    </Routes>
    <Toaster/>

  </div>

   
  )
}

export default App
