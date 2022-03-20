import { FC } from 'react';
import {
  Flex,
  Text,
  VStack,
  HStack,
  Icon,
  useBreakpointValue,
} from '@chakra-ui/react';
import { RiEmotionSadFill } from 'react-icons/ri';
import { withContainer } from '~/hoc/with-container';

const NotFoundPage: FC = () => {
  // responsive breakpoints
  const isSMDown = useBreakpointValue({ base: true, md: false });
  const Wrapper = isSMDown ? VStack : HStack;

  return (
    <Flex
      position="relative"
      w="full"
      h={`calc(100vh - 210px)`}
      alignItems="center"
      justifyContent="center"
      color="whiteAlpha.800"
    >
      <Text
        position="absolute"
        zIndex={-1}
        fontWeight="extrabold"
        fontSize={['10rem', '18rem']}
        userSelect="none"
        w="full"
        textAlign="center"
        opacity={0.04}
      >
        404
      </Text>
      <Wrapper spacing={3} alignItems="center">
        <Icon as={RiEmotionSadFill} fontSize="6xl" color="inherit" />
        <VStack alignItems={!isSMDown ? 'flex-start' : 'center'} spacing={1}>
          <Text color="inherit" fontWeight="semibold">
            Page Not Found
          </Text>
        </VStack>
      </Wrapper>
    </Flex>
  );
};

export default withContainer(NotFoundPage, true);
