import { FC } from 'react';
import { Box, HStack, Icon, Link, Text } from '@chakra-ui/react';
import { AiFillHeart } from 'react-icons/ai';
import { MdOutlineCode } from 'react-icons/md';

import { withContainer } from '~/hoc/with-container';
import appConfig from '~/config/app';

const Footer: FC = () => {
  const ContainerFooterContent = withContainer(FooterContent);

  return (
    <Box bg="bg" borderTop="1px" borderColor="whiteAlpha.300" py={10}>
      <ContainerFooterContent />
    </Box>
  );
};

const FooterContent: FC = () => {
  return (
    <HStack
      fontFamily="heading"
      justifyContent="center"
      color="whiteAlpha.900"
      spacing={1}
    >
      <Icon as={MdOutlineCode} mx={1} />
      <Text>with</Text>
      <Icon color="pink.400" as={AiFillHeart} mx={1} />
      <Text>by</Text>
      <Link
        color="pink.400"
        target="_blank"
        mx={1}
        href={`${appConfig.appAuthorURL}`}
        _focus={{
          boxShadow: 'none',
        }}
      >
        {appConfig.appAuthor}
      </Link>
    </HStack>
  );
};

export default Footer;
