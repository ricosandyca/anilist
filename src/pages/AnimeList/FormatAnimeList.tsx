import { FC } from 'react';
import {
  Box,
  HStack,
  Skeleton,
  StackProps,
  useBreakpointValue,
} from '@chakra-ui/react';
import ScrollContainer from 'react-indiana-drag-scroll';

import AnimeCard from '~/components/AnimeCard';
import { useAnimeList } from '~/hooks/use-anime-list';
import { MediaFormat, MediaSeason } from '~/types/anilist-graphql';
import { createArray } from '~/utils/array';

export type FormatAnimeListProps = {
  format: MediaFormat;
  season: MediaSeason;
  seasonYear: number;
};

const CARD_LIMIT = 15;
const CARD_HEIGHT = '340px';
const CARD_WIDTH = '250px';

const FormatAnimeList: FC<FormatAnimeListProps> = ({
  format,
  season,
  seasonYear,
}) => {
  const isMDDown = useBreakpointValue({ base: true, lg: false });
  const { isLoading, animes } = useAnimeList(
    season,
    seasonYear,
    format,
    CARD_LIMIT,
  );
  const spacing = isMDDown ? 4 : 6;

  if (isLoading) return <FormatAnimeListLoading spacing={spacing} />;

  return (
    <HStack as={ScrollContainer} spacing={spacing} maxWidth="full">
      {animes.map((media) => (
        <Box key={media.id}>
          <AnimeCard
            media={media}
            flexShrink={0}
            h={CARD_HEIGHT}
            w={CARD_WIDTH}
          />
        </Box>
      ))}
    </HStack>
  );
};

const FormatAnimeListLoading: FC<StackProps> = (props) => {
  const nums = createArray(CARD_LIMIT);

  return (
    <HStack maxWidth="full" position="relative" overflow="hidden" {...props}>
      {nums.map((n) => (
        <Skeleton key={n} flexShrink={0} h={CARD_HEIGHT} w={CARD_WIDTH} />
      ))}
    </HStack>
  );
};

export default FormatAnimeList;
