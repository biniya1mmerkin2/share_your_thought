import React ,{useState, useEffect}from 'react';
import {Grid,Grow,Container} from '@mui/material'
import Posts from '../posts/posts';
import Form from '../form/form';
import {useDispatch} from 'react-redux'
import {getPosts} from '../../action/posts';


const Home=()=>
{
    const dispatch =useDispatch();
    const [currentId, setCurrentId]=useState(null);

  
    useEffect(() =>
    {
      dispatch(getPosts({}));
      console.log('hello');
    } , [dispatch])

    return(
        <Grow in>
        <Container>
          <Grid container justifyContent={'space-between'} alignItems="stretch" spacing={3} >
              <Grid item xs={12} sm={7}>
                <Posts setCurrentId={setCurrentId} />

              </Grid>
              <Grid item xs={12} sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId}/>
              </Grid>
          </Grid>
        </Container>
      </Grow>
    )
}

export default Home;
