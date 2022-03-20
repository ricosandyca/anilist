import { FC, memo } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';

import AnimeCharacterCard from '~/components/AnimeCharacterCard';
import { animeState } from '~/store/anime';

const AnimeDetailCharacters: FC = () => {
  const anime = useRecoilValue(animeState);

  if (!anime) return null;
  if (!anime.characters?.edges) return null;

  return (
    <Flex flexWrap="wrap" w="full" pt={4}>
      {anime.characters.edges.map(
        (chara) =>
          chara && (
            <Box key={chara.id} w="16.66%" h="240px" pr={6} pb={6}>
              <AnimeCharacterCard character={chara} w="full" h="full" />
            </Box>
          ),
      )}
    </Flex>
  );
};

export default memo(AnimeDetailCharacters);
