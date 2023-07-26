import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, IconButton, Box, CircularProgress, Button } from '@mui/material';
import { PlayArrow as PlayArrowIcon, Favorite as FavoriteIcon } from '@mui/icons-material';
import { useRecoilState } from 'recoil';
import { currentPlayingSongAtom, favoriteSongsAtom } from '../../atom/CurrentSong';
import { getSongs } from '../../apis/songs';
import Player from '../SongPlayer';
import { cardStyle } from './styles';

const isSong = (obj: any): obj is Song => {
  return (
    typeof obj === 'object' &&
    'trackId' in obj &&
    'trackName' in obj &&
    'artistName' in obj &&
    'previewUrl' in obj
  );
};

const SongsGrid: React.FC<SongsGridProps> = ({ favSongs, searchTerm }) => {
  const [currentPlayingSong, setCurrentPlayingSong] = useRecoilState<string | null>(currentPlayingSongAtom);
  const [favoriteSongs, setFavoriteSongs] = useRecoilState<number[]>(favoriteSongsAtom);
  const [songs, setSongs] = useState<Song[]>([]);
  const [searchedSongs, setSearchedSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const limit = 50;

  useEffect(() => {
    const fetchSongs = async () => {
      if (isLoading) return;
      setIsLoading(true);

      try {
        const songsData = await getSongs(searchTerm || 'love', offset, limit);
        if (offset === 0) {
          setSongs(songsData);
        } else {
          setSongs((prevSongs) => [...prevSongs, ...songsData]);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchSongs();
  }, [searchTerm, offset]);

  useEffect(() => {
    setSongs([]);
    setOffset(0);
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm) {
      const filteredSongs = songs.filter((song) =>
        song?.trackName?.toLowerCase().includes(searchTerm?.toLowerCase())
      );
      setSearchedSongs(filteredSongs);
    } else {
      setSearchedSongs(songs);
    }
  }, [searchTerm, songs]);

  const songsToDisplay = favSongs ? songs.filter((song) => favoriteSongs.includes(song.trackId)) : songs;

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

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  return (
    <>
      <Grid container spacing={3}>
        {songsToDisplay.length > 0 ? (
          songsToDisplay.map((song) => {
            if (isSong(song)) {
              return (
                <Grid key={song.trackId} item xs={12} sm={6} md={4} lg={3}>
                  <Card sx={cardStyle}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {song.trackName}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        {song.artistName}
                      </Typography>
                      <IconButton
                        color="primary"
                        aria-label="play"
                        onClick={() => handlePlaySong(song.previewUrl)}
                      >
                        <PlayArrowIcon />
                      </IconButton>
                      {!favSongs && (
                        <IconButton
                          color={isFavorite(song.trackId) ? "secondary" : "default"}
                          aria-label="favorite"
                          onClick={() =>
                            isFavorite(song.trackId)
                              ? handleRemoveFromFavorites(song.trackId)
                              : handleAddToFavorites(song.trackId)
                          }
                        >
                          <FavoriteIcon />
                        </IconButton>
                      )}
                    </CardContent>
                  </Card>
                  <Player songUrl={song.previewUrl} />
                </Grid>
              );
            } else {
              return null;
            }
          })
        ) : (
          <Box sx={{ width: "100%", textAlign: "center" }}>
            <Typography variant="body1">
              {favSongs ? "No Favorite Songs Added" : "No Songs Found"}
            </Typography>
          </Box>
        )}
      </Grid>
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress color="primary" />
        </Box>
      )}
      {!isLoading && songsToDisplay.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 3 }}>
          <Button onClick={handleLoadMore}>Load More</Button>
        </Box>
      )}
    </>
  );
};

export default SongsGrid;
