import React ,{useEffect, useState} from 'react';
import {TextField,Button,Typography,Paper} from '@mui/material';
import Filebase from 'react-file-base64';
import {useDispatch,useSelector} from 'react-redux';
import {createPosts,updatePosts, getPosts} from '../../action/posts';
import {Style} from './formstyle';
import { useLocation } from 'react-router';

const Form=({currentId,setCurrentId,page})=>
{

  const post=useSelector((state)=>currentId? state.posts.posts.find((p)=>p._id === currentId):null);
  const [postData ,setPostDat]=useState({
  title:'',message:'',tags:'',selectedFile:''
  });
  const user=JSON.parse(localStorage.getItem('profi'));
  const location=useLocation();
 

  const dispatch=useDispatch();

  useEffect(()=>{
     if(post) setPostDat(post);
     dispatch(getPosts(page));
     console.log("form test")
  },[post ,dispatch, location])

   const handlesubmit=(e)=>
  {
    e.preventDefault();
    if(currentId){
      dispatch(updatePosts(currentId,{...postData, name: user?.result?.name}));
      clear();

    }
    else
    {

      dispatch(createPosts({...postData, name: user?.result?.name}));
      clear();
    }
    
  }

  const clear=()=>
  {
    setCurrentId(null);
    setPostDat({title:'',message:'',tags:'',selectedFile:''});


  }

  if(!user?.result?.name)
  {
    return(
    <Paper style={Style.paper} elevation={6}>
      <Typography variant='h5' textAlign={'center'}> Sign in first to Share Thought in this app</Typography>
    </Paper>
    )
    
  }
  else
  {
    return(
        
      <Paper style={Style.paper} elevation={6}>
        <form  style={Style.form} autoComplete='off' noValidate onSubmit={handlesubmit}> 
        <Typography style={Style.typo} variant='h6'>{currentId? "Editing":"Creating"} a Memory</Typography>
        <TextField 
        required
        style={Style.textfield}
        name='title' 
        variant='outlined' 
        label='Title' 
        fullWidth
        value={postData.title}
        onChange={(e)=>setPostDat({...postData,title:e.target.value})}
        
        />
        <TextField 
        required
       style={Style.textfield}
        name='message' 
        variant='outlined' 
        label='Message' 
        fullWidth
        value={postData.message}
        onChange={(e)=>setPostDat({...postData,message:e.target.value})}
        
        />
        <TextField 
        required
        style={Style.textfield}
        name='tags' 
        variant='outlined' 
        label='Tags' 
        fullWidth
        value={postData.tags}
        onChange={(e)=>setPostDat({...postData,tags:e.target.value.split(',')})}
        
        />

        <div style={Style.div}>
           <Filebase
           type="file"
           multiple={false}
           onDone={({base64})=>setPostDat({...postData,selectedFile:base64})}
           >
            
           </Filebase>

        </div>
        <Button style={Style.button} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
        <Button style={Style.button} variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
        </form>

      </Paper>
    

)
  }

   
}

export default Form;