import axios from 'axios';

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";
export const AUTH_USER = "AUTH_USER";
export const UPDATE_USER = "UPDATE_USER";
export const CHECK_PASSWORD = "CHECK_PASSWORD";
export const RESET_TRYS = "RESET_TRYS";
export const CLEAR_AUTH_ERROR = "CLEAR_AUTH_ERROR";

export const loginUser = (creds) => async (dispatch) => {
  const { username, password } = creds;
  dispatch(requestLogin({ username, password }));
  try {
    const res = await axios.post('https://coders-api.herokuapp.com/login', { username, password });
    localStorage.setItem('token', res.data.token);
    dispatch(receiveLogin(res.data.user));
  } catch(err) {
    dispatch(loginError("Username/Password combo is incorrect!"));
    setTimeout(() => dispatch({ type: CLEAR_AUTH_ERROR }), 2000);
  }
}

export const authUser = (token) => async (dispatch) => {
  try {
    const res = await axios.get('https://coders-api.herokuapp.com/auth', { headers: { 'authorization': token }});
    dispatch(receiveLogin(res.data.user));
  } catch(err) {
    dispatch(loginError(""));
  }
}

export const checkPassword = (creds) => async (dispatch) => {
  const { username, password } = creds;
  try {
    const res = await axios.post('https://coders-api.herokuapp.com/login', { username, password });
    if (res.status === 200) dispatch({ type: CHECK_PASSWORD, confirmed: true });
  } catch (err) {
    dispatch({ type: CHECK_PASSWORD, confirmed: false });
    setTimeout(() => dispatch({ type: RESET_TRYS }), 300000);
  }
}

const requestLogin = (creds) => {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuth: false,
    creds
  }
};

const receiveLogin = (user) => {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuth: true,
    user
  }
};

const loginError = (message) => {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuth: false,
    error: message
  }
};


export const logoutUser = () => async (dispatch) => {
  try {
    localStorage.removeItem('token');
    dispatch(receiveLogout());
  } catch(err) {
    dispatch(logoutError("Could not logout!"));
    setTimeout(() => dispatch({ type: CLEAR_AUTH_ERROR }), 2000);
  }
}


const receiveLogout = () => {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuth: false,
  }
};

const logoutError = (message) => {
  return {
    type: LOGOUT_FAILURE,
    isFetching: true,
    isAuth: true,
    error: message
  }
};

export const userSignup = user => async (dispatch) => {
  try {
    dispatch(requestSignup(user));
    const res = await axios.post('https://coders-api.herokuapp.com/register', user);
    localStorage.setItem('token', res.data.token);
    dispatch(receiveSignup(res.data.user));
  } catch(err) {
    dispatch(signupError("User already exists try a different email or username!"));
    setTimeout(() => dispatch({ type: CLEAR_AUTH_ERROR }), 2000);
  }
};


const requestSignup = (user) => {
  return {
    type: SIGNUP_REQUEST,
    isFetching: true,
    isAuth: false,
    user
  }
};

const receiveSignup = (user) => {
  return {
    type: SIGNUP_SUCCESS,
    isFetching: false,
    isAuth: true,
    user
  }
};

const signupError = (message) => {
  return {
    type: SIGNUP_FAILURE,
    isFetching: false,
    isAuth: false,
    error: message
  }
}

export const userUpdate = updates => async (dispatch) => {
  try {
    const res = await axios.put('https://coders-api.herokuapp.com/register', updates, { headers: { 'authorization': localStorage.getItem('token') }});
    dispatch({
      type: UPDATE_USER,
      user: res.data
    });
  } catch(err) {
    dispatch(signupError("Could not update user, username/email may already exist!"));
    setTimeout(() => dispatch({ type: CLEAR_AUTH_ERROR }), 2000);
  }
};
