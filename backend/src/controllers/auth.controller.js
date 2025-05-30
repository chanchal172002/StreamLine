import User from "../models/User.js"
import jwt from "jsonwebtoken";

export const signup = async(req, res)=>{
    const {email,password, fullName} = req.body;

    try{
        if(!email || !password || !fullName){
            return res.send(400).json({message: "All fields are requied"});
        }
        if(password.length < 6){
            return res.send(400).json({message: "Password must be at least 6 characters"});
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({message: "Invalid email format"});
        }

        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: " Email already exists, Please use a different one"});
        }

        const idx = Math.floor(Math.random() * 100) + 1;
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

        const newUser = await User.create({
            email,
            fullName,
            password,
            profilePic : randomAvatar,
        })

        //TODO: create user in stream as well

        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET_KEY, {
            expiresIn : "7d"
        })

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        })

        res.status(201).json({success: true, user: newUser})

    }catch(error){
        console.log("Error in signup controller", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const login = async(req, res)=>{
    res.send("Login");
}

export const logout = (req, res)=>{
    res.send("Logout");
}
