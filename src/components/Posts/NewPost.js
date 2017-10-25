import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import AddAPhoto from 'material-ui-icons/AddAPhoto';
import Chip from 'material-ui/Chip';
import Typography from 'material-ui/Typography';
import Card, { CardHeader, CardMedia, CardContent } from 'material-ui/Card';
import Snackbar from 'material-ui/Snackbar';
import './css/NewPost.css';

export default class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      error: '',
      chipArray: [],
      content: 'This is where your content goes',
      title: 'Title',
      picture: null
    }
    this.handleTags = this.handleTags.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleContent = this.handleContent.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const newPost = {
      title: this.state.title,
      author: this.props.auth.user._id,
      content: this.state.content,
      picture: this.state.picture,
      tags: this.state.chipArray
    }
    this.props.createPost(newPost);
  }

  handleTags(e) {
   let chips = e.target.value.split(',');
   chips = chips.map((chip, i) => {
     return { key: i, label: chip.toLowerCase() }
   });
   this.setState({chipArray: chips})
  }

  handleTitle(e) {
   this.setState({ title: e.target.value });
  }

  handleContent(e) {
   this.setState({ content: e.target.value });
  }

  handleImage(e) {
    const file = e.target.files[0];
    if (file.size >= 14000000) return this.setState({ error: "image must be under 14mb"});
    var reader = new FileReader();
    reader.onload = (upload) => {
      this.setState({ picture: upload.target.result });
    };
    reader.readAsDataURL(file);
  }

  render() {
    return (
      <div>
        {this.props.posts.newPostId ? <Redirect to={`/posts/${this.props.posts.newPostId}`} />: null}
        <form className="new-post-form" onSubmit={this.handleSubmit}>
        <div className="posts-container">
        <Card className="post-card">
        <CardHeader 
          title={<TextField required className="field-new-post-form" name="title" onChange={this.handleTitle} placeholder="Title" />}
          subheader={this.props.auth.user.username}/>
          {this.state.picture ? 
            (<CardMedia className="post-image" title="image" ref={node => this.image = node} image={this.state.picture} />) :
            (<div><input accept="image/*" id="file" type="file" onChange={this.handleImage} name="photo" className="hidden-input"/>
          <Button className="upload-label-post">
            <label htmlFor="file" className="upload-label-post">
              <AddAPhoto className="add-photo-icon"/>
            </label>
          </Button></div>)}
        <CardContent>
          <Typography component="p">
            <TextField required className="content-new-post-form" rows={12} name="content" onChange={this.handleContent} multiline placeholder="Content" />
          </Typography>
            <Typography component="p">
              <TextField className="field-new-post-form" name="tags" onChange={this.handleTags} placeholder="Tags"/>
            </Typography>
            <button type="submit" className="new-post-submit">Submit Post</button>
        </CardContent>
        <div className="chip-div">
            {this.state.chipArray.map(data => {
            return (
              <Chip
                label={data.label}
                key={data.key}
              />
            );
            })}
          </div>
        </Card>
        </div>
        </form>
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
          <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.error.length > 0}
          autoHideDuration={2000}
          onRequestClose={() => this.setState({error: ''})}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.error}</span>}
          className="snack"
          />
      </div>
    )
  }
}