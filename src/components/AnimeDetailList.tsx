import { FC, useMemo } from 'react';
import {
  Box,
  BoxProps,
  Heading,
  VStack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { format } from 'date-fns';

import { Media } from '~/types/anilist-graphql';
import { convertFuzzyDateToDate } from '~/utils/date';
import { capitalizeText } from '~/utils/text';

export type AnimeDetailListProps = BoxProps & {
  media: Media;
};

const AnimeDetailList: FC<AnimeDetailListProps> = ({ media, ...boxProps }) => {
  const isMDDown = useBreakpointValue({ base: true, lg: false });

  const listItems = useMemo(() => {
    const startDate =
      media.startDate && convertFuzzyDateToDate(media.startDate);
    const endDate = media.endDate && convertFuzzyDateToDate(media.endDate);

    const studioNames = media.studios?.edges?.map((edge) => edge?.node?.name);

    return [
      {
        title: 'Format',
        value: media.format,
      },
      {
        title: 'Episodes',
        value: media.episodes,
      },
      {
        title: 'Episode Duration',
        value: media.duration && `${media.duration} mins`,
      },
      {
        title: 'Airing Date',
        value:
          startDate &&
          endDate &&
          `${format(startDate, 'MMM dd, yyyy')} - ${format(
            endDate,
            'MMM dd, yyyy',
          )}`,
      },
      {
        title: 'Season',
        value:
          media.season &&
          media.seasonYear &&
          `${capitalizeText(media.season.toLowerCase())} ${media.seasonYear}`,
      },

      {
        title: 'Popularity',
        value: media.popularity && media.popularity.toLocaleString(),
      },

      {
        title: 'Studios',
        value: studioNames?.join(', '),
      },
      {
        title: 'Source',
        value: media.source && capitalizeText(media.source.toLowerCase()),
      },
      {
        title: 'Genres',
        value: media.genres?.join(', '),
      },
    ];
  }, [media]);

  return (
    <Box
      w="full"
      bg="whiteAlpha.200"
      borderRadius="md"
      py={4}
      px={isMDDown ? 4 : 3}
      {...boxProps}
    >
      <VStack w="full" spacing={4}>
        {listItems.map(
          (item, i) =>
            item.value && (
              <VStack key={i} w="full" align="flex-start">
                <Heading fontWeight="500" fontSize="xs">
                  {item.title}
                </Heading>
                {Array.isArray(item.value) ? (
                  item.value.map((item, i) => (
                    <Text key={i} fontSize="xs" color="purple.300">
                      {item}
                    </Text>
                  ))
                ) : (
                  <Text fontSize="xs" color="purple.300">
                    {item.value}
                  </Text>
                )}
              </VStack>
            ),
        )}
      </VStack>
    </Box>
  );
};

export default AnimeDetailList;
