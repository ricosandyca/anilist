import { FC, memo, useMemo } from 'react';
import { Grid, GridItem, useBreakpointValue } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';

import AnimeEpisodeCard from '~/components/AnimeEpisodeCard';
import { animeState } from '~/store/anime';

const AnimeDetailEpisodes: FC = () => {
  const itemsPerRow = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const itemsGap = useBreakpointValue({ base: 4, md: 5, lg: 6 });
  const anime = useRecoilValue(animeState);

  const sortedEpisodes = useMemo(() => {
    if (!anime?.streamingEpisodes) return [];

    // sort by string episode
    const episodes = anime.streamingEpisodes.map((ep) => ({
      ...ep,
      n: +(
        (ep?.title || '')
          .split('-')[0]
          .replace(/[^0-9]/gi, '')
          .trim() || '0'
      ),
    }));
    episodes.sort((a, b) => a.n - b.n);

    return episodes;
  }, [anime?.streamingEpisodes]);

  if (!anime) return null;

  return (
    <Grid
      w="full"
      templateColumns={`repeat(${itemsPerRow}, 1fr)`}
      gap={itemsGap}
      pt={itemsGap}
    >
      {sortedEpisodes.map(
        (eps, i) =>
          eps && (
            <GridItem key={i} w="100%" h="200px">
              <AnimeEpisodeCard episode={eps} w="full" h="full" />
            </GridItem>
          ),
      )}
    </Grid>
  );
};

export default memo(AnimeDetailEpisodes);
