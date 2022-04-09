import { FC } from 'react';
import {
  Box,
  Center,
  HStack,
  Icon,
  IconButton,
  Skeleton,
  StackProps,
  Tooltip,
  useBreakpointValue,
} from '@chakra-ui/react';
import { RiArrowRightSLine } from 'react-icons/ri';
import ScrollContainer from 'react-indiana-drag-scroll';
import { Link } from 'react-router-dom';

import AnimeCard from '~/components/AnimeCard';
import { useAnimeList } from '~/hooks/use-anime-list';
import { MediaFormat, MediaSeason } from '~/types/anilist-graphql';
import { createArray } from '~/utils/array';

export type FormatAnimeListProps = {
  formats: MediaFormat[];
  season: MediaSeason;
  seasonYear: number;
};

const CARD_LIMIT = 6;
const CARD_HEIGHT = '340px';
const CARD_WIDTH = '250px';

const FormatAnimeList: FC<FormatAnimeListProps> = ({
  formats,
  season,
  seasonYear,
}) => {
  const isMDDown = useBreakpointValue({ base: true, lg: false });
  const { isLoading, animes } = useAnimeList(
    season,
    seasonYear,
    formats,
    CARD_LIMIT,
  );
  const spacing = isMDDown ? 4 : 6;

  if (isLoading) return <FormatAnimeListLoading spacing={spacing} />;

  return (
    <HStack as={ScrollContainer} spacing={spacing} maxWidth="full">
      {animes.map((media) => (
        <Box key={media.id} flexShrink={0}>
          <AnimeCard media={media} h={CARD_HEIGHT} w={CARD_WIDTH} />
        </Box>
      ))}

      {/* Show more button */}
      <Box h={CARD_HEIGHT} w={`calc(${CARD_WIDTH} / 1.5)`} flexShrink={0}>
        <Center w="full" h="full">
          <Tooltip label="Show more">
            <IconButton
              aria-label="More"
              variant="outline"
              colorScheme="purple"
              rounded="full"
              borderWidth="2px"
              h="48px"
              w="48px"
              icon={<Icon as={RiArrowRightSLine} fontSize="3xl" />}
              as={Link}
              to={`${formats.join('-').toLowerCase()}`}
            />
          </Tooltip>
        </Center>
      </Box>
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
