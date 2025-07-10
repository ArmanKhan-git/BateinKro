import React, { Component } from 'react'
import { useChatStore } from '../store/useChatStore'
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected"
import ChatContainer from "../components/ChatContainer"


const HomePage = () => {
  const {selectedUser, }=useChatStore()
  return (
    
    <>
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)] ">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected/> : <ChatContainer/>} {/*mene !selectedUser isliye liya hai kyuki store mere selectedUser ki value null hai jo ki false hoti hai to agar me ! naa lagau to mera false component jo hai ChatContainer wo render hoga jo ki galat hojayega isliye mene !selectedUser use kiya jisse ye true ho jaye oor true condition(noChatSelected) wala render kre */}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default HomePage

