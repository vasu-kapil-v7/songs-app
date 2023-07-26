import React from 'react';
import { Button, Typography } from '@mui/material';
import { useUserContext } from '../../contexts/user';
import { useNavigate } from 'react-router-dom';

const UserActions: React.FC = () => {
  const { user, logout } = useUserContext();
  const navigate = useNavigate();

  const handleFavoritesClick = () => {
    navigate('/favorites');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <>
      {user ? (
        <div>
          <Typography variant="body1" sx={{ cursor: 'pointer' }} onClick={handleFavoritesClick}>
            Favorites
          </Typography>
          <Typography variant="body1">{user.username}</Typography>
          <Button onClick={logout}>Logout</Button>
        </div>
      ) : (
        <Button onClick={handleLoginClick}>Login</Button>
      )}
    </>
  );
};

export default UserActions;
