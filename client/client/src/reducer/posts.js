import {UPDATE,DELETE,FETCH_ALL,CREATE,FETCH_BY_SEARCH} from '../constants/constants'
const posts= (state ={}, action) =>
{
    switch (action.type)
    {
        case DELETE:
            return {...state, posts:state.posts.filter((post)=> post._id !== action.payload)};
        case UPDATE:
            return{...state, posts: state.posts.map((post)=> post._id === action.payload._id ? action.payload : post)};
        case FETCH_ALL:
            return {
                ...state,
               posts: action.payload.data,
               currentPage:action.payload.currentPage,
               numberofPages:action.payload.numbeOfPages
            };

        case FETCH_BY_SEARCH:
            return{...state, posts:action.payload};

        case CREATE:
            return {...state, posts:[...state, action.payload]};

        default:
            return state;
    }
}

export default posts;