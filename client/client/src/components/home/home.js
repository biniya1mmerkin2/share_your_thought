import React, { useState, useEffect } from 'react';
import { Grid, Grow, Container, Paper, AppBar, TextField, Button, Chip, Autocomplete } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import style from './style';
import Posts from '../posts/posts';
import Form from '../form/form';
import { useDispatch } from 'react-redux'
import { getPosts ,getPostsBySearch} from '../../action/posts';
import { PaginationComp } from '../../components/pagination.jsx'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Home = () => {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const [search, setSearch] = useState('');
  const navigate=useNavigate();

  const query = useQuery();
  const page = query.get('page')|| 1;
  console.log(page);
  const searchQuery = query.get('searchQuery');


  // useEffect(() => {
  //   dispatch(getPosts({}));
  //   console.log('hello');
  // }, [dispatch])

  const searchPost=()=>
  {
    if(search.trim())
    {
      dispatch(getPostsBySearch({search}))
      navigate(`/posts/search?searchQuery=${search|| 'none'}`)

    }else{
      navigate('/posts')
    }
  }

  const handleKeyDown = (e) => {
 
    if (e.keyCode === 13) {
      console.log('searched')
      searchPost();
    }
  }

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justifyContent={'space-between'} alignItems="stretch" spacing={3} >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />

          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar style={style.appBarSearch} position="static" color='inherit' elevation={6}>
              <TextField
                style={{margin:'10px' }}
                name='search'
                variant='outlined'
                label='Search Memory'
                value={search}
                
                onKeyDown={handleKeyDown}
                onChange={(e) => { setSearch(e.target.value) }}
              />
              {/* <Button style={{margin:'10px' }} variant='contained' color='primary' onClick={searchPost}>Search</Button> */}
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={6}>
              <PaginationComp page={page}/>

            </Paper>

          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home;
