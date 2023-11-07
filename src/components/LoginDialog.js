import React from 'react';
import { Button, TextField, Dialog, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';

class LoginDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameInput: '',
      passwordInput: '',
    };
  }
  
  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  
  handleLogin = () => {
    const { usernameInput, passwordInput } = this.state;
    
    axios.post('http://127.0.0.1:8000/login/', {
      username: usernameInput,
      password: passwordInput
    })
    .then((response) => {
      if (response.data.status === 'ok') {
        this.props.onLoginSuccess(usernameInput, response.data.role);
      } else {
        alert('Invalid username or password');
      }
    })
    .catch((error) => {
      console.error(error);
    });
    
    this.props.onClose();
  };

  render() {
    const { open, onClose } = this.props;
    const { usernameInput, passwordInput } = this.state;

    return (
      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="usernameInput"
            label="Username"
            type="text"
            fullWidth
            value={usernameInput}
            onChange={this.handleInputChange}
          />
          <TextField
            margin="dense"
            name="passwordInput"
            label="Password"
            type="password"
            fullWidth
            value={passwordInput}
            onChange={this.handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleLogin} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default LoginDialog;