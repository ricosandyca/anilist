import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';

import { getAnimeList } from '~/services/anilist';
import { popularAnimeListState } from '~/store/anime';
import { MediaSeason, MediaType, MediaSort } from '~/types/anilist-graphql';

export function usePopularAnimeList(
  season: MediaSeason,
  year: number,
  limit = 5,
) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [popularAnimes, setPopularAnimes] = useRecoilState(
    popularAnimeListState,
  );

  // show loading on page changed
  useEffect(() => {
    setIsLoading(true);
  }, [season, year]);

  useEffect(() => {
    // get popular anime
    (async () => {
      try {
        const popularAnimes = await getAnimeList(
          { page: 1, perPage: limit },
          {
            season,
            seasonYear: year,
            type: MediaType.Anime,
            sort: MediaSort.PopularityDesc,
          },
        );
        setPopularAnimes(popularAnimes);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [season, year, limit]);

  useEffect(() => {
    // show a toast on request error
    if (error)
      toast({
        status: 'error',
        isClosable: true,
        title: error,
      });
  }, [error]);

  return { popularAnimes, isLoading, error };
}
