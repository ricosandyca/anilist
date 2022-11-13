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
export const MEDIA_DETAIL_ATTR = `
  id type popularity coverImage { extraLarge color } bannerImage format
  episodes duration season seasonYear source studios { edges { node { name } } }
  title { userPreferred } description genres startDate { year month day }
  trailer { id site thumbnail }
  endDate { year month day } status siteUrl characters (sort: ROLE) {
    edges {
      id name role
      node { id name { userPreferred } image { large } siteUrl }
    }
  }
  relations { edges { id relationType node {
    id type status title { userPreferred } coverImage { large color }
    startDate { year month day } endDate { year month day }
  } } }
  streamingEpisodes { title thumbnail url }
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
  formats?: MediaFormat[];
};

export const GET_SUMMARY_ANIME_LIST = (
  page: GetAnimeListPage,
  mediaFilter: Omit<GetAnimeListMediaFilter, 'formats'>,
) => {
  return {
    query: `
      query getAnimeList (
        $page: Int, $perPage: Int, $season: MediaSeason, 
        $seasonYear: Int, $sort: MediaSort, $type: MediaType,
        $excludeGenres: [String]
      ) {
        popularAnimes: Page (page: $page, perPage: $perPage) {
          pageInfo { ${PAGE_INFO_ATTR} }
          media (
            season: $season, seasonYear: $seasonYear, 
            sort: [$sort], type: $type
            genre_not_in: $excludeGenres
          ) { ${MEDIA_ATTR} }
        }

        movieAnimes: Page (page: $page, perPage: $perPage) {
          pageInfo { ${PAGE_INFO_ATTR} }
          media (
            season: $season, seasonYear: $seasonYear, 
            sort: [$sort], type: $type, format_in: [${MediaFormat.Movie}]
            genre_not_in: $excludeGenres
          ) { ${MEDIA_ATTR} }
        }

        tvAnimes: Page (page: $page, perPage: $perPage) {
          pageInfo { ${PAGE_INFO_ATTR} }
          media (
            season: $season, seasonYear: $seasonYear, 
            sort: [$sort], type: $type, format_in: [${MediaFormat.Tv}]
            genre_not_in: $excludeGenres
          ) { ${MEDIA_ATTR} }
        }

        tvShortAnimes: Page (page: $page, perPage: $perPage) {
          pageInfo { ${PAGE_INFO_ATTR} }
          media (
            season: $season, seasonYear: $seasonYear, 
            sort: [$sort], type: $type, format_in: [${MediaFormat.TvShort}]
            genre_not_in: $excludeGenres
          ) { ${MEDIA_ATTR} }
        }

        specialAnimes: Page (page: $page, perPage: $perPage) {
          pageInfo { ${PAGE_INFO_ATTR} }
          media (
            season: $season, seasonYear: $seasonYear, 
            sort: [$sort], type: $type, format_in: [${
              (MediaFormat.Ova, MediaFormat.Ona, MediaFormat.Special)
            }]
            genre_not_in: $excludeGenres
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
      excludeGenres: ['Hentai'],
    },
  };
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
        $formats: [MediaFormat], $excludeGenres: [String]
      ) {
        Page (page: $page, perPage: $perPage) {
          pageInfo { ${PAGE_INFO_ATTR} }
          media (
            season: $season, seasonYear: $seasonYear, 
            sort: [$sort], type: $type, format_in: $formats
            genre_not_in: $excludeGenres
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
      formats: mediaFilter.formats,
      excludeGenres: ['Hentai'],
    },
  };
};

export const GET_ANIME = (mediaId: number) => {
  return {
    query: `
      query getAnime($mediaId: Int!) {
        Media (id: $mediaId) {
          ${MEDIA_DETAIL_ATTR}
        }
      }
    `,
    variables: { mediaId },
  };
};
