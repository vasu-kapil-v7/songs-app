import React from 'react';
import { Button, Typography } from '@mui/material';
import { useUserContext } from '../../contexts/user';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../shared/Button';

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
        <div style={{display : "flex", alignItems : "center"}}>
          <Typography variant="body1" sx={{ cursor: 'pointer',marginRight:"8px" }} onClick={handleFavoritesClick}>
            Favorites
          </Typography>
          <Typography variant="body1" sx={{marginRight:"8px"}}>{user.username}</Typography>
          <Button onClick={logout}>Logout</Button>
        </div>
      ) : (
        <CustomButton buttonType="login" onClick={handleLoginClick}>
          Login
        </CustomButton>
      )}
    </>
  );
};

export default UserActions;
