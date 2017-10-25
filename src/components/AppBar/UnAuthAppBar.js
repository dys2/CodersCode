import React from 'react';
import Login from '../User/Login';
import CreateAccount from '../User/CreateAccount';
import Snackbar from 'material-ui/Snackbar';

export default (props) => (
  <div>
    <CreateAccount auth={props.auth} userSignup={props.userSignup}/>
    <Login loginUser={props.loginUser} auth={props.auth}/>
    <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={props.auth.error.length > 0}
          autoHideDuration={2000}
          onRequestClose={() => console.log}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{props.auth.error}</span>}
          className="snack"
          />
  </div>
)
