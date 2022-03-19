import { FC } from 'react';

export type AnimeListContentProps = {
  season: string;
  year: number;
};

const AnimeListContent: FC<AnimeListContentProps> = () => {
  return <div>List</div>;
};

export default AnimeListContent;
