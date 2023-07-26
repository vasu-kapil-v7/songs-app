// FavoritesPage.tsx
import React from 'react';
import { useRecoilValue } from 'recoil';
import { allSongsAtom } from '../../atom/AllSongs';
import { favoriteSongsAtom } from '../../atom/CurrentSong';
import SongsGrid, { Song } from '../../components/SongGrid';

const FavoritesPage: React.FC = () => {
  const favoriteSongIds = useRecoilValue<number[]>(favoriteSongsAtom);
  const allSongs = useRecoilValue<Song[]>(allSongsAtom);
  const favoriteSongs = allSongs.filter((song) => favoriteSongIds.includes(song.trackId));

  return (
    <div>
      <SongsGrid favSongs={!!favoriteSongs} />
    </div>
  );
};

export default FavoritesPage;
