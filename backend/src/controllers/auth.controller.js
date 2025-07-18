
import { generateToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import cloudinary from "../lib/cloudinary.js"


// signup
export const signup= async (req,res)=>{
    const {fullName,email,password}=req.body
    try {

        if(!fullName || !password || !email){
            return res.status(400).json({message:"All Fields are required"})
        }
        // hash password(encryption)
        if(password.length<6){
            return res.status(400).json({message:"password must be more than 6 digits"})
        }

        const user=await User.findOne({email})
        if(user) return res.status(400).json({message:"Email already exist"})

        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        const newUser =new User({
            fullName,
            email,
            password:hashedPassword
        })

        if(newUser){
            // genereate jwt token
            generateToken(newUser._id,res)
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                password:newUser.password,
                profilePic:newUser.profilePic,
                
            })

        }
        else{
            res.status(400).json({message:"Invalid user data"})
        }

    } catch (error) {
        console.log("Error in signup controller",error.message)
        res.status(500).json({message:"internal server error"})
    }
}



// login
export const login=async (req,res)=>{

    const {email,password}=req.body
try {
    const user=await User.findOne({email}) //agar me yaha password bhi du to ye use ind ni kr payega kyuki password bcrypt hai isliye 

    if(!user){
        return res.status(400).json({message:"Invalidi credentials"})
    }

   const isPasswordCorrect= await bcrypt.compare(password,user.password)
   if(!isPasswordCorrect){
    return res.status(400).json({message:"Invalid credentials"})
   }

   generateToken(user._id,res)

   res.status(200).json({
    _id:user._id,
    fullName:user.fullName,
    email:user.email,
    password:user.password,
    profilePic:user.profilePic,
    createdAt:user.createdAt,
    
   })

} catch (error) {
    console.log("Error in login controller",error.message)
    res.status(500).json({message:"Internal Server Error"})
}
}


// logout
export const logout=(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"log out successfully"})
    } catch (error) {
        console.log("Error in logout controller",error.message)
        res.status(500).json({message:"Internal error server"})
    }
}

// update profile
export const updateProfile =async(req,res)=>{

    try {
        const {profilePic}=req.body
        const userId=req.user._id

        if(!profilePic){
            return res.status(400).json({message:"Profile Pic requried"})

        }

        const uploadResponse=await cloudinary.uploader.upload(profilePic)

        const updatedUser=await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})

        res.status(200).json(updatedUser)
    } catch (error) {
        console.log("error in update profile:",error)
        res.status(500).json({message:"internal server error"})
    }
}

// to check authorization
export const checkAuth=(req,res)=>{

    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in checkAuth controller",error.message)
        res.status(500).json({message:"Internal server Error"})
    }
}