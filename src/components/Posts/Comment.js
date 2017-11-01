import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import ThumbUp from 'material-ui-icons/ThumbUp';
import Favorite from 'material-ui-icons/Favorite';
import { connect } from 'react-redux';
import { addComment, addPostLike, removePostLike, likeComment, removeLikeComment, deleteComment } from '../../actions/posts';
import './css/Comment.css';
class Comment extends Component {
  constructor() {
    super();
    this.state = {
      num: 3
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleLikeRemove = this.handleLikeRemove.bind(this);
    this.share = this.share.bind(this);
  }
    componentDidMount() {
      if (this.props.more) this.setState({num: undefined});
    }
  handleSubmit(e) {
    e.preventDefault();
    const commentData = {
      text: e.target.comment.value,
      author: this.props.auth.user._id,
      id: this.props.id
    }
    this.props.addComment(commentData);
    e.target.comment.value = '';
  }
  handleLike() {
    this.props.addPostLike({postId: this.props.id, authorId: this.props.auth.user._id});
  }
  handleLikeRemove() {
    this.props.removePostLike({postId: this.props.id, authorId: this.props.auth.user._id});
  }
  share(id) {
    window.FB.ui({
      method: 'share',
      quote: this.props.post.content,
      href: `https://coderscode.herokuapp.com/posts/${id}`,
    }, function(response){});
  }
  render() {
    return (
      <div className="comment-content">
        <div className="likes-row">
        <IconButton 
          onClick={this.props.auth.user.liked.includes(this.props.id) ? this.handleLikeRemove : this.handleLike }
        >
          <Favorite 
            color={this.props.auth.user.liked.includes(this.props.id) ? 'red' : '' }
          />
        </IconButton>
        <Typography>{this.props.likes.length}</Typography>
        <button className="share-btn" onClick={() => this.share(this.props.id)}>
          <img className="fb-logo-white" alt="white facebook logo" src={require('./css/images/FB-f-Logo__white_29.png')}/>
          <img className="fb-logo-blue" alt="blue facebook logo" src={require('./css/images/FB-f-Logo__blue_29.png')}/>
          <Typography className="share-text" type='caption'>share</Typography>
        </button>
        </div>
        <ul className="comment-container">
          {this.props.comments.sort((a, b) => b.likes.length - a.likes.length).slice(0, this.state.num).map((comment) => {
            return (
              <div className="comment-row">
                <div >
                <Typography className="comment-author">{`${comment.author.username}:`}</Typography>
                <Typography className="comment">{comment.text}</Typography>
                </div>
                <div className="comment-icons">
                {this.props.auth.user._id === comment.author._id ? <IconButton onClick={() => this.props.deleteComment(comment._id)}><DeleteIcon className="delete-icon"/></IconButton> : null}
                {comment.likes.includes(this.props.auth.user._id) ?
                  <IconButton  className="thumb-up-comment" onClick={() => this.props.removeLikeComment(this.props.id, comment._id, this.props.auth.user._id)}>
                    <ThumbUp color="red" className="thumb-up-comment"/>
                  </IconButton> :
                  <IconButton className="thumb-up-comment" onClick={() => this.props.likeComment(this.props.id, comment._id, this.props.auth.user._id)}>
                    <ThumbUp className="thumb-up-comment"/>
                  </IconButton>
                }
                </div>
              </div>
            )
          })}
          {this.props.comments.length > 3 && this.state.num === 3 ? 
            <div className="comment-row"><Typography className="comment-author">...</Typography></div> : null}
        </ul>
      <form className="comment-form" onSubmit={this.handleSubmit}>
        <TextField 
          name="comment"
          placeholder="add a comment.."
          fullWidth
          margin="normal"
          className="comment-input"
        />
      </form>
      </div >
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
};
export default connect(mapStateToProps, { addComment, addPostLike, removePostLike, likeComment, removeLikeComment, deleteComment })(Comment);