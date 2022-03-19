import { FC } from 'react';
import { Heading, VStack } from '@chakra-ui/react';

import { MediaFormat, MediaSeason } from '~/types/anilist-graphql';
import PopularAnimeList from './PopularAnimeList';
import FormatAnimeList from './FormatAnimeList';

export type AnimeListContentProps = {
  season: MediaSeason;
  year: number;
};

const formatsToShow = [
  { id: 'movie', title: 'Movie', format: MediaFormat.Movie },
  { id: 'tv', title: 'TV', format: MediaFormat.Tv },
  { id: 'tv-short', title: 'TV Short', format: MediaFormat.TvShort },
];

const AnimeListContent: FC<AnimeListContentProps> = ({ season, year }) => {
  return (
    <VStack align="flex-start" spacing={12} pb={12}>
      {/* Popular anime banner */}
      <PopularAnimeList season={season} year={year} />

      {/* Anime summary by format (sort by popularity) */}
      {formatsToShow.map((f) => (
        <VStack key={f.id} align="flex-start" spacing={4} w="full">
          <Heading fontSize="xl">{f.title}</Heading>
          <FormatAnimeList
            season={season}
            seasonYear={year}
            format={f.format}
          />
        </VStack>
      ))}
    </VStack>
  );
};

export default AnimeListContent;
