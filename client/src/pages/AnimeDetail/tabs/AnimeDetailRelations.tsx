import { FC, memo } from 'react';
import { Grid, GridItem, useBreakpointValue } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';

import AnimeRelationCard from '~/components/AnimeRelationCard';
import { animeState } from '~/store/anime';

const AnimeDetailRelations: FC = () => {
  const itemsPerRow = useBreakpointValue({ base: 1, xl: 2 });
  const itemsGap = useBreakpointValue({ base: 4, xl: 6 });
  const anime = useRecoilValue(animeState);

  if (!anime) return null;
  if (!anime.relations?.edges) return null;

  return (
    <Grid
      w="full"
      templateColumns={`repeat(${itemsPerRow}, 1fr)`}
      gap={itemsGap}
      pt={itemsGap}
    >
      {anime.relations.edges.map(
        (relation) =>
          relation && (
            <GridItem key={relation.id} w="100%" h="200px">
              <AnimeRelationCard relation={relation} w="full" h="full" />
            </GridItem>
          ),
      )}
    </Grid>
  );
};

export default memo(AnimeDetailRelations);
