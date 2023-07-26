import React from 'react';
import { IconButton, Button as MuiButton } from '@mui/material';
import { PlayArrow as PlayArrowIcon, Favorite as FavoriteIcon } from '@mui/icons-material';

interface ButtonProps {
  buttonType: 'play' | 'favorite' | 'login';
  onClick: () => void;
  children?: React.ReactNode;
}

const CustomButton: React.FC<ButtonProps> = ({ buttonType, onClick,children }) => {
  const renderButton = () => {
    switch (buttonType) {
      case 'play':
        return (
          <IconButton color="primary" aria-label="play" onClick={onClick}>
            <PlayArrowIcon />
          </IconButton>
        );
      case 'favorite':
        return (
          <IconButton color="secondary" aria-label="favorite" onClick={onClick}>
            <FavoriteIcon />
          </IconButton>
        );
        case 'login':
          return (
            <MuiButton variant="contained" color="primary" onClick={onClick}>
              {children}
            </MuiButton>
          );
      default:
        return null;
    }
  };

  return renderButton();
};

export default CustomButton;