import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'
import { LogOut, MessageSquare,Paintbrush,Settings,User } from 'lucide-react'

const Navbar = () => {
  const { logout, authUser } = useAuthStore()

  return (
    <>
   
      <header className='bg-base-100  border-b border-base-300 fixed w-full top-0 z-40 
     backdrop-blur-lg bg-base-100/80'>

        <div className="container mx-auto  px-4 h-16">
          <div className="flex items-center  justify-between h-full">
            <div className="flex items-center  gap-8">
              {/* leftside */}
              <Link to="/" className='flex items-center gap-2.5 hover:opacity-80 transition-all'>
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageSquare className='w-5 h-5 text-primary' />
                </div>
                <h1 className='text-lg font-bold'>ChatKro</h1>
              </Link>
            </div>

            {/* rightside */}
            <div className="flex items-center gap-2">
              <Link to= {"/themes"} className="btn btn-sm gap-2 transition-colors">
              <Paintbrush className='w-4 h-4' />
              <span className='hidden sm:inline'>Themes</span>
            </Link>

            {authUser && (
              <>
              <Link to ={"/profile"} className={`btn btn-sm gap-2`}>
              <User className="size-5"/>
              <span className='hidden sm:inline'>Profile</span>
              </Link>

              <button className='btn btn-sm flex gap-2 items-center' onClick={logout}>
                <LogOut className='size-5'/>
                <span className='hidden sm:inline'>Logout</span>
              </button>
              
              </>

            )}
          </div>
        </div>
      </div>
    </header >
   
    
    
    </>
  )
}

export default Navbar
