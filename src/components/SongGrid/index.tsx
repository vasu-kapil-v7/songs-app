// SongGrid.tsx
import React, { useEffect } from 'react';
import { Grid, Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import { PlayArrow as PlayArrowIcon, Favorite as FavoriteIcon } from '@mui/icons-material';
import { useRecoilState } from 'recoil';
import { currentPlayingSongAtom, favoriteSongsAtom } from '../../atom/CurrentSong';
import { getSongs } from '../../apis/songs';
import Player from '../SongPlayer';


export interface Song {
  trackId: number;
  trackName: string;
  artistName: string;
  previewUrl: string;
}

const SongsGrid: React.FC = () => {
  const [currentPlayingSong, setCurrentPlayingSong] = useRecoilState<string | null>(currentPlayingSongAtom);
  const [favoriteSongs, setFavoriteSongs] = useRecoilState<number[]>(favoriteSongsAtom);
  const [songs, setSongs] = React.useState<Song[]>([]);

  const handlePlaySong = (previewUrl: string) => {
    setCurrentPlayingSong(previewUrl);
  };

  const handleAddToFavorites = (trackId: number) => {
    setFavoriteSongs((prevFavoriteSongs) => [...prevFavoriteSongs, trackId]);
  };

  const handleRemoveFromFavorites = (trackId: number) => {
    setFavoriteSongs((prevFavoriteSongs) => prevFavoriteSongs.filter((id) => id !== trackId));
  };

  const isFavorite = (trackId: number) => favoriteSongs.includes(trackId);

  useEffect(() => {
    const fetchSongs = async () => {
      const songsData = await getSongs('love', 0); // Fetch the songs data using the getSongs API
      setSongs(songsData);
    };

    fetchSongs();
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        {songs.length > 0 ? (
          songs.map((song) => (
            <Grid key={song.trackId} item xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ height: '200px', width: '220px', margin: '24px' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {song.trackName}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {song.artistName}
                  </Typography>
                  <IconButton color="primary" aria-label="play" onClick={() => handlePlaySong(song.previewUrl)}>
                    <PlayArrowIcon />
                  </IconButton>
                  <IconButton
                    color={isFavorite(song.trackId) ? 'secondary' : 'default'}
                    aria-label="favorite"
                    onClick={() =>
                      isFavorite(song.trackId)
                        ? handleRemoveFromFavorites(song.trackId)
                        : handleAddToFavorites(song.trackId)
                    }
                  >
                    <FavoriteIcon />
                  </IconButton>
                </CardContent>
              </Card>
              <Player songUrl={song.previewUrl} />
            </Grid>
          ))
        ) : (
          <Box sx={{ width: '100%', textAlign: 'center' }}>
            <Typography variant="body1">No Songs Added to Favorites</Typography>
          </Box>
        )}
      </Grid>
      {currentPlayingSong && <div>Currently Playing: {currentPlayingSong}</div>}
    </>
  );
};

export default SongsGrid;
