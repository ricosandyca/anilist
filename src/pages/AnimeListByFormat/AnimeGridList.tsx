import {
  SimpleGrid,
  SimpleGridProps,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FC, memo } from 'react';

import AnimeCard from '~/components/AnimeCard';
import { useAnimeList } from '~/hooks/use-anime-list';
import { MediaFormat, MediaSeason } from '~/types/anilist-graphql';

export type AnimeGridListProps = SimpleGridProps & {
  formats: MediaFormat[];
  season: MediaSeason;
  seasonYear: number;
};

const AnimeGridList: FC<AnimeGridListProps> = ({
  formats,
  season,
  seasonYear,
  ...props
}) => {
  const { animes } = useAnimeList(season, seasonYear, formats, 100);
  const columns = useBreakpointValue({
    base: 2,
    md: 3,
    lg: 4,
    xl: 5,
  });
  const height = useBreakpointValue({
    base: '300px',
    md: '340px',
  });

  return (
    <SimpleGrid columns={columns} spacing={4} {...props}>
      {animes.map((anime) => (
        <AnimeCard key={anime.id} media={anime} w="full" h={height} />
      ))}
    </SimpleGrid>
  );
};

export default memo(AnimeGridList);
