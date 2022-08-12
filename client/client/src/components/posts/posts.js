import React ,{useEffect}from 'react';
import Post from './post/post';
import {useSelector, useDispatch} from 'react-redux';
import {Grid ,CircularProgress} from '@mui/material';
import { Style } from './style';
import { getPosts } from '../../action/posts';

const Posts=({setCurrentId})=>
{
    const posts =useSelector((state)=>state.posts);
    const dispatch=useDispatch();

    useEffect(()=>
        {
            dispatch(getPosts({}))
            // console.log('this is the test')

        } ,[posts,dispatch]);

    // console.log(posts); 
    return(
       !posts.length? <CircularProgress/>:(
        <Grid style={Style.gridPosts} container alignItems="stretch" spacing={3}>
            {
                posts.map((post)=>
                (
                    <Grid item key={post._id}  xs={12} sm={6}>
                        <Post post={post} setCurrentId={setCurrentId}/>

                    </Grid>

                ))
            }

        </Grid>
       )
        
    )
    
}

export default Posts;