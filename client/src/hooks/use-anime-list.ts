import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';

import { getAnimeList } from '~/services/anilist';
import { animeListState } from '~/store/anime';
import {
  MediaSeason,
  MediaType,
  MediaSort,
  MediaFormat,
} from '~/types/anilist-graphql';

export function useAnimeList(
  season: MediaSeason,
  year: number,
  formats: MediaFormat[],
  limit: number,
) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [animes, setAnimes] = useRecoilState(animeListState(formats.join('-')));
  const [hasNextPage, setHasNextPage] = useState(false);

  // show loading on page changed
  useEffect(() => {
    setIsLoading(true);
  }, [season, year, formats]);

  useEffect(() => {
    // get popular anime
    (async () => {
      try {
        const { medias, hasNextPage } = await getAnimeList(
          { page: 1, perPage: limit },
          {
            season,
            seasonYear: year,
            type: MediaType.Anime,
            sort: MediaSort.PopularityDesc,
            formats: formats,
          },
        );
        setAnimes(medias);
        setHasNextPage(hasNextPage);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [season, year, limit, formats]);

  useEffect(() => {
    // show a toast on request error
    if (error)
      toast({
        status: 'error',
        isClosable: true,
        title: error,
        onCloseComplete: () => setError(null),
      });
  }, [error]);

  return { animes, hasNextPage, isLoading, error };
}
