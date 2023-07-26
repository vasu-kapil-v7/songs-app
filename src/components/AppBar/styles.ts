import { styled, alpha, AppBar as MuiAppBar, InputBase, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const AppBar = styled(MuiAppBar)(({ theme }) => ({
  backgroundColor: '#19a4c3',
  color: '#ffffff',
  position: 'fixed',
}));

export const LogoLink = styled(Link)({
  flexGrow: 1,
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const Search = styled('div')(({ theme }) => ({
  flexGrow: 2, 
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  margin: theme.spacing(1),
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const SearchInput = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  padding: theme.spacing(1, 1, 1, 0),
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  transition: theme.transitions.create('width'),
  width: '100%',
}));

export const UserActions = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: theme.spacing(2),
}));

export const LoginButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(2),
}));
