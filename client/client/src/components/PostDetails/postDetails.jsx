import React , {useEffect}from "react";
import {Paper ,Typography,Divider,CircularProgress,} from '@mui/material';
import { useSelector,useDispatch } from "react-redux";
import moment from "moment";
import { useParams ,useNavigate} from "react-router";
import { getPost } from "../../action/posts";
import {Style } from './styles'

const PostDetails =()=>
{
    const {post, posts, isLoading}=useSelector((state)=> state.posts)
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {id}=useParams();

    useEffect(()=>
    { 
        console.log(post)
          dispatch(getPost(id))
    },[id])
     
    if(!post) return null;

     return isLoading?
       
        (
            <Paper  elevation={6} style={Style.loadingPaper}>
                <CircularProgress  size="7em"/>
            </Paper>
        ):
    
   (
        <div  style={Style.card} >
        <div  style={Style.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div  style={Style.imageSection}>
          <img  style={Style.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>
   
    )
}

export default PostDetails;