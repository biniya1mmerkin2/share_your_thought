import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';


export const getPostes= async (req , res)=>
{
    const {page}=req.query;
    
    try {
        const LIMIT=6;
        const startIndex=(Number(page)-1) *LIMIT;
        const total= await PostMessage.countDocuments({});
        const posts= await PostMessage.find({}).sort({_id:-1}).limit(LIMIT).skip(startIndex);

        res.status(200).json({data:posts ,currentPage: Number(page),numbeOfPages:Math.ceil(total/LIMIT)})
        
    } catch (error) {
        res.status(404).json({message: error.message})
        
    }
    
}

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};



export const getPostsBySearch= async (req ,res) =>
{
    const {searchQuery}=req.query;
    try {
        const title=new RegExp(searchQuery ,'i');
        const posts= await PostMessage.find({title})
        res.json({data:posts});
        
    } catch (error) {
        console.log(error)
        
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

export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  const post = await PostMessage.findById(id);
  post.comments.push(value);
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.json(updatedPost);
};