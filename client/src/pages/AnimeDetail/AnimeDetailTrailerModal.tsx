import { FC, useMemo } from 'react';
import {
  chakra,
  Button,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Icon,
  useDisclosure,
  Tooltip,
} from '@chakra-ui/react';
import { FaPlay } from 'react-icons/fa';

import { MediaTrailer } from '~/types/anilist-graphql';

const IFrame = chakra('iframe');

export type AnimeDetailTrailerModalProps = {
  trailer?: MediaTrailer;
  color?: string;
};

const AnimeDetailTrailerModal: FC<AnimeDetailTrailerModalProps> = ({
  trailer,
  color,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isAvailable = useMemo(() => {
    if (!trailer) return false;
    const validSites = ['youtube', 'dailymotion'];
    if (!validSites.includes(trailer.site ?? '')) return false;
    return true;
  }, [trailer]);

  const trailerVideoURL = useMemo(() => {
    switch (trailer?.site) {
      case 'youtube':
        return `https://www.youtube.com/embed/${trailer.id}`;
      case 'dailymotion':
        return `https://www.dailymotion.com/video/${trailer.id}`;
      default:
        return '';
    }
  }, [trailer]);

  if (!isAvailable) return null;

  return (
    <>
      <Tooltip label="Play trailer video" placement="right">
        <IconButton
          aria-label="Trailer Play Btn"
          icon={<Icon as={FaPlay} />}
          onClick={onOpen}
          color={color}
          size="lg"
          borderRadius="full"
        />
      </Tooltip>

      <Modal size="4xl" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="bg" borderRadius="lg" overflow="hidden">
          <ModalBody p={0}>
            <IFrame w="full" h="500px" allowFullScreen src={trailerVideoURL} />
          </ModalBody>
          <ModalFooter p={0}>
            <Button
              variant="ghost"
              size="lg"
              colorScheme="red"
              borderRadius="0"
              isFullWidth
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AnimeDetailTrailerModal;
