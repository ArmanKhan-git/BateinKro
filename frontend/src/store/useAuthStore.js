import {create} from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"
import {io} from "socket.io-client"

const BASE_URL=import.meta.env.MODE==="development"?"http://localhost:5001":"/"


export const useAuthStore=create((set,get)=>({
    authUser:null,
    isCheckingAuth:true,
    isSigningUp:false,
    isLoggingin:false,
    isUpdatingProfile:false,
    socket:null,
    onlineUsers:[],

    checkAuth:async()=>{
        try {
            const res =await axiosInstance.get("/auth/check")

            set({authUser:res.data})
                get().connectSocket()

        } catch (error) {
            console.log("error in checkAuth")
            set({authUser:null})
        }
        finally{
            set({isCheckingAuth:false})
        }
    },

    signup: async (data)=>{
        set({isSigningUp:true})
        try {
            const res=await axiosInstance.post("/auth/signup",data)
            set({authUser:res.data})
            toast.success("account created successfully")
                get().connectSocket()

        } catch (error) {
            toast.error(error.response.data.message)
            console.log("error")
        }
        finally{
            set({isSigningUp:false})
        }
    },

    logout:async ()=>{
        try{await axiosInstance.post("/auth/logout")
        set({authUser:null})
        toast.success("Log out successfull")
        get().disconnectSocket()

    }
    catch(error){
        toast.error("something went wrong")
    }
},

login:async(data)=>{
    try{
    const res=await axiosInstance.post("/auth/login",data)
    set({authUser:res.data})
    toast.success("log In successfully")

    get().connectSocket()
}
catch(error){
    toast.error("Invalid email or password")
}
finally{
    set({isLoggingin:false})
}
},

updateProfile: async(data)=>{

    set({isUpdatingProfile:true})
    try {
        const res= await axiosInstance.put("auth/update-profile",data)
        set({authUser: res.data})
        toast.success("profile updated successfully")
    } catch (error) {
        toast.error("something went wrong")
    }
    finally{
        set({isUpdatingProfile:false})
    }
},

connectSocket:()=>{
    const {authUser}=get()
    if(!authUser || get().socket?.connected) return;

    const socket=io(BASE_URL,{
        query: {
            userId:authUser._id,
        },
    })
    socket.connect()
    set({socket:socket});

    socket.on("getOnlineUsers",(userIds)=>{ //getOnlineUsers same name as in socket.js under io.emit
        set({onlineUsers:userIds})
    })
},
disconnectSocket:()=>{
    if(get().socket?.conected) get().socket.disconnect();
},


}))