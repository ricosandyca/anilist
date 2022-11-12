import { FC } from 'react';
import { HStack, Button, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {
  GiSnowflake1,
  GiCottonFlower,
  GiSun,
  GiFallingLeaf,
} from 'react-icons/gi';

import { MediaSeason } from '~/types/anilist-graphql';
import { getSeasonDashYear, getSeasonSelections } from '~/utils/anime-season';

export const mediaSeasonIcon = {
  [MediaSeason.Winter]: GiSnowflake1,
  [MediaSeason.Spring]: GiCottonFlower,
  [MediaSeason.Summer]: GiSun,
  [MediaSeason.Fall]: GiFallingLeaf,
};
export const mediaSeasonAccent = {
  [MediaSeason.Winter]: 'cyan',
  [MediaSeason.Spring]: 'pink',
  [MediaSeason.Summer]: 'yellow',
  [MediaSeason.Fall]: 'orange',
};
export const seasonSelections = getSeasonSelections().map((s) => {
  const d = new Date();
  d.setFullYear(s.year);
  const path = getSeasonDashYear(d, s.season);

  return {
    id: path,
    season: s.season.toLowerCase(),
    year: s.year,
    accent: mediaSeasonAccent[s.season],
    icon: mediaSeasonIcon[s.season],
    path,
  };
});

export const ShellMenu: FC = () => {
  const navigate = useNavigate();

  return (
    <HStack spacing={2}>
      {seasonSelections.map((s) => (
        <Button
          key={s.id}
          variant="ghost"
          colorScheme={s.accent}
          textTransform="capitalize"
          leftIcon={
            <Text fontSize="sm" fontWeight="extrabold">
              {s.year.toString().slice(-2)}
            </Text>
          }
          onClick={() => navigate(s.path)}
        >
          <Heading fontWeight="500" fontSize="sm">
            {s.season}
          </Heading>
        </Button>
      ))}
    </HStack>
  );
};

export default ShellMenu;
