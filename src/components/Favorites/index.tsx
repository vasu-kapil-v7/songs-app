import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useRecoilValue } from 'recoil';
import { favoriteSongsAtom } from '../../atom/CurrentSong';
import { allSongsAtom } from '../../atom/AllSongs';

interface FavoritesSidebarProps {
    isOpen: boolean;
    onClose: () => void;
  }

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
  },
  drawerPaper: {
    width: 240,
  },
}));



const FavoritesSidebar:  React.FC<FavoritesSidebarProps> = ({ isOpen, onClose }) => {
  const classes = useStyles();
  const favoriteSongIds = useRecoilValue(favoriteSongsAtom);
  
  const allSongs = useRecoilValue(allSongsAtom);
  console.log('Is Favorites Sidebar Open:', isOpen);
  const favoriteSongs = allSongs.filter((song) => favoriteSongIds.includes(song.trackId));

  const handleClose = () => {
    onClose();
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      open={false}
      anchor="right"
    >
      <List>
        <ListItem>
          <ListItemText primary="Favorite Songs" />
        </ListItem>
        {favoriteSongs.map((song) => (
          <ListItem key={song.trackId}>
            <ListItemText primary={song.trackName} secondary={song.artistName} />
          </ListItem>
        ))}
      </List>
      <button onClick={handleClose}>Close Favorites</button>
    </Drawer>
  );
};

export default FavoritesSidebar;

