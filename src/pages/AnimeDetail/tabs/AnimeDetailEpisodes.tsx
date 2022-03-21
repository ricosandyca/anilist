import { FC, memo } from 'react';
import { Grid, GridItem, useBreakpointValue } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';

import AnimeEpisodeCard from '~/components/AnimeEpisodeCard';
import { animeState } from '~/store/anime';

const AnimeDetailEpisodes: FC = () => {
  const itemsPerRow = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const itemsGap = useBreakpointValue({ base: 4, md: 5, lg: 6 });
  const anime = useRecoilValue(animeState);

  if (!anime) return null;
  if (!anime.streamingEpisodes) return null;

  return (
    <Grid
      w="full"
      templateColumns={`repeat(${itemsPerRow}, 1fr)`}
      gap={itemsGap}
      pt={itemsGap}
    >
      {[...anime.streamingEpisodes].reverse().map(
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
