import React ,{useState, useEffect}from "react";
import memories from "../../images/memories.png";
import { AppBar, Typography,Toolbar,Button,Avatar, Grid} from "@mui/material";
import { Style } from "./navbarstyle";
import { Link,  useLocation, useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from 'jwt-decode'


// import { useSelector } from "react-redux";
const NavBar = () => {

    //  const userdata=useSelector((state)=>state.auth)
  const [user, setuser]=useState(JSON.parse(localStorage.getItem('profi')));
  const location=useLocation();
  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  
  

  useEffect(()=>
  {
    const token= user?.token;
    if(token)
    {
      const decodedToken=decode(token);
      if(decodedToken.exp * 1000 < new Date().getTime()) logoutHandler();
    }
      
      setuser(JSON.parse(localStorage.getItem('profi')));
      console.log(user);
  },[location]);

  const logoutHandler =()=>
  {
    dispatch({type:'LOGOUT'});
    setuser(null);
    navigate('/');
       
  }

   
   //
  return (
   
      <AppBar  style={Style.appbar}  position="static" color="inherit">
     <Grid container spacing={2} alignItems="stretch">
     <Grid item xs={12}  sm={12}  lg={6} xl={4} >
      <Link to='/' style={Style.brandContainer}>
        <Typography  style={Style.typo} variant="h3" align="center">
          Share thought
        </Typography>
      
      </Link>
      </Grid>
      
      <Grid item xs={12}  sm={12}  lg={6} xl={8}>
      <Toolbar  style={Style.toolbar}>
        {
            user?(
                <div style={Style.div}>
                    <Avatar style={Style.purple} alt='test' src={user? user.result?.imageUrl:""}>{user?user.result?.email.charAt(0):null}</Avatar>
                    <Typography style={Style.userName} variant='h6' >{user?user.result?.name:null}</Typography>
                    <Button LinkComponent={Link}  to="/posts" variant="contained" color="secondary"  onClick={logoutHandler}>Logout</Button>
                </div>
            ):(
                <div style={Style.div}>
                    <Button LinkComponent={Link}  to="/auth"  variant="contained" color="primary">SignIn</Button>

                </div>
            )
        }
      </Toolbar>
      </Grid>

     </Grid>
    </AppBar>
  
    
  );
};

export default NavBar;
