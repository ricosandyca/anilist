import { FC, useMemo } from 'react';
import { Box } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import AnimeGridList from './AnimeGridList';
import { withContainer } from '~/hoc/with-container';
import NotFoundPage from '~/pages/NotFound';
import {
  extractSeasonDashYear,
  getValidMediaFormats,
} from '~/utils/anime-season';

const AnimeListByFormatPage: FC = () => {
  const { dashedFormats, seasonDashYear } = useParams();

  const formats = useMemo(() => {
    return getValidMediaFormats(dashedFormats ?? '');
  }, [dashedFormats]);

  const seasonData = useMemo(() => {
    return extractSeasonDashYear(seasonDashYear ?? '');
  }, [seasonDashYear]);

  if (formats.length <= 0 || !seasonData) return <NotFoundPage />;

  return (
    <Box py={6}>
      <AnimeGridList
        formats={formats}
        season={seasonData?.season}
        seasonYear={seasonData?.year}
        position="relative"
      />
    </Box>
  );
};

export default withContainer(AnimeListByFormatPage, true);
