import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';

import { getSummaryAnimeList } from '~/services/anilist';
import {
  MediaSeason,
  MediaType,
  MediaSort,
  Media,
} from '~/types/anilist-graphql';

export function useSummaryAnimeList(
  season: MediaSeason,
  year: number,
  limit = 7,
) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [summaries, setSummaries] = useState<{
    [key: string]: { medias: Media[]; hasNextPage: boolean };
  } | null>(null);

  // show loading on page changed
  useEffect(() => {
    setIsLoading(true);
  }, [season, year]);

  useEffect(() => {
    // get popular anime
    (async () => {
      try {
        const summaries = await getSummaryAnimeList(
          { page: 1, perPage: limit },
          {
            season,
            seasonYear: year,
            type: MediaType.Anime,
            sort: MediaSort.PopularityDesc,
          },
        );
        setSummaries(summaries);
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
        onCloseComplete: () => setError(null),
      });
  }, [error]);

  return { summaries, isLoading, error };
}
