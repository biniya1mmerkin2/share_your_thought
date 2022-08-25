import {
  UPDATE,
  DELETE,
  FETCH_ALL,
  CREATE,
  FETCH_BY_SEARCH,
  START_LODING,
  END_LODING,
  FETCH_POST,
  COMMENT,
  LIKE,
} from "../constants/constants";
const posts = (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case START_LODING:
      return { ...state, isLoading: true };
    case END_LODING:
      return { ...state, isLoading: false };
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberofPages: action.payload.numbeOfPages,
      };

    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload };
    case FETCH_POST:
      return { ...state, post: action.payload.post };

    case CREATE:
      return { ...state, posts: [...state, action.payload] };
    case COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) return action.payload;
          return post;
        }),
      };
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    default:
      return state;
  }
};

export default posts;
