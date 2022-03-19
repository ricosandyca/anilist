import { FC, useCallback } from 'react';
import {
  Box,
  HStack,
  Icon,
  Image,
  Link,
  Button,
  Heading,
} from '@chakra-ui/react';
import {
  GiSnowflake1,
  GiCottonFlower,
  GiSun,
  GiFallingLeaf,
} from 'react-icons/gi';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import anilistLogo from '~/assets/anilist-logo.png';
import { withContainer } from '~/hoc/with-container';
import { MediaSeason } from '~/types/anilist-graphql';
import { getSeasonDashYear } from '~/utils/anime-season';

const TOP_SHELL_HEIGHT = '100px';
const seasonOrders = [
  MediaSeason.Winter,
  MediaSeason.Spring,
  MediaSeason.Summer,
  MediaSeason.Fall,
];
const mediaSeasonIcon = {
  [MediaSeason.Winter]: GiSnowflake1,
  [MediaSeason.Spring]: GiCottonFlower,
  [MediaSeason.Summer]: GiSun,
  [MediaSeason.Fall]: GiFallingLeaf,
};
const mediaSeasonColor = {
  [MediaSeason.Winter]: 'cyan',
  [MediaSeason.Spring]: 'pink',
  [MediaSeason.Summer]: 'yellow',
  [MediaSeason.Fall]: 'orange',
};

const ShellContent: FC = () => {
  const navigate = useNavigate();

  const onSeasonClick = useCallback((season: MediaSeason) => {
    navigate(`${getSeasonDashYear(new Date(), season)}`);
  }, []);

  return (
    <HStack h="full" justify="space-between">
      {/* App icon */}
      <Box>
        <Link _focus={{ boxShadow: 'none' }} as={RouterLink} to="/">
          <Image src={anilistLogo} h="70px" w="auto" />
        </Link>
      </Box>

      {/* Season selection */}
      <HStack spacing={2}>
        {seasonOrders.map((season) => (
          <Button
            key={season}
            variant="ghost"
            colorScheme={mediaSeasonColor[season]}
            textTransform="capitalize"
            leftIcon={<Icon fontSize="lg" as={mediaSeasonIcon[season]} />}
            onClick={() => onSeasonClick(season)}
          >
            <Heading fontWeight="500" fontSize="sm">
              {season.toLowerCase()}
            </Heading>
          </Button>
        ))}
      </HStack>
    </HStack>
  );
};

const Shell: FC = ({ children }) => {
  const ContainerShellContent = withContainer(ShellContent);
  const ContainerChildren = withContainer(() => <>{children}</>);

  return (
    <Box position="relative">
      {/* Top shell */}
      <Box
        h={TOP_SHELL_HEIGHT}
        w="full"
        bg="bgAlpha.500"
        borderBottom="1px"
        borderColor="whiteAlpha.300"
        position="fixed"
        top={0}
        zIndex={999}
        backdropFilter="blur(8px) saturate(1.5)"
      >
        <ContainerShellContent />
      </Box>

      {/* Main content */}
      <Box mt={`calc(${TOP_SHELL_HEIGHT} + 20px)`}>
        <ContainerChildren />
      </Box>
    </Box>
  );
};

export default Shell;
