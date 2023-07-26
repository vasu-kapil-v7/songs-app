// LoginForm.tsx
import React, { useState } from 'react';
import { Typography, TextField, Button } from '@mui/material';
import { useUserContext } from '../../contexts/user';
import { useNavigate } from 'react-router-dom';
import { LoginPaper } from './styles';
import { LoginFormProps } from './types';

export const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
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
      <Button sx={{ marginTop: '16px' }} variant="contained" color="primary" fullWidth onClick={handleLoginSubmit}>
        Login
      </Button>
    </LoginPaper>
  );
};
