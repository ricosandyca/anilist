import axios from 'axios';

import appConfig from '~/config/app';
import {
  GET_ANIME_LIST,
  GET_ANIME,
  GetAnimeListPage,
  GetAnimeListMediaFilter,
} from '~/services/graphql/anilist';
import { Media } from '~/types/anilist-graphql';

const GQL_ENDPOINT = appConfig.anilistGraphQLEndpoint.toString();

export async function getAnimeList(
  pageInfo: GetAnimeListPage,
  filter: GetAnimeListMediaFilter,
) {
  const res = await axios.post(GQL_ENDPOINT, GET_ANIME_LIST(pageInfo, filter));

  if (res.data.errors) throw res.data.errors[0];
  return [
    res.data.data.Page.media,
    res.data.data.Page.pageInfo.hasNextPage,
  ] as [Media[], boolean];
}

export async function getAnime(mediaId: number) {
  const res = await axios.post(GQL_ENDPOINT, GET_ANIME(mediaId));

  if (res.data.errors) throw res.data.errors[0];
  return res.data.data.Media as Media;
}
