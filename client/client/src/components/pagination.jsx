import React ,{useEffect} from "react";
import {Pagination ,PaginationItem} from '@mui/material';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../action/posts";
 export  const PaginationComp=({page})=>
{
   
    const {numberofPages}=useSelector((state)=> state.posts)

    const dispatch=useDispatch();
    useEffect(()=>
    {
        if(page) dispatch(getPosts(page))
        

    },[page])

    return(
        
            <Pagination count={numberofPages} variant="outlined" page={Number(page) || 1} color="primary" renderItem={(item)=>
            (
                <PaginationItem {...item} component={Link}  to={`/posts?page=${item.page}`}/>
            )}/>
        
    )
}

