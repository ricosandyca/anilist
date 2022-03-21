import { FC, memo, useMemo } from 'react';
import { format } from 'date-fns';
import {
  Box,
  BoxProps,
  HStack,
  Heading,
  Badge,
  VStack,
  Text,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

import { MediaEdge } from '~/types/anilist-graphql';
import { convertFuzzyDateToDate } from '~/utils/date';

export type AnimeRelationCardProps = BoxProps & {
  relation: MediaEdge;
};

const AnimeRelationCard: FC<AnimeRelationCardProps> = ({
  relation,
  ...boxProps
}) => {
  const airingDate = useMemo(() => {
    try {
      const { startDate, endDate } = relation.node || {};
      if (!startDate || !endDate) return undefined;

      const startDateFormat = format(
        convertFuzzyDateToDate(startDate) ?? new Date(),
        'MMMM, dd yyyy',
      );
      const endDateFormat = format(
        convertFuzzyDateToDate(endDate) ?? new Date(),
        'MMMM, dd yyyy',
      );

      return `${startDateFormat} - ${endDateFormat}`;
    } catch (err) {
      return undefined;
    }
  }, [relation.node?.startDate, relation.node?.endDate]);

  return (
    <Box as={RouterLink} to={`/media/${relation.node?.id}`}>
      <Box
        borderRadius="md"
        overflow="hidden"
        position="relative"
        bg="whiteAlpha.200"
        transitionDuration=".3s"
        _hover={{
          bg: 'whiteAlpha.50',
        }}
        {...boxProps}
      >
        <HStack w="full" h="full" justify="space-between" spacing={4}>
          {/* Anime cover image */}
          <Box
            className="img-cover"
            bgImage={`url('${relation.node?.coverImage?.large}')`}
            backgroundSize="100%"
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="cover"
            h="full"
            w="160px"
          />

          <VStack
            h="full"
            alignSelf="flex-start"
            py={4}
            pr={4}
            flex={1}
            textAlign="left"
            align="flex-start"
            spacing={1}
          >
            {/* Relation type (adaptation, prequel, sequel, etc) */}
            <Badge
              color={relation.node?.coverImage?.color ?? undefined}
              fontSize="xs"
            >
              {relation.relationType}
            </Badge>

            {/* Relation title */}
            <Heading
              lineHeight={1.6}
              fontSize="sm"
              fontWeight="500"
              noOfLines={3}
              flex={1}
              py={2}
            >
              {relation.node?.title?.userPreferred}
            </Heading>

            {/* Relation media type and status */}
            <HStack fontSize="xs">
              <Text textTransform="capitalize">
                {relation.node?.type?.toLowerCase()}
              </Text>
              <Text>•</Text>
              <Text textTransform="capitalize">
                {relation.node?.status?.replace(/_/gi, ' ').toLowerCase()}
              </Text>
            </HStack>

            {/* Relation airing date */}
            <Text color="whiteAlpha.700" fontSize="xs">
              {airingDate}
            </Text>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
};

export default memo(AnimeRelationCard);
