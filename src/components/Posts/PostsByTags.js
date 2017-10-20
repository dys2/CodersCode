import React, { Component } from 'react';
import Post from './Post';
import { connect } from 'react-redux';
import { getPosts, searchPosts } from '../../actions/posts';
import { bindActionCreators } from 'redux';

class PostsByTags extends Component {
  async componentDidMount() {
    await this.props.getPosts()
    const tag = this.props.match.params.tag.trim();
    const posts = this.props.posts.posts.filter((post) => {
      if (post.tags.map(t => t.label.trim()).includes(tag)) return post;
    });
    this.props.searchPosts(posts);
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

const mapDispatchToProps = dispatch => bindActionCreators({ getPosts, searchPosts }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(PostsByTags);