import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import AnimeListContent from './AnimeListContent';
import NotFoundPage from '~/pages/NotFound';
import { extractSeasonDashYear } from '~/utils/anime-season';

const AnimeListPage: FC = () => {
  const { seasonDashYear } = useParams();

  // retrieve season and year from the url param
  const animeFilter = useMemo(() => {
    return extractSeasonDashYear(seasonDashYear ?? '');
  }, [seasonDashYear]);

  if (!animeFilter) return <NotFoundPage />;
  return (
    <AnimeListContent season={animeFilter.season} year={animeFilter.year} />
  );
};

export default AnimeListPage;
