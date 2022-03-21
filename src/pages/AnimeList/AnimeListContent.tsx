import { FC } from 'react';
import { Heading, VStack } from '@chakra-ui/react';

import FormatAnimeList from './FormatAnimeList';
import PopularAnimeList from './PopularAnimeList';
import { useDocumentTitle } from '~/hooks/use-document-title';
import { MediaFormat, MediaSeason } from '~/types/anilist-graphql';
import { capitalizeText } from '~/utils/text';

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
  useDocumentTitle(`${capitalizeText(season.toLowerCase())} ${year}`);

  return (
    <VStack align="flex-start" spacing={12} pb={16} pt={8}>
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
