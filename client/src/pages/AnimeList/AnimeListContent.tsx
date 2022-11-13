import { FC } from 'react';
import { Heading, VStack } from '@chakra-ui/react';

import FormatAnimeList from './FormatAnimeList';
import PopularAnimeList from './PopularAnimeList';
import { useDocumentTitle } from '~/hooks/use-document-title';
import { MediaFormat, MediaSeason } from '~/types/anilist-graphql';
import { capitalizeText } from '~/utils/text';
import { useSummaryAnimeList } from '~/hooks/use-summary-anime-list';

export type AnimeListContentProps = {
  season: MediaSeason;
  year: number;
};

const formatsToShow = [
  {
    id: 'movie',
    title: 'Movie',
    formats: [MediaFormat.Movie],
    key: 'movieAnimes',
  },
  { id: 'tv', title: 'TV', formats: [MediaFormat.Tv], key: 'tvAnimes' },
  {
    id: 'tv-short',
    title: 'TV Short',
    formats: [MediaFormat.TvShort],
    key: 'tvShortAnimes',
  },
  {
    id: 'ova-ona-special',
    title: 'OVA / ONA / SPECIAL',
    formats: [MediaFormat.Ova, MediaFormat.Ona, MediaFormat.Special],
    key: 'specialAnimes',
  },
];

const AnimeListContent: FC<AnimeListContentProps> = ({ season, year }) => {
  useDocumentTitle(`${capitalizeText(season.toLowerCase())} ${year}`);
  const { summaries, isLoading } = useSummaryAnimeList(season, year, 7);

  return (
    <VStack align="flex-start" spacing={12} pb={16} pt={8}>
      {/* Popular anime banner */}
      <PopularAnimeList
        medias={summaries?.popularAnimes?.medias ?? []}
        isLoading={isLoading}
      />

      {/* Anime summary by format (sort by popularity) */}
      {formatsToShow.map((f) => (
        <VStack key={f.id} align="flex-start" spacing={4} w="full">
          <Heading fontSize="xl">{f.title}</Heading>
          <FormatAnimeList
            medias={summaries?.[f.key].medias ?? []}
            hasNextPage={summaries?.[f.key].hasNextPage ?? false}
            isLoading={isLoading}
            season={season}
            seasonYear={year}
            formats={f.formats}
          />
        </VStack>
      ))}
    </VStack>
  );
};

export default AnimeListContent;
