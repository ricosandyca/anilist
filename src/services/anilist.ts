import axios from 'axios';

import appConfig from '~/config/app';
import { GET_ANIME_LIST } from '~/services/graphql/anilist';
import {
  MediaSeason,
  MediaType,
  Media,
  MediaSort,
} from '~/types/anilist-graphql';

const GQL_ENDPOINT = appConfig.anilistGraphQLEndpoint.toString();

export async function getPopularAnimeList(
  limit: number,
  season: MediaSeason,
  year: number,
) {
  const res = await axios.post(
    GQL_ENDPOINT,
    GET_ANIME_LIST(
      { page: 1, perPage: limit },
      {
        season,
        seasonYear: year,
        type: MediaType.Anime,
        sort: MediaSort.PopularityDesc,
      },
    ),
  );

  if (res.data.errors) throw res.data.errors[0];
  return res.data.data.Page.media as Media[];
}
