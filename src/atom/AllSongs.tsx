// atom/AllSongs.ts

import { atom, selector, useSetRecoilState } from 'recoil';
import { Song } from '../components/SongGrid';

export const allSongsAtom = atom<Song[]>({
  key: 'allSongs',
  default: [],
});

export const allSongsSelector = selector<Song[]>({
  key: 'allSongsSelector',
  get: ({ get }) => {
    const allSongs = get(allSongsAtom);
    return allSongs;
  },
});


export const useSetAllSongs = () => {
  const setAllSongs = useSetRecoilState(allSongsAtom);
  return setAllSongs;
};
