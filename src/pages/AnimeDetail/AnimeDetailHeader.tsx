import { FC } from 'react';
import { Box, useBreakpointValue } from '@chakra-ui/react';

export type AnimeDetailHeaderProps = {
  imageURL: string;
};

const AnimeDetailContent: FC<AnimeDetailHeaderProps> = ({ imageURL }) => {
  const height = useBreakpointValue({ base: '300px', md: '500px' });

  return (
    <Box h={height} w="full" bg="bg" position="relative">
      <Box
        bgImage={`url('${imageURL}')`}
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        w="full"
        h="full"
        opacity={0.25}
      />
      <Box
        position="absolute"
        top={0}
        w="full"
        h="full"
        bgGradient="linear(to-b, transparent -10%, bg 100%)"
      />
    </Box>
  );
};

export default AnimeDetailContent;
