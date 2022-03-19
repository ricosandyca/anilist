import { FC, memo, useMemo } from 'react';
import { Box, BoxProps, Flex, Heading } from '@chakra-ui/react';

import { Media } from '~/types/anilist-graphql';
import { getContrastTextColor } from '~/utils/color';

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

  console.log(accent);

  return (
    <Box
      bgImage={`url('${media.coverImage?.extraLarge}')`}
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      borderRadius="lg"
      position="relative"
      overflow="hidden"
      {...boxProps}
    >
      <Flex h="full" flexDir="column" justify="flex-end">
        <Box
          bg="bgAlpha.600"
          backdropFilter="blur(15px) saturate(4)"
          py={4}
          px={4}
        >
          <Heading fontSize="sm" fontWeight="500" noOfLines={1}>
            {media.title?.userPreferred}
          </Heading>
        </Box>
      </Flex>
    </Box>
  );
};

export default memo(AnimeCard);
