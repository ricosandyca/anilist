import { FC } from 'react';
import {
  Box,
  BoxProps,
  Flex,
  HStack,
  Text,
  Link,
  Icon,
  Center,
} from '@chakra-ui/react';
import { FaPlay } from 'react-icons/fa';

import { MediaStreamingEpisode } from '~/types/anilist-graphql';

export type AnimeEpisodeCardProps = BoxProps & {
  episode: MediaStreamingEpisode;
};

const AnimeEpisodeCard: FC<AnimeEpisodeCardProps> = ({
  episode,
  ...boxProps
}) => {
  return (
    <Link
      target="_blank"
      href={episode.url ?? undefined}
      textDecor="none !important"
    >
      <Box
        position="relative"
        borderRadius="md"
        overflow="hidden"
        _hover={{
          '.play-btn': {
            opacity: 1,
          },
          '.img-cover': {
            opacity: 0.4,
          },
        }}
        {...boxProps}
      >
        {/* Absolute character image as the card bg */}
        <Box
          className="img-cover"
          transitionDuration=".3s"
          position="absolute"
          top={0}
          bgImage={`url('${episode.thumbnail}')`}
          backgroundSize="100%"
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="cover"
          h="full"
          w="full"
          zIndex={1}
          opacity={0.75}
        />

        {/* Episode play button */}
        <Center
          className="play-btn"
          transitionDuration=".3s"
          position="absolute"
          top={0}
          h="full"
          w="full"
          zIndex={3}
          pb="40px"
          opacity={0}
        >
          <Center
            w="60px"
            h="60px"
            borderRadius="full"
            bg="bg"
            color="purple.300"
          >
            <Icon fontSize="2xl" as={FaPlay} />
          </Center>
        </Center>

        {/* Character info */}
        <Flex
          h="full"
          flexDir="column"
          justify="flex-end"
          position="relative"
          zIndex={2}
        >
          <Box
            className="media-content-box"
            bg="bgAlpha.600"
            backdropFilter="blur(15px) saturate(2)"
            h="40px"
            p={4}
            transitionDuration=".3s"
          >
            <HStack
              flex={1}
              justify="space-between"
              align="center"
              h="full"
              spacing={2}
            >
              {/* Episode title */}
              <Text
                lineHeight={1.25}
                textAlign="left"
                fontSize="xs"
                fontWeight="500"
                noOfLines={1}
                flex={1}
              >
                {episode.title}
              </Text>
            </HStack>
          </Box>
        </Flex>
      </Box>
    </Link>
  );
};

export default AnimeEpisodeCard;
