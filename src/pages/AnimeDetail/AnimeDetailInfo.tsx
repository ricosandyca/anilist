import { FC, useMemo } from 'react';
import {
  Box,
  Heading,
  Image,
  VStack,
  HStack,
  Text,
  Badge,
  Icon,
  Button,
  Link,
} from '@chakra-ui/react';
import { AiFillHeart } from 'react-icons/ai';
import { BiLinkExternal } from 'react-icons/bi';

import AnimeDetailTabs from './tabs/AnimeDetailTabs';
import { withContainer } from '~/hoc/with-container';
import { Media } from '~/types/anilist-graphql';
import { formatNumber } from '~/utils/number';
import { normalizeHTML } from '~/utils/html';

export type AnimeDetailInfoProps = {
  media: Media;
};

const AnimeDetailContent: FC<AnimeDetailInfoProps> = ({ media }) => {
  const normalizedDescription = useMemo(() => {
    if (!media.description) return null;
    return normalizeHTML(media.description);
  }, [media.description]);

  const popularityFmt = useMemo(() => {
    return formatNumber(media.popularity ?? 0, 1);
  }, [media.popularity]);

  return (
    <Box>
      <HStack align="flex-start" position="relative" top="-200px" spacing={8}>
        <VStack w="240px" flexShrink={0} spacing={4}>
          {/* Left content */}
          <Image
            src={media.coverImage?.extraLarge ?? undefined}
            w="full"
            h="auto"
            bg="red"
            borderRadius="lg"
          />

          <HStack w="full" h="40px" alignItems="center">
            {/* Popularity count */}
            <HStack h="full" bg="pink.500" borderRadius="md" px={4}>
              <Icon as={AiFillHeart} />
              <Text>{popularityFmt}</Text>
            </HStack>

            {/* Open site btn */}
            <Button
              as={Link}
              target="_blank"
              href={media.siteUrl}
              leftIcon={<Icon as={BiLinkExternal} />}
              flex={1}
              isFullWidth
              h="full"
              colorScheme="blue"
            >
              Open Site
            </Button>
          </HStack>
        </VStack>

        {/* Rightft content */}
        <VStack align="flex-start" spacing={4}>
          <Heading>{media.title?.userPreferred}</Heading>
          <Badge>{media.status}</Badge>
          <Text color="whiteAlpha.700">{normalizedDescription}</Text>
          {/* Anime detail tabs */}
          <AnimeDetailTabs />
        </VStack>
      </HStack>
    </Box>
  );
};

export default withContainer(AnimeDetailContent);
