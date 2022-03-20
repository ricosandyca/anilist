import { FC } from 'react';
import { Box } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import AnimeDetailHeader from './AnimeDetailHeader';
import AnimeDetailInfo from './AnimeDetailInfo';
import { useAnime } from '~/hooks/use-anime';
import NotFoundPage from '~/pages/NotFound';

export const IMAGE_HEADER_HEIGHT = '500px';

const AnimeDetailPage: FC = () => {
  const { mediaId } = useParams();
  const { anime, isLoading } = useAnime(+(mediaId ?? ''));

  if (isLoading) return <div>Loading</div>;
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

export default AnimeDetailPage;
