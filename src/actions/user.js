import axios from 'axios';

export const FIND_USER = "FIND_USER";

export const findUser = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:8080/user/${id}`, { headers: { 'authorization': localStorage.getItem('token') }});
    dispatch({ type: FIND_USER, user: res.data.user });
  } catch(err) {
    console.log(err);
  }
}