import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_REQUEST,
  UPDATE_USER,
  CHECK_PASSWORD,
  RESET_TRYS
} from '../actions/auth';

const initialState = {
  isFetching: false,
  isAuth: localStorage.getItem('token') ? true : false,
  confirmed: false,
  trys: 0,
  user: { username: null, email: null, picture: null, liked: [], _id: null }
};

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuth: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuth: true,
        user: action.user
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        trys: ++state.trys,
        isFetching: false,
        isAuth: false,
      };
    case CHECK_PASSWORD: {
      return {
        ...state,
        trys: ++state.trys,
        confirmed: action.confirmed
      }
    };
    case RESET_TRYS: {
      return {
        ...state,
        trys: 0
      }
    }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        trys: 0,
        isFetching: false,
        isAuth: false,
      };
    case SIGNUP_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuth: false,
    };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuth: true,
        user: action.user
      };
    case UPDATE_USER:
      return {
        ...state,
        isFetching: false,
        isAuth: true,
        user: action.user
      }
    default:
      return state;
  }
}

export default authReducer;