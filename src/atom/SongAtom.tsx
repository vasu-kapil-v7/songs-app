// src/atoms/SongAtoms.ts

import { atom } from 'recoil';

export const songsAtom = atom<Song[]>({
  key: 'songs',
  default: [],
});

export const currentSongAtom = atom<Song | null>({
  key: 'currentSong',
  default: null,
});

export const isPlayingAtom = atom<boolean>({
  key: 'isPlaying',
  default: false,
});

export const searchAtom = atom<string>({
  key: 'search',
  default: '',
});
