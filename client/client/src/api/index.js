import axios from "axios";

const API=axios.create({baseURL:'http://localhost:5000'})

API.interceptors.request.use((req)=>
{
    if(localStorage.getItem('profi'))
    {
        
        req.headers.Authorization=`Bearer ${JSON.parse(localStorage.getItem('profi')).token}`;
      
    }
   return req;
   
})

export const fetchPost = (id) => API.get(`/post/${id}`);
export const fetchPosts =(page) => API.get(`/post?page=${page}`);
export const fetchPostsBySearch =(searchQuery)=> API.get(`/post/search?searchQuery=${searchQuery.search || 'none'}`)
export const createPost =(newpost) => API.post('/post',newpost);
export const updatePost =(id,updatePost) => API.patch(`/post/${id}`, updatePost);
export const deletePost =(id) => API.delete(`/post/${id}`);

export const likePost = (id) => API.patch(`/post/${id}/likePost`) ;
export const commentPost = (value, id) =>
  API.post(`/post/${id}/commentPost`, { value });

export const signin =(formdata) => API.post('/user/signin',formdata);
export const signup =(formdata) => API.post('/user/signup', formdata);

