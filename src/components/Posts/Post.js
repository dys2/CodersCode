import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Comment from './Comment';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import Card, { CardHeader, CardMedia, CardContent } from 'material-ui/Card';
import './css/Post.css'

export default class Post extends Component {
  render() {
    return (
      <Card className="post-card">
        <CardHeader
          avatar={
            <Avatar alt={`${this.props.post.author.username}'s avatar`}
            src={this.props.post.author.picture}
            />
          }
          title={<Link to={{
            pathname: `/posts/${this.props.post._id}`,
            state: this.props.post
          }}>
            {this.props.post.title}
          </Link>}
          subheader={<Link to={`/user/${this.props.post.author._id}`}>
            {this.props.post.author.username}
          </Link>} />
        <CardMedia className="post-image" title="image" image={this.props.post.picture} />
        <CardContent className="card-content">
          <Typography component="p" className="post-para">
            {this.props.post.content}
          </Typography>
          <Comment id={this.props.post._id} likes={this.props.post.likes} comments={this.props.post.comments}/>
        </CardContent>
      </Card>
    )
  }
}

