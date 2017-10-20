import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { CircularProgress } from 'material-ui/Progress';
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
      </div>
    );
  }
}
