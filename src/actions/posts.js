import axios from 'axios';
import { UPDATE_USER } from './auth';

export const NEW_POST = "NEW_POST";
export const GET_POSTS = "GET_POSTS";
export const GET_POST = "GET_POST";
export const BROWSE = "BROWSE";

export const createPost = (post) => async (dispatch) => {
  try {
    const res = await axios.post('https://coders-api.herokuapp.com//post', post, { headers: { 'authorization': localStorage.getItem('token') }});
    dispatch({
      type: NEW_POST,
      newPostId: res.data.id
    });
  } catch(err) {
    console.log(err);
  }
}

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('https://coders-api.herokuapp.com/posts');
    dispatch({
      type: GET_POSTS,
      posts: res.data.posts
    });
  } catch(err) {
    console.log(err);
  }
}

export const searchPosts = (posts) => (dispatch) => {
  try {
    dispatch({
      type: GET_POSTS,
      posts
    });
  } catch(err) {
    console.log(err);
  }
}

export const getUsersPosts = (author) => async (dispatch) => {
  try {
    const res = await axios.post('https://coders-api.herokuapp.com/usersPosts', { author }, { headers: { 'authorization': localStorage.getItem('token') }});
    dispatch({
      type: GET_POSTS,
      posts: res.data.posts
    });
  } catch(err) {
    console.log(err);
  }
}

export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`https://coders-api.herokuapp.com/post/${id}`, { headers: { 'authorization': localStorage.getItem('token') }});
    dispatch({
      type: GET_POST,
      post: res.data.post
    })
  } catch(err) {
    console.log(err);
  }
}

export const addComment = (commentData) => async (dispatch) => {
  try {
    const { text, author, id } = commentData;
    await axios.put(`https://coders-api.herokuapp.com/comment/${id}`, { text, author }, { headers: { 'authorization': localStorage.getItem('token') }});
    dispatch(getPosts());
  } catch(err) {
    console.log(err);
  }
}

export const addPostLike = (data) => async (dispatch) => {
  try {
    const { postId, authorId } = data;
    const res = await axios.put(`https://coders-api.herokuapp.com/post/like`, { postId, authorId }, { headers: { 'authorization': localStorage.getItem('token') }});
    dispatch(getPosts());
    dispatch({ type: UPDATE_USER, user: res.data });
  } catch(err) {
    console.log(err);
  }
}

export const removePostLike = (data) => async (dispatch) => {
  try {
    const { postId, authorId } = data;
    const res = await axios.put(`https://coders-api.herokuapp.com/post/removeLike`, { postId, authorId }, { headers: { 'authorization': localStorage.getItem('token') }});
    dispatch(getPosts());
    dispatch({ type: UPDATE_USER, user: res.data });
  } catch(err) {
    console.log(err);
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`https://coders-api.herokuapp.com/post/${id}`, { headers: { 'authorization': localStorage.getItem('token') }});
    if (res.status === 200) dispatch(getUsersPosts());
  } catch(err) {
    console.log(err);
  }
}

export const topPosts = () => async (dispatch) => {
  try {
    const top = await axios.get(`https://coders-api.herokuapp.com/browse/top`);
    const tags = await axios.get(`https://coders-api.herokuapp.com/browse/tags`);
    const users = await axios.get(`https://coders-api.herokuapp.com/browse/users`);
    dispatch({ type: BROWSE, top: top.data, tags: tags.data, users: users.data });
  } catch(err) {
    console.log(err);
  }
}

export const likeComment = (postId, commentId, userId) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:8080/comment/like', { postId, commentId, userId }, { headers: { 'authorization': localStorage.getItem('token') }});
    dispatch(getPosts());
  } catch(err) {
    console.log(err);
  }
}

export const removeLikeComment = (postId, commentId, userId) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:8080/comment/removeLike', { postId, commentId, userId }, { headers: { 'authorization': localStorage.getItem('token') }});
    dispatch(getPosts());
  } catch(err) {
    console.log(err);
  }
}

export const deleteComment = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`http://localhost:8080/comment/${id}`, { headers: { 'authorization': localStorage.getItem('token') }});
    dispatch(getPosts());
  } catch(err) {
    console.log(err);
  }
}