import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { AppBar as MuiAppBar, Toolbar, Typography, InputBase, IconButton, Button } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import ModalComponent from '../../shared/Modal/Modal';
import { LoginForm } from '../../pages/Login';
import { useUserContext } from '../../contexts/user';
import SongsGrid, { Song } from '../SongGrid';
import { useRecoilValue } from 'recoil';
import { allSongsAtom } from '../../atom/AllSongs';
import { useNavigate } from 'react-router-dom';

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  backgroundColor: '#19a4c3;',
  color: '#ffffff',
  position: 'fixed',

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
    const navigate = useNavigate();

    const handleLoginOpen = () => {
      setOpenLoginModal(true);
    };
  
    const handleLoginClose = () => {
      setOpenLoginModal(false);
    };


    const allSongs = useRecoilValue<Song[]>(allSongsAtom);

  return (
    <>
    <AppBar>
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
              <Typography variant="body1" sx={{cursor : "pointer"}} onClick={()=>navigate('/favorites')}>
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
    {user ? (
                <div style={{ marginTop: '64px' }}>
                    <SongsGrid />
                </div>
            ) : (
                <div style={{ marginTop: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img style={{objectFit : "cover",height :"100%",width:"100%"}} src="/music.jpg" alt="Login Prompt" />
                    <Button onClick={handleLoginOpen}>Login</Button>
                </div>
            )}
     <ModalComponent open={openLoginModal} onClose={handleLoginClose}>
     <LoginForm onClose={() => {}}/>
   </ModalComponent>
  
   </>
  );
};

export default AppBarComponent;
