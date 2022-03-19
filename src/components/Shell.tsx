import { FC } from 'react';
import { Box, HStack, Image, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

import anilistLogo from '~/assets/anilist-logo.png';
import { withContainer } from '~/hoc/with-container';

const TOP_SHELL_HEIGHT = '100px';

const ShellContent: FC = () => {
  return (
    <HStack h="full">
      <HStack h="full">
        <Link as={RouterLink} to="/">
          <Image src={anilistLogo} h="70px" w="auto" />
        </Link>
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
