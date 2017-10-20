import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Link } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import Popover from 'material-ui/Popover';
import { MenuItem } from 'material-ui/Menu';
import ArrowDropDown from 'material-ui-icons/ArrowDropDown';

import './css/AuthAppBar.css';

export default class AuthAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
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

  handleLogout() {
    this.props.logoutUser();
  }

  render() {
    return (
      <div>
        <div className="auth-bar">
        <Avatar
          alt={`${this.props.auth.user.username}'s avatar`}
          src={this.props.auth.user.picture}
          className="menu-avatar"
        />  
        <Button 
          aria-owns={this.state.open ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleOpen}
          ref={node => this.button = node}
          className="arrow-dd-btn"
        >
          <ArrowDropDown />
        </Button>
        </div>
        <Popover
          className="popover"
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
          transformOrigin={{ vertical: 'top', horizontal: 'left', }}
          onRequestClose={this.handleClose}
        >
        <MenuItem><Link to='/profile'>Profile</Link></MenuItem>
        <MenuItem><Link to='/account'>Account</Link></MenuItem>
        <MenuItem onClick={this.handleLogout} >Logout</MenuItem>
        </Popover>
    </div>
    )
  }
}
