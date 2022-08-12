import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import router from "./routes/post.js";
import user from './routes/users.js'
import dotenv from 'dotenv';

const app=express();
dotenv.config();

app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended:true}));
app.use(cors());
app.use('/post',router)
app.use('/user',user)

app.get('/',(req,res)=>{res.send('welocme to memory sharing site')});

// const CONNECTION_URL='mongodb+srv://ben:BINIyam@cluster0.5tkf37p.mongodb.net/memory?retryWrites=true&w=majority';
const PORT=process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL , {useNewUrlParser: true , useUnifiedTopology:true})
.then(()=>app.listen(PORT ,()=>console.log(`server is running on port:${PORT}`)))
.catch((error)=>console.log(error.message));


// mongoose.set('useFindAndModify',false)