import React ,{useEffect}from 'react';
import {Container} from '@mui/material';
import { useDispatch } from 'react-redux';
import { getPosts } from './action/posts';

import './App.css';
import { Route,Routes } from 'react-router';
import NavBar from './components/navBar/navbar';
import Home from './components/home/home';
import Auth from './components/Auth/auth';
function App() {


 
  return (
    
     <Container  maxWidth="lg" >
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
        
      
    </Container>
   
   
  );
}

export default App;
