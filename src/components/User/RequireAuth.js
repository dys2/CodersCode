import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userSignup, loginUser, logoutUser, authUser } from '../../actions/auth';
import { createPost } from '../../actions/posts';
import { bindActionCreators } from 'redux';

export default (AuthComponent, UnAuthComponent) => {
  class RequireAuth extends Component {
    constructor(props) {
      super(props);
      this.state = {
        auth: false
      }
    }

    componentDidMount() {
      this.props.authUser(localStorage.getItem('token'));
    }

    render() {
      return this.props.auth.isAuth === true ? <AuthComponent {...this.props} /> : <UnAuthComponent {...this.props} />;
    }
  }

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    posts: state.posts
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({ userSignup, loginUser, logoutUser, authUser, createPost }, dispatch);

return connect(mapStateToProps, mapDispatchToProps)(RequireAuth);

  }