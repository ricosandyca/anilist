import { FC, memo } from 'react';
import { Grid, GridItem, useBreakpointValue } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';

import AnimeCharacterCard from '~/components/AnimeCharacterCard';
import { animeState } from '~/store/anime';

const AnimeDetailCharacters: FC = () => {
  const itemsPerRow = useBreakpointValue({ base: 2, md: 3, lg: 4, xl: 5 });
  const itemsGap = useBreakpointValue({ base: 4, md: 5, lg: 6 });
  const anime = useRecoilValue(animeState);

  if (!anime) return null;
  if (!anime.characters?.edges) return null;

  return (
    <Grid
      w="full"
      templateColumns={`repeat(${itemsPerRow}, 1fr)`}
      gap={itemsGap}
      pt={itemsGap}
    >
      {anime.characters.edges.map(
        (chara) =>
          chara && (
            <GridItem key={chara.id} w="100%" h="240px">
              <AnimeCharacterCard character={chara} w="full" h="full" />
            </GridItem>
          ),
      )}
    </Grid>
  );
};

export default memo(AnimeDetailCharacters);
