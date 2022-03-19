import { FC } from 'react';
import { VStack } from '@chakra-ui/react';

import { MediaSeason } from '~/types/anilist-graphql';
import PopularAnimeList from './PopularAnimeList';

export type AnimeListContentProps = {
  season: MediaSeason;
  year: number;
};

const AnimeListContent: FC<AnimeListContentProps> = ({ season, year }) => {
  return (
    <VStack>
      <PopularAnimeList season={season} year={year} />
    </VStack>
  );
};

export default AnimeListContent;
