// FavoritesPage.tsx
import React from 'react';
import { useRecoilValue } from 'recoil';
import { allSongsAtom } from '../../atom/AllSongs';
import { favoriteSongsAtom } from '../../atom/CurrentSong';
import SongsGrid, { Song } from '../../components/SongGrid';

const FavoritesPage: React.FC = () => {
  const favoriteSongIds = useRecoilValue<number[]>(favoriteSongsAtom);

  // Get the favorite songs from the allSongs array based on their trackIds
  const allSongs = useRecoilValue<Song[]>(allSongsAtom);
  const favoriteSongs = allSongs.filter((song) => favoriteSongIds.includes(song.trackId));

  return (
    <div>
      <SongsGrid  />
    </div>
  );
};

export default FavoritesPage;
