import axios from 'axios';
import { UPDATE_USER } from './auth';

export const NEW_POST = "NEW_POST";
export const GET_POSTS = "GET_POSTS";
export const GET_POST = "GET_POST";
export const BROWSE = "BROWSE";
export const POST_ERROR = "POST_ERROR";
export const CLEAR_POST_ERROR = "CLEAR_POST_ERROR";

export const createPost = (post) => async (dispatch) => {
  try {
    const res = await axios.post('https://coders-api.herokuapp.com/post', post, { headers: { 'authorization': localStorage.getItem('token') }});
    dispatch({
      type: NEW_POST,
      newPostId: res.data.id
    });
  } catch(err) {
    err.message === 'Request failed with status code 401' ? dispatch(postError('Must log in first')) : dispatch(postError('Could not complete action'));
    setTimeout(() => dispatch({ type: CLEAR_POST_ERROR }), 2000);
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
    dispatch(postError('Could not retrieve posts!'));
    setTimeout(() => dispatch({ type: CLEAR_POST_ERROR }), 2000);
  }
}

export const searchPosts = (posts) => (dispatch) => {
  try {
    dispatch({
      type: GET_POSTS,
      posts
    });
  } catch(err) {
    dispatch(postError('Could not find posts'));
    setTimeout(() => dispatch({ type: CLEAR_POST_ERROR }), 2000);
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
    err.message === 'Request failed with status code 401' ? dispatch(postError('Must log in before completing action')) : dispatch(postError('Could not complete action'));
    setTimeout(() => dispatch({ type: CLEAR_POST_ERROR }), 2000);
  }
}

export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`https://coders-api.herokuapp.com/post/${id}`);
    dispatch({
      type: GET_POST,
      post: res.data.post
    })
  } catch(err) {
    dispatch(postError('Could not retrieve post!'));
    setTimeout(() => dispatch({ type: CLEAR_POST_ERROR }), 2000);
  }
}

export const addComment = (commentData) => async (dispatch) => {
  try {
    const { text, author, id } = commentData;
    await axios.put(`https://coders-api.herokuapp.com/comment/${id}`, { text, author }, { headers: { 'authorization': localStorage.getItem('token') }});
    dispatch(getPosts());
  } catch(err) {
    err.message === 'Request failed with status code 401' ? dispatch(postError('Must log in before completing action')) : dispatch(postError('Could not complete action'));
    setTimeout(() => dispatch({ type: CLEAR_POST_ERROR }), 2000);
  }
}

export const addPostLike = (data) => async (dispatch) => {
  try {
    const { postId, authorId } = data;
    const res = await axios.put(`https://coders-api.herokuapp.com/post/like`, { postId, authorId }, { headers: { 'authorization': localStorage.getItem('token') }});
    dispatch(getPosts());
    dispatch({ type: UPDATE_USER, user: res.data });
  } catch(err) {
    err.message === 'Request failed with status code 401' ? dispatch(postError('Must log in before completing action')) : dispatch(postError('Could not complete action'));
    setTimeout(() => dispatch({ type: CLEAR_POST_ERROR }), 2000);
  }
}

export const removePostLike = (data) => async (dispatch) => {
  try {
    const { postId, authorId } = data;
    const res = await axios.put(`https://coders-api.herokuapp.com/post/removeLike`, { postId, authorId }, { headers: { 'authorization': localStorage.getItem('token') }});
    dispatch(getPosts());
    dispatch({ type: UPDATE_USER, user: res.data });
  } catch(err) {
    err.message === 'Request failed with status code 401' ? dispatch(postError('Must log in before completing action')) : dispatch(postError('Could not complete action'));
    setTimeout(() => dispatch({ type: CLEAR_POST_ERROR }), 2000);
  }
}

export const deletePost = (id, user) => async (dispatch) => {
  try {
    const res = await axios.delete(`https://coders-api.herokuapp.com/post/${id}`, { headers: { 'authorization': localStorage.getItem('token') }});
    if (res.status === 200) dispatch(getUsersPosts(user));
  } catch(err) {
    err.message === 'Request failed with status code 401' ? dispatch(postError('Must log in before completing action')) : dispatch(postError('Could not complete action'));
    setTimeout(() => dispatch({ type: CLEAR_POST_ERROR }), 2000);
  }
}

export const topPosts = () => async (dispatch) => {
  try {
    const top = await axios.get(`https://coders-api.herokuapp.com/browse/top`);
    const tags = await axios.get(`https://coders-api.herokuapp.com/browse/tags`);
    const users = await axios.get(`https://coders-api.herokuapp.com/browse/users`);
    dispatch({ type: BROWSE, top: top.data, tags: tags.data, users: users.data });
  } catch(err) {
    err.message === 'Request failed with status code 401' ? dispatch(postError('Must log in first')) : dispatch(postError('Could not complete action'));
    setTimeout(() => dispatch({ type: CLEAR_POST_ERROR }), 2000);
  }
}

export const likeComment = (postId, commentId, userId) => async (dispatch) => {
  try {
    await axios.post('https://coders-api.herokuapp.com/comment/like', { postId, commentId, userId }, { headers: { 'authorization': localStorage.getItem('token') }});
    dispatch(getPosts());
  } catch(err) {
    err.message === 'Request failed with status code 401' ? dispatch(postError('Must log in first')) : dispatch(postError('Could not complete action'));
    setTimeout(() => dispatch({ type: CLEAR_POST_ERROR }), 2000);
  }
}

export const removeLikeComment = (postId, commentId, userId) => async (dispatch) => {
  try {
    await axios.post('https://coders-api.herokuapp.com/comment/removeLike', { postId, commentId, userId }, { headers: { 'authorization': localStorage.getItem('token') }});
    dispatch(getPosts());
  } catch(err) {
    err.message === 'Request failed with status code 401' ? dispatch(postError('Must log in first')) : dispatch(postError('Could not complete action'));
    setTimeout(() => dispatch({ type: CLEAR_POST_ERROR }), 2000);
  }
}

export const deleteComment = (id) => async (dispatch) => {
  try {
    await axios.delete(`https://coders-api.herokuapp.com/comment/${id}`, { headers: { 'authorization': localStorage.getItem('token') }});
    dispatch(getPosts());
  } catch(err) {
    err.message === 'Request failed with status code 401' ? dispatch(postError('Must log in first')) : dispatch(postError('Could not complete action'));
    setTimeout(() => dispatch({ type: CLEAR_POST_ERROR }), 2000);
  }
}

const postError = (error) => {
  return {
    type: POST_ERROR,
    error
  }
}