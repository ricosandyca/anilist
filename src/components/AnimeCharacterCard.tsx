import { FC, memo } from 'react';
import { Box, BoxProps, Flex, VStack, Heading, Link } from '@chakra-ui/react';

import { CharacterEdge } from '~/types/anilist-graphql';

export type AnimeCharacterCardProps = BoxProps & {
  character: CharacterEdge;
};

const AnimeCharacterCard: FC<AnimeCharacterCardProps> = ({
  character,
  ...boxProps
}) => {
  const char = character.node;

  return (
    <Link
      target="_blank"
      href={char?.siteUrl ?? undefined}
      textDecor="none !important"
    >
      <Box
        position="relative"
        borderRadius="md"
        overflow="hidden"
        _hover={{
          '.img-cover': {
            opacity: 1,
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
          bgImage={`url('${char?.image?.large}')`}
          backgroundSize="100%"
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="cover"
          h="full"
          w="full"
          zIndex={1}
          opacity={0.4}
        />

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
            p={2}
            h="44px"
            transitionDuration=".3s"
          >
            <VStack
              flex={1}
              align="center"
              justify="center"
              h="full"
              spacing={1}
            >
              <Heading
                lineHeight={1.25}
                textAlign="center"
                fontSize="xs"
                fontWeight="500"
                noOfLines={1}
              >
                {char?.name?.userPreferred}
              </Heading>
            </VStack>
          </Box>
        </Flex>
      </Box>
    </Link>
  );
};

export default memo(AnimeCharacterCard);
