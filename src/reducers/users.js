import { FIND_USER } from '../actions/user';

const initialState = {
  user: { username: null, email: null, picture: null, liked: [], _id: null },
  users: [],
  error: ''
}
export default (state = initialState, action) => {
  switch(action.type) {
    case FIND_USER:
      return {
        ...state,
        user: action.user
      }
    default:
      return state;
  }
}