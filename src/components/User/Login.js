import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Button from 'material-ui/Button';
import Popover from 'material-ui/Popover';
import TextField from 'material-ui/TextField';
import { CircularProgress } from 'material-ui/Progress';
import './css/Login.css';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
    open: false,
  };
  this.handleOpen = this.handleOpen.bind(this);
  this.handleClose = this.handleClose.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOpen() {
    this.setState({ 
    open: true,
    anchorEl: findDOMNode(this.button)
    });
  }

  handleClose() {
    this.setState({ open: false });
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
        <Button
          aria-owns={this.state.open ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleOpen}
          ref={node => this.button = node}
          className="log-in-btn"
          >Login</Button>
        <Popover
          className="popover"
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
          transformOrigin={{ vertical: 'top', horizontal: 'left', }}
          onRequestClose={this.handleClose}
        >
          <form onSubmit={this.handleSubmit} className="login-form" >
            <TextField
              required
              className="login-inputs"
              name="username"
              label="Username"
            />
      
            <TextField 
              required
              label="Password"
              type="password"
              name="password"
              className="login-inputs"
            />
            <button type="submit">Log-in</button>
            <div className={this.props.auth.isFetching ? "log-in-progress" : "hide"}>
              <CircularProgress  size={30} />
            </div>
          </form>
        </Popover>
      </div>
    );
  }
}
