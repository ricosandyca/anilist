import { FC, memo, useMemo } from 'react';
import {
  BoxProps,
  Box,
  HStack,
  Image,
  Heading,
  VStack,
  Text,
  Button,
  Icon,
  Badge,
  Flex,
  Link,
  useBreakpointValue,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { AiFillCaretRight } from 'react-icons/ai';
import { Link as RouterLink } from 'react-router-dom';

import { Media } from '~/types/anilist-graphql';
import { getContrastTextColor } from '~/utils/color';
import { convertFuzzyDateToDate } from '~/utils/date';
import { normalizeHTML } from '~/utils/html';

export type PopularAnimeBannerProps = BoxProps & {
  media: Media;
};

const PopularAnimeBanner: FC<PopularAnimeBannerProps> = ({
  media,
  ...boxProps
}) => {
  const isMDDown = useBreakpointValue({ base: true, lg: false });

  const normalizedDescription = useMemo(() => {
    if (!media.description) return null;
    return normalizeHTML(media.description);
  }, [media.description]);

  const accent = useMemo(() => {
    const imageAccent = media.coverImage?.color;
    if (!imageAccent)
      return {
        bg: 'purple.400',
        text: 'gray.800',
      };

    return {
      bg: imageAccent,
      text: getContrastTextColor(imageAccent, {
        light: 'white',
        dark: 'gray.800',
      }),
    };
  }, [media.coverImage?.color]);

  const airingDate = useMemo(() => {
    try {
      const { startDate, endDate } = media;
      if (!startDate || !endDate) return undefined;

      const startDateFormat = format(
        convertFuzzyDateToDate(startDate) ?? new Date(),
        'MMMM dd, yyyy',
      );
      const endDateFormat = format(
        convertFuzzyDateToDate(endDate) ?? new Date(),
        'MMMM dd, yyyy',
      );

      return `${startDateFormat} - ${endDateFormat}`;
    } catch (err) {
      return undefined;
    }
  }, [media.startDate, media.endDate]);

  return (
    <Box
      bgImage={`url('${media.bannerImage ?? media.coverImage?.extraLarge}')`}
      bgPosition={isMDDown ? 'center' : 'left'}
      bgRepeat="no-repeat"
      bgSize="cover"
      w="full"
      position="relative"
      maxHeight="100vh"
      {...boxProps}
    >
      {/* Image overlay */}
      <Box
        w="full"
        h="full"
        bg="bgAlpha.800"
        position="absolute"
        top={0}
        left={0}
        zIndex={0}
      />

      {/* Main content */}
      <HStack
        position="relative"
        h="full"
        w="full"
        spacing={6}
        zIndex={2}
        p={isMDDown ? 6 : 24}
      >
        {/* Media image */}
        {!isMDDown && (
          <Box h="full" w="auto">
            <Image
              src={media.coverImage?.extraLarge ?? undefined}
              alt="Media cover"
              h="full"
              w="auto"
              borderRadius="md"
            />
          </Box>
        )}

        {/* Media info */}
        <VStack
          alignSelf={isMDDown ? 'center' : 'flex-start'}
          spacing={4}
          align="flex-start"
          textAlign="left"
          maxW="500px"
        >
          {/* Media title */}
          <Heading fontSize="4xl" noOfLines={2}>
            {media.title?.userPreferred}
          </Heading>

          {/* Media airing info */}
          {airingDate && (
            <Text fontSize="sm" color="whiteAlpha.700">
              {airingDate}
            </Text>
          )}

          {/* Media description */}
          {normalizedDescription && (
            <Text noOfLines={2} lineHeight={1.75}>
              {normalizedDescription}
            </Text>
          )}

          {/* Media genres */}
          <Flex flexFlow="wrap">
            {media.genres?.map((genre, i) => (
              <Box key={i} mr={2} mt={1}>
                <Badge color={accent.text} bg={accent.bg}>
                  {genre}
                </Badge>
              </Box>
            ))}
          </Flex>

          {/* Media view button */}
          <Box py={4}>
            <Link
              as={RouterLink}
              to={`/media/${media.id}`}
              textDecor="none !important"
            >
              <Button
                rightIcon={<Icon as={AiFillCaretRight} />}
                variant="outline"
                colorScheme="purple"
                color={accent.bg}
                borderColor={accent.bg}
              >
                View
              </Button>
            </Link>
          </Box>
        </VStack>
      </HStack>
    </Box>
  );
};

export default memo(PopularAnimeBanner);
