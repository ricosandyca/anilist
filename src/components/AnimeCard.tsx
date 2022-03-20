import { FC, memo, useMemo } from 'react';
import {
  Box,
  BoxProps,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Link,
} from '@chakra-ui/react';
import { AiFillHeart } from 'react-icons/ai';
import { Link as RouterLink } from 'react-router-dom';

import { Media } from '~/types/anilist-graphql';
import { getContrastTextColor } from '~/utils/color';
import { formatNumber } from '~/utils/number';

export type AnimeCardProps = BoxProps & {
  media: Media;
};

const AnimeCard: FC<AnimeCardProps> = ({ media, ...boxProps }) => {
  const accent = useMemo(() => {
    const imageAccent = media.coverImage?.color;
    if (!imageAccent)
      return {
        bg: 'purple.400',
        text: 'gray.800',
      };

    return {
      bg: imageAccent,
      text: getContrastTextColor(imageAccent, {
        light: 'white',
        dark: 'gray.800',
      }),
    };
  }, [media.coverImage?.color]);

  const genresStr = useMemo(() => {
    const genres = media.genres;
    if (!genres || genres.length <= 0) return undefined;
    // set max 3 genres
    const maxGenres = 3;
    return [...genres].splice(0, maxGenres).join(', ');
  }, [media.genres]);

  const popularityFmt = useMemo(() => {
    return formatNumber(media.popularity ?? 0, 1);
  }, [media.popularity]);

  return (
    <Box
      borderRadius="lg"
      position="relative"
      overflow="hidden"
      cursor="pointer"
      bg="bg"
      _hover={{
        '.img-cover': {
          transform: 'scale(1.25)',
          opacity: 0.5,
        },
      }}
      {...boxProps}
    >
      <Link
        as={RouterLink}
        to={`/media/${media.id}`}
        textDecor="none !important"
      >
        {/* Absolute madia cover as the card bg */}
        <Box
          className="img-cover"
          transitionDuration=".3s"
          position="absolute"
          top={0}
          bgImage={`url('${media.coverImage?.extraLarge}')`}
          backgroundSize="100%"
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="cover"
          h="full"
          w="full"
        />

        {/* Media info */}
        <Flex h="full" flexDir="column" justify="flex-end">
          <Box bg="bgAlpha.600" backdropFilter="blur(15px) saturate(2)" p={4}>
            <HStack>
              {/* Left info (title, genres) */}
              <VStack flex={1} align="flex-start" spacing={1}>
                <Heading fontSize="sm" fontWeight="500" noOfLines={1}>
                  {media.title?.userPreferred}
                </Heading>
                <Text fontSize="xs" noOfLines={1} color="whiteAlpha.700">
                  {genresStr}
                </Text>
              </VStack>

              {/* Right info (popularity) */}
              <VStack spacing={1}>
                <Icon as={AiFillHeart} color={accent.bg} />
                <Text fontSize="x-small" noOfLines={1}>
                  {popularityFmt}
                </Text>
              </VStack>
            </HStack>
          </Box>
        </Flex>
      </Link>
    </Box>
  );
};

export default memo(AnimeCard);
