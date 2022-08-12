import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';


export const getPostes= async (req , res)=>
{
    try {
        const postmessage= await PostMessage.find({});

        res.status(200).json(postmessage)
        
    } catch (error) {
        res.status(404).json({message: error.message})
        
    }
    
}

export const createPost = async (req,res)=>
{
   const post=req.body;
   const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});
   try {
    await newPost.save();
    res.status(201).json(newPost)
   } catch (error) {
    res.status(409).json({message: error.message});
    
   }
}

export const updatePost = async (req,res)=>
{
    const {id:_id}=req.params;
    const post=req.body;
    try {
        const updatedPost=await PostMessage.findByIdAndUpdate(_id,post,{new:true});
        
        res.json(updatedPost);
        
    } catch (error) {
        res.status(404).json('No post with this id');
        
    }
  
}

export const deletePost = async (req,res) =>
{
    const {id}=req.params;
    try {
        await PostMessage.findByIdAndDelete(id);
        res.json("Post Deleted Successfully")
    } catch (error) {
        res.json({error:error.message})
        
    }
}

export const likepost = async (req ,res) =>
{
    
    const {id}=req.params;
    if(!req.userId) return res.json({message:'unauthenticated user'});
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with this id');
    const post= await PostMessage.findById(id);
    const index=post.likes.findIndex((id)=>id === String(req.userId));
    if(index === -1)
    {
       post.likes.push(req.userId);
    }else
    {
        post.likes =post.likes.filter((id)=>id !== String(req.userId));

    }

    const updatedPost= await PostMessage.findByIdAndUpdate(id,post,{new:true});
    res.json(updatePost);
}