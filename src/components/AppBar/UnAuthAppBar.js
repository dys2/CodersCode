import React from 'react';
import Login from '../User/Login';
import CreateAccount from '../User/CreateAccount';

export default (props) => (
  <div>
    <CreateAccount auth={props.auth} userSignup={props.userSignup}/>
    <Login loginUser={props.loginUser} auth={props.auth}/>
  </div>
)
