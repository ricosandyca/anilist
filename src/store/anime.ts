import { atom } from 'recoil';

import { Media } from '~/types/anilist-graphql';

export const animeListState = atom<Media[]>({
  key: 'animeListState',
  default: [],
});

export const popularAnimeListState = atom<Media[]>({
  key: 'popularAnimeListState',
  default: [],
});

export const animeState = atom<Media | undefined>({
  key: 'animeState',
  default: undefined,
});
