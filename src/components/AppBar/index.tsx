import React, { useState } from 'react';
import { AppBar, LogoLink } from './styles';
import SearchBar from './SearchBar';
import UserActions from './User';
import { LoginForm } from '../../pages/Login';
import ModalComponent from '../../shared/Modal/Modal';
import SongsGrid from '../SongGrid';
import { useRecoilValue } from 'recoil';
import { allSongsAtom } from '../../atom/AllSongs';
import { useUserContext } from '../../contexts/user';
import { Box, Button, Toolbar, Typography } from '@mui/material';

const AppBarComponent: React.FC = () => {
  const { user } = useUserContext();
  const [openLoginModal, setOpenLoginModal] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearchChange = (searchValue: string) => {
    setSearchTerm(searchValue);
  };

  const handleLoginOpen = () => {
    setOpenLoginModal(true)
  };

  const handleLoginClose = () => {
    setOpenLoginModal(false);
  };

  const allSongs = useRecoilValue<Song[]>(allSongsAtom);

  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <LogoLink to="/">
            <Typography variant="h6">Songs App</Typography>
          </LogoLink>
          <SearchBar onSearchChange={handleSearchChange} />
          <UserActions />
        </Toolbar>
      </AppBar>
      </Box>
      {user ? (
        <div style={{ marginTop: '64px' }}>
          <SongsGrid searchTerm={searchTerm} />
        </div>
      ) : (
        <div style={{ marginTop: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
           <Typography variant="h1" style={{ color: 'white', fontSize: 64, position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
            Welcome to Songs App
          </Typography>
          <img style={{ objectFit: 'cover', height: '800px', width: '100%' }} src="/music.jpg" alt="Login Prompt" />
        </div>
      )}
      <ModalComponent open={openLoginModal} onClose={handleLoginClose}>
        <LoginForm onClose={handleLoginClose} />
      </ModalComponent>
    </>
  );
};

export default AppBarComponent;
