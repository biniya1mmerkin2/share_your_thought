import React, { useState ,useEffect} from "react";
import { Container, Grid, Typography, Button, Icon } from "@mui/material";
import {GoogleLogin} from 'react-google-login';
import { useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { LockOutlined} from '@mui/icons-material';
import Input from "./input";
import {gapi} from 'gapi-script';
import {signin ,signup} from '../../action/auth';

import { Item1, Item2, Item3, Style } from './style'
const intialState={firstName:'',lastName:'',email:'',password:'',confirmpassword:''};

const Auth = () => {
  const [showpassword, setShowPassword] = useState(false);
  const [formdata ,setFormData]=useState(intialState);
  const [issignup, setSignup]=useState(false);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  useEffect(()=>{
    function start() {
      gapi.client.init({
        clientId: '61022132678-ir4pjb6tbk7vg4i6s57qtv2rcrm2uv0b.apps.googleusercontent.com',
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  },[])
  
  const handleShowPassword = () => {
    setShowPassword((prevstate) => !prevstate);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(issignup)
    {
      dispatch(signup(formdata, navigate));

    }else
    {
      dispatch(signin(formdata, navigate));

    }


  }
  const handleChange = (e) => {
    setFormData({...formdata, [e.target.name]:e.target.value});



  }

  const swithMode =() =>
  {
    setSignup((prevstate)=> !prevstate);
  }

  const successhandler = async (res) =>
  {
    const result=res.profileObj;
    const token=res.tokenId;
 
    try {
          // localStorage.setItem('prof',JSON.stringify(obj));
      
          dispatch({type:'AUTH', data:{result ,token}});
          navigate('/posts',{replace:true});
  
    } catch (error) {
      console.log(error);
    }
    
  }

  const failurehandler =(error) =>
  {
    console.log(error);

  }
  
﻿


  return (
    <Container style={Style.style} component="main" >
      <Item1  elevation={5}>
        <Item2 >
          <LockOutlined />
         
        </Item2>
        <Typography style={{marginBottom:'20px'}} variant="h5" >{issignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form   onSubmit={handleSubmit}>
          <Grid  item >
            {
              issignup && (
             
                 <div style={Style.style2}>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half={5}/>
                  <Input name="lastName" label="Last Name" handleChange={handleChange} half={5} />
                </div>
               
              )
            }
            
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showpassword ? null : "password"} handleShowPassword={handleShowPassword} />
            {
              issignup ? <Input name="confirmpassword" label="Confirm Password" handleChange={handleChange} type={showpassword ? null : "password"} handleShowPassword={handleShowPassword}/> : null
            }
   
          </Grid>
          <Item3 fullWidth type="submit"  variant="contained" color="primary">
            {issignup ? "SignUp" : "SignIn"}
          </Item3>

          <GoogleLogin
           clientId="61022132678-ir4pjb6tbk7vg4i6s57qtv2rcrm2uv0b.apps.googleusercontent.com"
           render={(renderprops)=>(
              <Button style={Style.style3} color='primary'  onClick={renderprops.onClick} disabled={renderprops.disabled} startIcon={<Icon />} variant='contained' fullWidth>
                Google Sign In
              </Button>
           )}
           onSuccess={successhandler}
           onFailure={failurehandler}
           cookiePolicy='single_host_origin'
          />
          <Grid container justifyContent={"flex-end"}>
            <Grid item>
              <Button onClick={swithMode}>{issignup? 'Already have an account? SignIn':'Don`t have an account? SignIn'}</Button>
            </Grid>
          </Grid>


        </form>

      </Item1>

    </Container>
  )
}

export default Auth;