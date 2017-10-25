import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { CircularProgress } from 'material-ui/Progress';
import Snackbar from 'material-ui/Snackbar';
import './css/SignInPage.css';


export default class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let { username, password } = e.target;
    username = username.value;
    password = password.value;
    this.props.loginUser({ username, password });
  }
  // async handleFB(e) {
  //   try {
  //     const user = {};
  //     await FB.login(async (res) => {
  //       console.log(res);
  //       const id = await res.authResponse.userID;
  //       const token = await res.authResponse.accessToken;
  //       console.log(token);
  //       await FB.api(`/${id}/picture`, (response) => {
  //         user['picture'] = response.data.url;
  //       });

  //     }, {
  //       scope: 'email,user_photos,public_profile',
  //     });
  //     console.log(user);
  //     // FB.api(`/${id}`, (res) => {
  //     //   console.log(res);
  //     // })
  //   } catch(err) {
  //     console.log(err);
  //   }
  // }

  render() {
    return (
      <div>
          <form onSubmit={this.handleSubmit} className="signin-form" >
            <TextField
              required
              className="signin-inputs"
              name="username"
              label="Username"
            />
      
            <TextField 
              required
              label="Password"
              type="password"
              name="password"
              className="signin-inputs"
            />
            <button type="submit" className="signin-btn">Log-in</button>
            <div className={this.props.auth.isFetching ? "log-in-progress" : "hide"}>
              <CircularProgress  size={30} />
            </div>
          </form>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.props.auth.error.length > 0}
          autoHideDuration={2000}
          onRequestClose={() => console.log}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.auth.error}</span>}
          className="snack"
          />
      </div>
    );
  }
}
