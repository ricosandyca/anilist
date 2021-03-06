import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';

import { getAnime } from '~/services/anilist';
import { animeState } from '~/store/anime';

export function useAnime(mediaId: number) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [anime, setAnime] = useRecoilState(animeState);

  // show loading on page changed
  useEffect(() => {
    setIsLoading(true);
  }, [mediaId]);

  useEffect(() => {
    // get single anime detail
    (async () => {
      try {
        const anime = await getAnime(mediaId);
        setAnime(anime);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [mediaId]);

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

  return { anime, isLoading, error };
}
