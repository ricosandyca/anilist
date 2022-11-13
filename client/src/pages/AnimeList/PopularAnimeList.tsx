import { FC } from 'react';
import { Skeleton, VStack, Box } from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { Media } from '~/types/anilist-graphql';
import PopularAnimeBanner from '~/components/PopularAnimeBanner';

export type PopularAnimeListProps = {
  isLoading: boolean;
  medias: Media[];
};

const BANNER_HEIGHT = '540px';

const PopularAnimeList: FC<PopularAnimeListProps> = ({ medias, isLoading }) => {
  if (isLoading) return <PopularAnimeListLoading />;

  return (
    <VStack alignItems="flex-start" w="full" spacing={6}>
      {/* Slideable banner */}
      <Box position="relative" w="full" overflow="hidden" borderRadius="xl">
        <Carousel
          showArrows={false}
          showStatus={false}
          showIndicators={false}
          swipeable
          emulateTouch
          stopOnHover
          autoPlay
          infiniteLoop
          autoFocus
          showThumbs={false}
          useKeyboardArrows
        >
          {/* Popular animes banner */}
          {medias.map((media) => (
            <PopularAnimeBanner
              key={media.id}
              media={media}
              h={BANNER_HEIGHT}
            />
          ))}
        </Carousel>
      </Box>
    </VStack>
  );
};

const PopularAnimeListLoading: FC = () => {
  return (
    <VStack spacing={6} w="full" alignItems="flex-start">
      <Skeleton w="full" h={BANNER_HEIGHT} />
    </VStack>
  );
};

export default PopularAnimeList;
