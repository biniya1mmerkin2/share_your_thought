import React ,{useEffect}from 'react';
import {Container} from '@mui/material';
import { useDispatch } from 'react-redux';
import { getPosts } from './action/posts';

import './App.css';
import { Route,Routes } from 'react-router';
import {Navigate} from  'react-router-dom';
import NavBar from './components/navBar/navbar';
import Home from './components/home/home';
import Auth from './components/Auth/auth';
import PostDetails from './components/PostDetails/postDetails';
function App() {

const user=JSON.parse(localStorage.getItem('profi'));
 
  return (
    
     <Container  maxWidth="lg" >
      <NavBar />
      <Routes>
        <Route path='/' element={<Navigate to='/posts' />} />
        <Route path='/posts' element={<Home />} />
        <Route path='/posts/search' element={<Home />} />
        <Route path='/posts/:id' element={<PostDetails />} />
        <Route path='/auth' element={!user?<Auth /> : <Navigate  to='/posts'/>} />
      </Routes>
        
      
    </Container>
   
   
  );
}

export default App;
