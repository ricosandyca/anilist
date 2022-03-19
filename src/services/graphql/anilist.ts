import {
  MediaFormat,
  MediaSeason,
  MediaSort,
  MediaType,
} from '~/types/anilist-graphql';

export const PAGE_INFO_ATTR = `total perPage currentPage lastPage hasNextPage`;
export const MEDIA_ATTR = `
  id type popularity coverImage { extraLarge color } bannerImage
  title { userPreferred } description genres startDate { year month day }
  endDate { year month day }
`;

export type GetAnimeListPage = {
  page?: number;
  perPage?: number;
};

export type GetAnimeListMediaFilter = {
  season?: MediaSeason;
  seasonYear?: number;
  sort?: MediaSort;
  type?: MediaType;
  format?: MediaFormat;
};

export const GET_ANIME_LIST = (
  page: GetAnimeListPage,
  mediaFilter: GetAnimeListMediaFilter,
) => {
  return {
    query: `
      query getAnimeList (
        $page: Int, $perPage: Int, $season: MediaSeason, 
        $seasonYear: Int, $sort: MediaSort, $type: MediaType,
        $format: MediaFormat
      ) {
        Page (page: $page, perPage: $perPage) {
          pageInfo { ${PAGE_INFO_ATTR} }
          media (
            season: $season, seasonYear: $seasonYear, 
            sort: [$sort], type: $type, format: $format
          ) { ${MEDIA_ATTR} }
        }
      }
    `,
    variables: {
      page: page.page,
      perPage: page.perPage,
      season: mediaFilter.season,
      seasonYear: mediaFilter.seasonYear,
      sort: mediaFilter.sort,
      type: mediaFilter.type,
      format: mediaFilter.format,
    },
  };
};

export const GET_ANIME = (mediaId: number) => {
  return {
    query: `
      query getAnime($mediaId: Int!) {
        Media (id: $mediaId) {
          ${MEDIA_ATTR}
        }
      }
    `,
    variables: { mediaId },
  };
};
