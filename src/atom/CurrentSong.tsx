
import { atom } from 'recoil';

export const currentPlayingSongAtom = atom<string | null>({
  key: 'currentPlayingSong',
  default: null,
});

export const favoriteSongsAtom = atom<number[]>({
  key: 'favoriteSongs',
  default: [],
});
