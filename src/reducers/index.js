import { combineReducers } from 'redux';
import {
  GET_POSTS,
  NEW_POST,
  GET_POST,
  BROWSE,
  POST_ERROR,
  CLEAR_POST_ERROR
} from '../actions/posts';
import authReducer from './auth';
import userReducer from './users';


const initialState = {
  posts: [],
  top: [],
  tags: [],
  users: [],
  post: { author: { username: null }, tags: [], likes: [], comments: []},
  error: '',
  newPostId: null,
};

const postReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.posts,
      };
    case NEW_POST:
      return {
        ...state,
        newPostId: action.newPostId
      };
    case GET_POST:
      return {
        ...state,
        post: action.post,
        newPostId: null
      };
    case BROWSE:
      return {
        ...state,
        top: action.top,
        tags: action.tags,
        users: action.users
      }
    case POST_ERROR:
      return {
        ...state,
        error: action.error
      }
    case CLEAR_POST_ERROR:
      return {
        ...state,
        error: ''
      }
    default:
      return state;
  }
}


export default combineReducers({ posts: postReducer, auth: authReducer, user: userReducer });