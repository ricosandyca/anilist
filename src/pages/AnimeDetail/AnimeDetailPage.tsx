import { FC } from 'react';
import { Box, Spinner, Center } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import AnimeDetailHeader from './AnimeDetailHeader';
import AnimeDetailInfo from './AnimeDetailInfo';
import { useAnime } from '~/hooks/use-anime';
import NotFoundPage from '~/pages/NotFound';
import { useDocumentTitle } from '~/hooks/use-document-title';
import { withContainer } from '~/hoc/with-container';

export const IMAGE_HEADER_HEIGHT = '500px';

const AnimeDetailPage: FC = () => {
  const { mediaId } = useParams();
  const { anime, isLoading } = useAnime(+(mediaId ?? ''));
  useDocumentTitle(anime?.title?.userPreferred);

  if (isLoading) return <AnimeDetailLoadingPage />;
  if (!anime) return <NotFoundPage />;

  return (
    <Box>
      <AnimeDetailHeader
        imageURL={anime.bannerImage ?? anime.coverImage?.extraLarge ?? ''}
      />
      <AnimeDetailInfo media={anime} />
    </Box>
  );
};

const AnimeDetailLoadingPage: FC = withContainer(() => {
  return (
    <Center h={`calc(100vh - 110px)`}>
      <Spinner color="purple.300" size="xl" />
    </Center>
  );
});

export default AnimeDetailPage;
