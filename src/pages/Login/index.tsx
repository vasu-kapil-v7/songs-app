import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { AppBar as MuiAppBar, Toolbar, Typography, InputBase, IconButton, Button, Modal as MuiModal, Paper, TextField } from '@mui/material';
import { useUserContext } from '../../contexts/user';
import { useNavigate } from 'react-router-dom';

const LoginPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    maxWidth: 400,
  }));
  
  interface LoginFormProps {
    onClose: () => void;
  }
  
  export const LoginForm: React.FC<LoginFormProps> = ({onClose}) => {
    const { login } = useUserContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    };
  
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    };


  
    const handleLoginSubmit = () => {
      console.log('Email:', email);
      console.log('Password:', password);
      const dummyUsername = 'JohnDoe';
      login(dummyUsername);
      onClose();
      navigate('/');


    };
  
    return (
      <LoginPaper>
        <Typography variant="h6" align="center" gutterBottom>
          Login Form
        </Typography>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          margin="normal"
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleLoginSubmit}>
          Login
        </Button>
      </LoginPaper>
    );
  };
  