import axios from 'axios';

import appConfig from '~/config/app';
import {
  GET_ANIME_LIST,
  GET_ANIME,
  GetAnimeListPage,
  GetAnimeListMediaFilter,
  GET_SUMMARY_ANIME_LIST,
} from '~/services/graphql/anilist';
import { Media } from '~/types/anilist-graphql';

const GQL_ENDPOINT = appConfig.anilistGraphQLEndpoint.toString();

export async function getAnimeList(
  pageInfo: GetAnimeListPage,
  filter: GetAnimeListMediaFilter,
) {
  const res = await axios.post(GQL_ENDPOINT, GET_ANIME_LIST(pageInfo, filter));

  if (res.data.errors) throw res.data.errors[0];
  return {
    medias: res.data.data.Page.media as Media[],
    hasNextPage: res.data.data.Page.pageInfo.hasNextPage as boolean,
  };
}

export async function getSummaryAnimeList(
  pageInfo: GetAnimeListPage,
  filter: GetAnimeListMediaFilter,
) {
  const res = await axios.post(
    GQL_ENDPOINT,
    GET_SUMMARY_ANIME_LIST(pageInfo, filter),
  );

  if (res.data.errors) throw res.data.errors[0];

  return {
    popularAnimes: {
      medias: res.data.data.popularAnimes.media as Media[],
      hasNextPage: res.data.data.popularAnimes.pageInfo.hasNextPage as boolean,
    },
    movieAnimes: {
      medias: res.data.data.movieAnimes.media as Media[],
      hasNextPage: res.data.data.movieAnimes.pageInfo.hasNextPage as boolean,
    },
    tvAnimes: {
      medias: res.data.data.tvAnimes.media as Media[],
      hasNextPage: res.data.data.tvAnimes.pageInfo.hasNextPage as boolean,
    },
    tvShortAnimes: {
      medias: res.data.data.tvShortAnimes.media as Media[],
      hasNextPage: res.data.data.tvShortAnimes.pageInfo.hasNextPage as boolean,
    },
    specialAnimes: {
      medias: res.data.data.specialAnimes.media as Media[],
      hasNextPage: res.data.data.specialAnimes.pageInfo.hasNextPage as boolean,
    },
  };
}

export async function getAnime(mediaId: number) {
  const res = await axios.post(GQL_ENDPOINT, GET_ANIME(mediaId));

  if (res.data.errors) throw res.data.errors[0];
  return res.data.data.Media as Media;
}
