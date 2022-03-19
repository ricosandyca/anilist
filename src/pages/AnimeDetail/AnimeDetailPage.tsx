import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { useAnime } from '~/hooks/use-anime';

const AnimeDetailPage: FC = () => {
  const { mediaId } = useParams();
  const { anime, isLoading, error } = useAnime(+(mediaId ?? ''));

  console.log(anime, isLoading, error);

  if (error) return null;

  return null;
};

export default AnimeDetailPage;
