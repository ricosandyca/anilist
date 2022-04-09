import { FC } from 'react';
import { Flex, Text, VStack, Icon, useBreakpointValue } from '@chakra-ui/react';
import { RiEmotionLine } from 'react-icons/ri';

import { withContainer } from '~/hoc/with-container';

const NotFoundPage: FC = () => {
  // responsive breakpoints
  const isSMDown = useBreakpointValue({ base: true, md: false });

  return (
    <Flex
      position="relative"
      w="full"
      h={`calc(100vh - 210px)`}
      alignItems="center"
      justifyContent="center"
      color="whiteAlpha.800"
    >
      <VStack spacing={3} alignItems="center">
        <Icon as={RiEmotionLine} fontSize="6xl" color="inherit" />
        <VStack alignItems={!isSMDown ? 'flex-start' : 'center'} spacing={1}>
          <Text color="inherit" fontWeight="semibold">
            Coming soon
          </Text>
        </VStack>
      </VStack>
    </Flex>
  );
};

export default withContainer(NotFoundPage, true);
