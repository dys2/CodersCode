import React, { Component } from 'react';
import Post from './Post';
import { connect } from 'react-redux';
import { getPosts, createPost } from '../../actions/posts';
import { bindActionCreators } from 'redux';
import Snackbar from 'material-ui/Snackbar';

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    return (
      <div className="posts-container">
        {this.props.posts.posts ? this.props.posts.posts.map(post => <Post post={post} addComment={this.props.addComment} key={post._id}/>) : ''}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.props.posts.error.length > 0}
          autoHideDuration={2000}
          onRequestClose={() => console.log}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.posts.error}</span>}
          className="snack"
          />
      </div>
    )
  }
} 

const mapStateToProps = (state) => {
  return {
    posts: state.posts
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({ getPosts, createPost }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Posts);
