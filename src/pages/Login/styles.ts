import { styled, Paper } from '@mui/material';

export const LoginPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 400,
  margin: 'auto',
  marginTop: '20%',
  border: '1px solid black',
}));
