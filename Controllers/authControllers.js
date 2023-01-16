import userSchema from '../models/User.js';
import jwt  from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
export const SignUp=async (req,res)=>{
    const {firstName,lastName,email,password} = req.body;
    try {
        const existingEmail=await userSchema.findOne({email});
        if(existingEmail) return res.status(400).json({error:"Email already exists"});
        const hashPassword=CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString();
        const newUser=await userSchema.create({email,password:hashPassword,username:`${firstName} ${lastName}`});
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const SignIn=async (req,res)=>{
    const {email} = req.body;
    try {
        const existingEmail=await userSchema.findOne({email});
        if(!existingEmail) return res.status(400).json({error:"Email Dose Not exists"});
        const originalPassword=CryptoJS.AES.decrypt(existingEmail.password, process.env.PASS_SEC).toString(CryptoJS.enc.Utf8);
        if(originalPassword!==req.body.password) return res.status(400).json({error:"Invalid Password"});
        const {password,...other}=existingEmail?._doc;
        const token=jwt.sign({id:other?._id,isAdmin:other?.isAdmin},process.env.JWT_SEC,{expiresIn:process.env.JWT_EXPIRE});
        res.status(200).json({...other,token});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}