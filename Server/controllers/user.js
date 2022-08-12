import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/users.js';

export const signIn= async(req ,res)=>
{
    const {email, password}=req.body;

    try {
        const existinguser=await User.findOne({email});
        if(!existinguser) return res.status(404).json({message:'user doesn`t exist'})
        const passwordmatch=await bcrypt.compare(password, existinguser.password);
        if(!passwordmatch) return res.status(400).json({message:'password doesn`t match'});
        const token =jwt.sign({email: existinguser.email, id:existinguser._id},'thisismykey',{expiresIn:"1h"});

        res.status(200).json({result:existinguser ,token});


        
    } catch (error) {
        res.status(500).json(error);

        
    }

}

export const signUp = async(req, res)=>
{
    const {firstName,lastName,email,password,confirmpassword}=req.body;
   try {
    const existinguser=await User.findOne({email});
    if(existinguser) return res.status(400).json({message:'user exist with this email'});
    if(password !== confirmpassword) return res.status(400).json({message:'password not match'});
    
    const hashedpassword= await bcrypt.hash(password ,12);
    const result= await User.create({email, password:hashedpassword, name:`${firstName} ${lastName}`});
    const token=jwt.sign({email: result.email ,id:result._id},'thisismykey',{expiresIn:"1h"});
    res.status(200).json({result ,token});
   } catch (error) {
    res.status(500).json(error);

    
   }

}