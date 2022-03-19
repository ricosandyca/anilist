import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { useAnime } from '~/hooks/use-anime';
import NotFoundPage from '~/pages/NotFound';

const AnimeDetailPage: FC = () => {
  const { mediaId } = useParams();
  const { anime, isLoading } = useAnime(+(mediaId ?? ''));

  console.log(anime, isLoading);

  if (!isLoading && !anime) return <NotFoundPage />;

  return <div>{anime?.title?.userPreferred}</div>;
};

export default AnimeDetailPage;
