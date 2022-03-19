import { FC } from 'react';
import { HStack, Icon, Button, Heading } from '@chakra-ui/react';
import {
  GiSnowflake1,
  GiCottonFlower,
  GiSun,
  GiFallingLeaf,
} from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';

import { MediaSeason } from '~/types/anilist-graphql';
import { getSeasonDashYear, seasonOrders } from '~/utils/anime-season';

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
export const seasonSelections = seasonOrders.map((s) => ({
  id: s,
  text: s.toLowerCase(),
  icon: mediaSeasonIcon[s],
  accent: mediaSeasonAccent[s],
  path: getSeasonDashYear(new Date(), s),
}));

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
          leftIcon={<Icon fontSize="lg" as={s.icon} />}
          onClick={() => navigate(s.path)}
        >
          <Heading fontWeight="500" fontSize="sm">
            {s.text}
          </Heading>
        </Button>
      ))}
    </HStack>
  );
};

export default ShellMenu;
