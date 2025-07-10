import jwt from "jsonwebtoken"
import dotenv from "dotenv"
export const generateToken=(userId,res)=>{
    const token =jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"7d"
    })

    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000, //7days in miliseconds
        httpOnly:true, //prevents XSS attacks cross site scripting
        sameSite:"Lax",
        secure:process.env.NODE_ENV!=="development"
    })
    return token
    
}