import React, { Component } from 'react';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import AddAPhoto from 'material-ui-icons/AddAPhoto';
import { CircularProgress } from 'material-ui/Progress';
import'./css/CreateAccount.css';

export default class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state= {
      open: false,
      noMatch: false,
      picture: '',
      error: ''
    }
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImage = this.handleImage.bind(this);
  }

  componentDidUpdate() {
    if (this.state.noMatch) setTimeout(() => this.setState({ noMatch: false }), 2000);
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleSubmit(e) {
    e.preventDefault();
    let { username, email, password, confirmPassword } = e.target;
    const picture = this.state.picture;
    username = username.value;
    email = email.value;
    password = password.value;
    confirmPassword = confirmPassword.value;
    return confirmPassword === password ? 
      this.props.userSignup({ username, email, password, picture }):
      this.setState({noMatch: true});
  }
  
  handleImage(e) {
    const file = e.target.files[0];
    if (file.size >= 14000000) return this.setState({ error: "image must be under 14mb!"})
    var reader = new FileReader();
    reader.onload = (upload) => {
      this.preview.src = upload.target.result;
      this.setState({ picture: upload.target.result });
    };
    reader.readAsDataURL(file);
  }
  render() {
    return (
      <div>
        <Button
          raised
          onClick={this.handleOpen}
          ref={node => this.button = node}
          className="sign-up-btn"
          >Sign Up</Button>
        <Dialog open={this.state.open}
          onRequestClose={this.handleClose}
          maxWidth="sm"
          fullWidth="true"
          className="create-account-title"
          >
          <DialogTitle>Create Account</DialogTitle>
          <form className="create-account-form" onSubmit={this.handleSubmit}>
          <input accept="image/*" id="file" type="file" onChange={this.handleImage} name="photo" className="hidden-input"/>
          <label>Add A Photo:</label>
          <img src="" ref={node => this.preview = node} className="img-prev" alt="preview" />
          <Button className="upload-label">
            <label htmlFor="file" className="upload-label">
              <AddAPhoto className="add-photo-icon"/>
            </label>
          </Button>  
          <TextField
            required
            className="create-account-inputs"
            name="email"
            label="Email"
            type="email"
          />
          <TextField
            required
            className="create-account-inputs"
            name="username"
            label="Username"
          />
          <TextField
            required
            className="create-account-inputs"
            name="password"
            label="Password"
            type="password"
          />
          <TextField
            required
            className="create-account-inputs"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
          />
          <button type="submit">Create Account</button>
          <div className={this.props.auth.isFetching ? "log-in-progress" : "hide"}>
              <CircularProgress  size={30} />
            </div>
          </form>
          <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.noMatch}
          autoHideDuration={2000}
          onRequestClose={this.handleRequestClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Passwords must match, Try Again!</span>}
          className="snack"
          />
        </Dialog>
      </div>
    )
  }
}