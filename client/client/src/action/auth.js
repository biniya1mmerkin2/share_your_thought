import * as api from '../api';
import {AUTH } from '../constants/constants';

export const signin= (formdata , navigate) => async (dispatch)=>
{
    try {
        const {data} = await api.signin(formdata);
        const {result ,token}=data;
        // dispatch({type: AUTH, payload:data});
       
        dispatch({type:'AUTH', data:{result ,token}});
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}

export const signup =(formdata, navigate) => async (dispatch)=>
{
  try {
    const {data} =await api.signup(formdata);
    const {result ,tokenId}=data;
    console.log(result);
    // dispatch({type:'AUTH', data:{result,token}});
    navigate('/')

    
  } catch (error) {
    console.log(error);
  }
}