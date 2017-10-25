import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPost } from '../../actions/posts';
import { bindActionCreators } from 'redux';
import Comment from './Comment';
import Typography from 'material-ui/Typography';
import Card, { CardHeader, CardMedia, CardContent } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import Snackbar from 'material-ui/Snackbar';

import './css/IndPost.css';

class IndPost extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }
  render() {
    return this.props.posts.post ? (
      <div className="posts-container">
        <Card className="post-card">
          <CardHeader 
            avatar={
              <Avatar alt={`${this.props.posts.post.author.username}'s avatar`}
              src={this.props.posts.post.author.picture}
              />
            }
            title={this.props.posts.post.title}
            subheader={<Link to={`/user/${this.props.posts.post.author._id}`}>
            {this.props.posts.post.author.username}
          </Link>}/>
            <CardMedia className="post-image" title="image" ref={node => this.image = node} image={this.props.posts.post.picture} />
              <CardContent className="card-content">
                <Typography component="p" className="post-para">
                  {this.props.posts.post.content}
                </Typography>
                <Comment id={this.props.posts.post._id} likes={this.props.posts.post.likes} comments={this.props.posts.post.comments} more={true}/>
              
              <div className="chip-div">
                {this.props.posts.post.tags.map(data => {
                  return (
                    <Chip
                      label={data.label}
                      key={data.key}
                    />
                  );
                })} 
              </div>
              </CardContent >
          </Card>
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
    ) :  null;
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({ getPost }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(IndPost);
