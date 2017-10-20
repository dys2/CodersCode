import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsersPosts, deletePost } from '../../actions/posts';
import { findUser } from '../../actions/user';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Avatar from 'material-ui/Avatar';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Collapse from 'material-ui/transitions/Collapse';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import Favorite from 'material-ui-icons/Favorite';
import Subject from 'material-ui-icons/Subject';
import Laptop from 'material-ui-icons/Pages';
import './css/Profile.css';


class User extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDialog = this.handleDialog.bind(this);
  }
  componentDidMount() {
    this.props.findUser(this.props.match.params.id);
    const int = setInterval(() => {
      if (this.props.user.user._id) {
        this.props.getUsersPosts(this.props.user.user._id);
        clearInterval(int);
      }
    }, 50);
  }
  handleClick() {
    this.setState({ open: !this.state.open });
  }
  handleDialog(e, id) {
    e.preventDefault();
    if (!id) id = '';
    this.setState({ dialog: !this.state.dialog, deleteId: id });
  }
  handleDelete(e) {
    e.preventDefault();
    this.props.deletePost(this.state.deleteId);
    this.setState({ dialog: false, deleteId: '' });
  }
  render() {
    return (
      <div>
      <Avatar
          alt={`${this.props.user.user.username}'s avatar`}
          src={this.props.user.user.picture}
          className="profile-avatar"
        />
        <h2>{this.props.user.user.username}</h2>
        <p>{this.props.user.user.email}</p>
       <ListItem button onClick={this.handleClick} className="posts-list">
          <ListItemIcon>
              <Laptop />
          </ListItemIcon>
          <ListItemText className="posts-text-prof" inset primary="Posts" />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        {this.props.posts.posts && this.props.posts.posts.length > 0 ?
          this.props.posts.posts.map((post) => {
          return (
            <Collapse in={this.state.open} transitionDuration="auto" unmountOnExit className="posts-list">
            <Link to={{
              pathname: `/posts/${post._id}`,
              state: this.props.posts
              }} > 
              <ListItem button >
            <ListItemIcon>
              <Subject />
            </ListItemIcon>
            <ListItemText className="user-post-title" inset primary={post.title} />
            
            <ListItemIcon >
              <Favorite/>
            </ListItemIcon>
            <Typography>{post.likes.length}</Typography>
          </ListItem>
          </Link>
           </Collapse>
          )
        }) : (
            <Collapse in={this.state.open} transitionDuration="auto" unmountOnExit className="posts-list">
            <h2>You currently have no posts</h2>
           </Collapse>
          )}
      <Dialog open={this.state.dialog} onRequestClose={this.handleDialog}>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Once a post is deleted it cannot be revived! Choose carefully..
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialog} color="primary">
              No
            </Button>
            <Button onClick={this.handleDelete} color="primary">
              Yes
            </Button>
          </DialogActions>
        </Dialog>
     </div>
)
  }

}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    posts: state.posts,
    user: state.user
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({ getUsersPosts, deletePost, findUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(User);