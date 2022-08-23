import React ,{useEffect}from 'react';
import Post from './post/post';
import {useSelector, useDispatch} from 'react-redux';
import {Grid ,CircularProgress} from '@mui/material';
import { Style } from './style';
import { getPosts } from '../../action/posts';

const Posts=({setCurrentId, page})=>
{
  const { posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts(page));
    // i removed the posts
  }, [dispatch]);

  console.log(isLoading);
  // if (!posts.length && !isLoading) return "No Posts";
  //   console.log(posts);
  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid style={Style.gridPosts} container alignItems="stretch" spacing={1}>
      {posts.map((post) => (
        <Grid item key={post._id} xs={12} sm={12} md={6} lg={4}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Posts;