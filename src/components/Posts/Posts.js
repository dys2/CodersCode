import React, { Component } from 'react';
import Post from './Post';
import { connect } from 'react-redux';
import { getPosts, createPost } from '../../actions/posts';
import { bindActionCreators } from 'redux';

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    return (
      <div className="posts-container">
        {this.props.posts.posts ? this.props.posts.posts.map(post => <Post post={post} addComment={this.props.addComment} key={post._id}/>) : ''}
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
