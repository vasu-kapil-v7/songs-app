// src/components/SongGrid.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { Grid, Card, CardContent, Typography, IconButton } from '@mui/material';
import { PlayArrow as PlayArrowIcon, Favorite as FavoriteIcon } from '@mui/icons-material';

import { useRecoilState, useRecoilValue } from 'recoil';
import { getSongs } from '../../apis/songs';
import { allSongsAtom, allSongsSelector, useSetAllSongs } from '../../atom/AllSongs';
import { currentPlayingSongAtom, favoriteSongsAtom } from '../../atom/CurrentSong';
import Player from '../SongPlayer';

export interface Song {
  trackId: number;
  trackName: string;
  artistName: string;
  previewUrl: string; 
}

interface SongsGridProps {
  term: string;
  offset: number;
}

const SongsGrid: React.FC<SongsGridProps> = ({ term, offset }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentPlayingSong, setCurrentPlayingSong] = useRecoilState<string | null>(currentPlayingSongAtom);
  const allSongs = useRecoilValue<Song[]>(allSongsSelector);
  const [favoriteSongs, setFavoriteSongs] = useRecoilState<number[]>(favoriteSongsAtom);

  


  const setAllSongs = useSetAllSongs();

  const fetchSongs = useCallback(async () => {
    const songsData = await getSongs(term, offset);
    setSongs(songsData);
    setAllSongs(songsData);
  }, [term, offset, setAllSongs]);

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  const handlePlaySong = (previewUrl: string) => {
    setCurrentPlayingSong(previewUrl);
  };

  const handleAddToFavorites = (trackId: number) => {
    setFavoriteSongs((prevFavoriteSongs) => [...prevFavoriteSongs, trackId]);
  };

  console.log(songs,allSongs)

  return (
    <Grid container spacing={3}>
      {songs.map((song) => (
        <Grid key={song.trackId} item xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ height: '200px', width: '220px' ,margin : "24px" }}>
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
                color="secondary"
                aria-label="favorite"
                onClick={() => handleAddToFavorites(song.trackId)}
              >
                <FavoriteIcon />
              </IconButton>
            </CardContent>
          </Card>
          <Player songUrl={song.previewUrl} />
        </Grid>
      ))}
    </Grid>
  );
};

export default SongsGrid;
