import React , {useEffect}from "react";
import {Paper ,Typography,Divider,CircularProgress,} from '@mui/material';
import { useSelector,useDispatch } from "react-redux";
import moment from "moment";
import { useParams ,useNavigate} from "react-router";
import { getPost,getPostsBySearch } from "../../action/posts";
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

    useEffect(()=>
    {
      if(post)
      {
        dispatch(getPostsBySearch({search:{title:post.title}}))
      }

    },[post])
     
    if(!post) return null;
    const recommendedPosts=posts.filter(({_id,title})=> _id !== post?._id && title === post?.title);
    const openPost=(_id)=> navigate(`/posts/${_id}`)
    // console.log(posts);

     return isLoading?
       
        (
            <Paper  elevation={6} style={Style.loadingPaper}>
                <CircularProgress  size="7em"/>
            </Paper>
        ):
    
   (
    <Paper elevation={6}>

   
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
      {
        recommendedPosts.length? (
          <div style={Style.section}>
            <Typography gutterBottom variant="h5">You might also like</Typography>
            <Divider />
            <div style={Style.recommendedPosts}>
              { 
             
      
                 recommendedPosts.map(({title,message,name,likes,selectedFile,_id})=>
                (
                  <div style={{margin:20, cursor:'pointer'}} onClick={()=> openPost(_id)} key={_id}>
                    <Typography gutterBottom variant="h4" >{title}</Typography>
                    <Typography gutterBottom variant="subtitle2" >by:{name}</Typography>
                    <img src={selectedFile} width={200} />
                  </div>
                )
               
                )
              }

            </div>

          </div>
        ):
                (
                  <Typography gutterBottom variant="h6">no similar items found!</Typography>
                )
      }
       </Paper>
   
    )
}

export default PostDetails;