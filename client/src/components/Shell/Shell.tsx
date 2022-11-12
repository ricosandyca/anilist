import { FC } from 'react';
import { Box, HStack, Image, Link, useBreakpointValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

import anilistLogo from '~/assets/anilist-logo.png';
import { withContainer } from '~/hoc/with-container';
import ShellMenu from './ShellMenu';
import ShellResponsiveDrawer from './ShellResponsiveDrawer';
import Footer from '../Footer';

export const TOP_SHELL_HEIGHT = '100px';

const Shell: FC = ({ children }) => {
  const ContainerShellContent = withContainer(ShellContent);

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
      <Box>
        {children}
        <Footer />
      </Box>
    </Box>
  );
};

const ShellContent: FC = () => {
  const isMDDown = useBreakpointValue({ base: true, lg: false });

  return (
    <HStack h="full" justify="space-between">
      {/* App icon */}
      <Box>
        <Link _focus={{ boxShadow: 'none' }} as={RouterLink} to="/">
          <Image src={anilistLogo} h="60px" w="auto" />
        </Link>
      </Box>

      {/* Shell menu */}
      {isMDDown ? <ShellResponsiveDrawer /> : <ShellMenu />}
    </HStack>
  );
};

export default Shell;
