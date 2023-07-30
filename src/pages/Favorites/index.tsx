import React from 'react';
import { useRecoilValue } from 'recoil';
import { allSongsAtom } from '../../atom/AllSongs';
import { favoriteSongsAtom } from '../../atom/CurrentSong';
import SongsGrid from '../../components/SongGrid';
import { NoFavoritesText } from './styles';

const FavoritesPage: React.FC = () => {
  const favoriteSongIds = useRecoilValue<number[]>(favoriteSongsAtom);
  const allSongs = useRecoilValue<Song[]>(allSongsAtom);
  const favoriteSongs = allSongs.filter((song) => favoriteSongIds.includes(song.trackId));

  return (
    <div>
      {favoriteSongs.length > 0 ? (
        <SongsGrid favSongs={true} />
      ) : (
        <NoFavoritesText>No songs added to favorites</NoFavoritesText>
      )}
    </div>
  );
};

export default FavoritesPage;
