import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsersPosts, deletePost } from '../../actions/posts';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Avatar from 'material-ui/Avatar';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Collapse from 'material-ui/transitions/Collapse';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import Delete from 'material-ui-icons/Delete';
import Subject from 'material-ui-icons/Subject';
import Laptop from 'material-ui-icons/Pages';
import './css/Profile.css';


class Profile extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      dialog: false,
      deleteId: ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDialog = this.handleDialog.bind(this);
  }
  componentDidMount() {
    const int = setInterval(() => {
      if (this.props.auth.user._id) {
        this.props.getUsersPosts(this.props.auth.user._id);
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
    this.props.getUsersPosts(this.props.auth.user._id);
    this.setState({ dialog: false, deleteId: '' });
  }
  render() {
    return (
      <div>
      <Avatar
          alt={`${this.props.auth.user.username}'s avatar`}
          src={this.props.auth.user.picture}
          className="profile-avatar"
        />
        <h2>{this.props.auth.user.username}</h2>
        <p>{this.props.auth.user.email}</p>
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
            <ListItemText inset className="prof-post-title" primary={post.title} />
            <ListItemIcon  onClick={(e) => this.handleDialog(e, post._id)}>
              <Delete className="delete-icon" />
            </ListItemIcon>
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
    posts: state.posts
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({ getUsersPosts, deletePost }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);