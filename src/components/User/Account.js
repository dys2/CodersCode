import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userUpdate, checkPassword } from '../../actions/auth';
import { bindActionCreators } from 'redux';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Input from 'material-ui/Input';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import AddAPhoto from 'material-ui-icons/AddAPhoto';
import Edit from 'material-ui-icons/Edit';
import './css/Account.css';


class Account extends Component {
  constructor() {
    super();
    this.state = {
      edit: false,
      snack: false,
      checkPassword: false,
      message: ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.updateImage = this.updateImage.bind(this);
    this.updateAccount = this.updateAccount.bind(this);
    this.handleSnack = this.handleSnack.bind(this);
    this.handlePasswordCheck = this.handlePasswordCheck.bind(this);
  }

  updateImage(e) {
    e.preventDefault();
    const file = e.target.files[0];
    if (file.size >= 14000000) {
      this.setState({ snack: true, message: "image must be under 14mb!"});
      return setTimeout(() => this.setState({ snack: false, message: '' }), 2000);
    }
    var reader = new FileReader();
    reader.onload = async (upload) => {
      await this.props.userUpdate({ picture: upload.target.result });
      window.location.reload();
    };
    reader.readAsDataURL(file);
  }
  handleSnack(message) {
    this.setState({ snack: true, message });
    return setTimeout(() => this.setState({ snack: false, message: '' }), 2000);
  }
  updateAccount(e) {
    e.preventDefault();
    const update = {};
    if (e.target.password.value !== e.target.confirmPassword.value) return this.handleSnack('Passwords must match!!');
    if (e.target.username.value !== this.props.auth.user.username) update['username'] = e.target.username.value;
    if (e.target.email.value !== this.props.auth.user.email) update['email'] = e.target.email.value;
    if (e.target.password.value !== "") update['password'] = e.target.password.value;
    if (e.target.password.value.length >= 1 && e.target.password.value.length < 5) return this.handleSnack('Password must be longer than 5 characters!!');
    this.props.userUpdate(update);
    window.location.reload()
  }
  handleClick() {
    if (!this.state.checkPassword && !this.state.edit) this.setState({checkPassword: true});
    this.setState({ edit: !this.state.edit });
  }
  async handlePasswordCheck(e) {
    e.preventDefault();
    const user = { username: this.props.auth.user.username, password: this.password.value };
    if (this.props.auth.trys < 5) await this.props.checkPassword(user);
    if (this.props.auth.confirmed) return this.setState({ checkPassword: false })
    if (this.props.auth.trys >= 5) return this.setState({ snack: true, message: 'Too many attempts, try again in 5 minutes' });
    return this.setState({ snack: true, message: 'Incorrect Password' });
  }

  render() {
    return (
      <div className="account-container">
      <Avatar
          alt={`${this.props.auth.user.username}'s avatar`}
          src={this.props.auth.user.picture}
          className="profile-avatar"
        />
        <input accept="image/*" id="file" type="file" onChange={this.updateImage} name="photo" className="hidden-input"/>
        <Button className="account-upload-label" fab={true}>
            <label htmlFor="file" className="upload-label">
              <AddAPhoto className="add-photo-icon"/>
            </label>
          </Button>  
        <List className="account-list">
          <ListItem className="account-item">
            <ListItemText inset={true} primary="Account Settings" />
          <ListItemIcon className="account-edit-icon" onClick={this.handleClick}>
            <Edit />
          </ListItemIcon>
          </ListItem>
          {this.state.edit ? (
            <form className="account-form" onSubmit={this.updateAccount} >
              <ListItem className="account-item">
                <ListItemText
                  inset={true}
                  primary={<Input name="username" fullWidth disableUnderline defaultValue={this.props.auth.user.username} />}
                  secondary="username"
                />
              </ListItem>
              <ListItem className="account-item">
                <ListItemText
                  inset={true}
                  primary={<Input name="email" fullWidth disableUnderline defaultValue={this.props.auth.user.email} />}
                  secondary="email"
                />
              </ListItem>
              <ListItem className="account-item">
                <ListItemText
                  inset={true}
                  primary={<Input name="password" fullWidth disableUnderline type="password" placeholder="Change Password" />}
                  secondary="password"
                />
              </ListItem>
              <ListItem className="account-item">
                <ListItemText
                  inset={true}
                  primary={<Input name="confirmPassword" fullWidth disableUnderline type="password" placeholder="Confirm Change Password" />}
                  secondary="confirm password"
                />
              </ListItem>
              <Button raised type="submit" className="account-submit">Submit</Button>
            </form>
          ) : (
            <div>
              <ListItem className="account-item">
              <ListItemText inset={true} primary={this.props.auth.user.username} secondary="username" />
            </ListItem>
            <ListItem className="account-item">
              <ListItemText inset={true} primary={this.props.auth.user.email} secondary="email"/>
            </ListItem>
            </div>
            )}
        </List>
        <Dialog open={this.state.checkPassword} onRequestClose={() => this.setState({ checkPassword: false, edit: false })}>
          <DialogTitle>Enter Password</DialogTitle>
          <form>
          <DialogContent>
            <DialogContentText>
              To edit account information you must enter your password
            </DialogContentText>
            
            <TextField
              autoFocus
              margin="dense"
              inputRef={(password) => this.password = password}
              label="Password"
              type="password"
              fullWidth
            />
            
          </DialogContent>
          <DialogActions>
            <Button type="submit" onClick={this.handlePasswordCheck} color="primary">
              Enter
            </Button>
          </DialogActions>
          </form>
        </Dialog>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.snack}
          autoHideDuration={2000}
          onRequestClose={() => this.setState({ snack: false })}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.message}</span>}
          className="snack"
          />
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

const mapDispatchToProps = dispatch => bindActionCreators({ userUpdate, checkPassword }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Account);