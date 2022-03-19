import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { getPopularAnimeList } from '~/services/anilist';
import { popularAnimeListState } from '~/store/anime';
import { MediaSeason } from '~/types/anilist-graphql';

export function usePopularAnimeList(
  season: MediaSeason,
  year: number,
  limit = 5,
) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [popularAnimes, setPopularAnimes] = useRecoilState(
    popularAnimeListState,
  );

  useEffect(() => {
    // get popular anime
    (async () => {
      try {
        const popularAnimes = await getPopularAnimeList(limit, season, year);
        setPopularAnimes(popularAnimes);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [season, year, limit]);

  return { popularAnimes, isLoading, error };
}
