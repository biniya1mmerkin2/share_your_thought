import React from 'react';
import {Card ,CardActions, CardContent,CardMedia,Button,Typography} from '@mui/material';
import {ThumbUpAlt,Delete,MoreHoriz,ThumbUpOffAlt} from '@mui/icons-material';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {deletePost,likePost} from '../../../action/posts';
import { Style } from '../style';




const Post=({post,setCurrentId})=>
{
    const user=JSON.parse(localStorage.getItem('profi'));
    const Likes =()=>{
        if(post.likes.length >0)
        {
            return(
                post.likes.find((like)=> like === (user?.result?.googleId || user?.result?._id))?
                (
                    <><ThumbUpAlt fontSize="small" />&nbsp;{post.likes.length > 2? `you and ${post.likes.length -1} others` : `${post.likes.length} ${post.likes.length > 1? 'likes':''}`}</>
                ):
                (
                    <><ThumbUpOffAlt fontSize="small" />&nbsp;{post.likes.length}{post.likes.length === 1? 'like':'likes'} </>
                )

            )
        }
        
            return <><ThumbUpOffAlt fontSize="small" />&nbsp;Like</>
        

        
    }

    const dispatch=useDispatch();
    return (
         <Card style={Style.card} raised elevation={6}>
            <CardMedia style={Style.cardMedia} 
            image={post.selectedFile} title={post.title} />
            <div style={Style.divpost}>
                <Typography variant='h6'>{post.name}</Typography>
                <Typography variant='body'>{moment(post.createdAt).fromNow()}</Typography>

            </div>
            {(user?.result?.googleId === post.creator || user?.result?._id === post.creator) &&
            <div style={Style.divpost2}>
            <Button style={Style.button} size='small' onClick={()=>setCurrentId(post._id)}/>
            <MoreHoriz fontSize='default'/>
            </div>
            
            } 
            
            <div>
            <Typography style={Style.typo1} variant='body'>{post.tags.map((tag)=>`#${tag}`)}</Typography>
            </div>
            <CardContent>
            <Typography style={Style.typo2} variant='h6' gutterBottom>{post.title}</Typography>
            <Typography style={Style.typo3} variant='body' gutterBottom>{post.message}</Typography>
            </CardContent>
            <CardActions style={Style.cardAction}> 
                <Button size='small' disabled={!user?.result} color='primary' onClick={()=>{dispatch(likePost(post._id))}}>
                    <Likes />
                    
                    {post.likeCount}
                </Button>
                {(user?.result?.googleId === post.creator || user?.result?._id === post.creator) &&
                
                    <Button size='small' color='primary' onClick={()=>dispatch(deletePost(post._id))}>
                    <Delete fontSize='small'/>
                    Delete
                </Button>
                
                
            }
               
            </CardActions>
            


         </Card>
        
    )
}

export default Post;