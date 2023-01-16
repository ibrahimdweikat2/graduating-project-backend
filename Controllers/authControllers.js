import userSchema from '../models/User.js';
import jwt  from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
export const SignUp=async (req,res)=>{
    const {firstName,lastName,email,password} = req.body;
    try {
        const existingEmail=await userSchema.findOne({email});
        if(existingEmail) return res.status(400).json({error:"Email already exists"});
        const hashPassword=CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString();
        const newUser=userSchema.create({email,password:hashPassword,userSchema:`${firstName} ${lastName}`});
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}