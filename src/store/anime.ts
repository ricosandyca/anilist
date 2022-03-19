import { atom, atomFamily } from 'recoil';

import { Media, MediaFormat } from '~/types/anilist-graphql';

export const popularAnimeListState = atom<Media[]>({
  key: 'popularAnimeListState',
  default: [],
});

// anime list by its format (eg. TV, Movie, OVA, etc)
export const animeListState = atomFamily<Media[], MediaFormat>({
  key: 'animeListState',
  default: [],
});

export const animeState = atom<Media | undefined>({
  key: 'animeState',
  default: undefined,
});
