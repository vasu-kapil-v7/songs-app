import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { AppBar as MuiAppBar, Toolbar, Typography, InputBase, IconButton, Button } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import ModalComponent from '../../shared/Modal/Modal';
import { LoginForm } from '../../pages/Login';
import { useUserContext } from '../../contexts/user';
import FavoritesSidebar from '../Favorites';

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  backgroundColor: '#19a4c3;',
  color: '#ffffff',
}));

const LogoLink = styled(Link)({
  flexGrow: 1,
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Search = styled('div')(({ theme }) => ({
  flexGrow: 3,
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2), 
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  padding: theme.spacing(1, 1, 1, 0),
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  transition: theme.transitions.create('width'),
  width: '100%',
}));

const LoginButton = styled(Button)(({ theme }) => ({
    flexGrow: 2,
  marginLeft: theme.spacing(2),
}));

const AppBarComponent: React.FC = () => {
    const { user, logout } = useUserContext();
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [isFavoritesDrawerOpen, setIsFavoritesDrawerOpen] = useState(false);

    const handleLoginOpen = () => {
      setOpenLoginModal(true);
    };
  
    const handleLoginClose = () => {
      setOpenLoginModal(false);
    };

    const handleFavoritesDrawerOpen = () => {
      setIsFavoritesDrawerOpen(true);
    };
  
    const handleFavoritesDrawerClose = () => {
      setIsFavoritesDrawerOpen(false);
    };


  return (
    <>
    <AppBar position="static">
      <Toolbar>
        <LogoLink to="/">
          <Typography variant="h6">Logo</Typography>
        </LogoLink>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <SearchInput placeholder="Search..." />
        </Search>
        {user ? (
            <div>
              <Typography variant="body1" onClick={handleFavoritesDrawerOpen}>
                Favorites
              </Typography>
              <Typography variant="body1">{user.username}</Typography>
              <Button onClick={logout}>Logout</Button>
            </div>
          ) : (
            <LoginButton onClick={handleLoginOpen}>Login</LoginButton>
          )}
      </Toolbar>
    </AppBar>
     <ModalComponent open={openLoginModal} onClose={handleLoginClose}>
     <LoginForm onClose={handleLoginClose}/>
   </ModalComponent>
   <FavoritesSidebar isOpen={isFavoritesDrawerOpen} onClose={handleFavoritesDrawerClose} />
   </>
  );
};

export default AppBarComponent;
