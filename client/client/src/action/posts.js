import * as api from '../api';
import {
  FETCH_ALL,
  CREATE,
  DELETE,
  UPDATE,
  LIKE,
  FETCH_BY_SEARCH,
  START_LODING,
  END_LODING,
  FETCH_POST,
} from "../constants/constants";

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LODING });
    const { data } = await api.fetchPost(id);

    dispatch({ type: FETCH_POST, payload: { post: data } });
    dispatch({ type: END_LODING });
  } catch (error) {
    console.log(error);
  }
};


export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LODING });
    const { data } = await api.fetchPosts(page);

    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LODING });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    //  dispatch({ type: START_LODING });
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    //  dispatch({ type: END_LODING });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const createPosts = (post) => async (dispatch) => {
  try {
    dispatch({ type: START_LODING });
    const { data } = await api.createPost(post);
    console.log(data);

    dispatch({ type: CREATE, payload: data });
    dispatch({ type: END_LODING });
  } catch (error) {
    console.log(error);
  }
};

export const updatePosts=(id,updatedData)=> async (dispatch)=>
{
   try {
      const {data} = await api.updatePost(id,updatedData);
      dispatch({type: UPDATE, payload:data});
   } catch (error) {
      console.log(error);
   }
}

export const deletePost=(id)=> async (dispatch)=>
{
   try {
      await api.deletePost(id);
      dispatch({type: DELETE, payload:id});
   } catch (error) {
      console.log(error.message)
      
   }
}

export const likePost = (id) => async (dispatch) => {
   try {
     const { data } = await api.likePost(id);
     const da=data;
     console.log("this is test"+da);
 
     dispatch({ type: LIKE, payload: data });
   } catch (error) {
     console.log(error.message);
   }
 };