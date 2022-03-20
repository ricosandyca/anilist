import { FC, useEffect, useState } from 'react';
import {
  IconButton,
  Icon,
  Drawer,
  DrawerContent,
  DrawerBody,
  DrawerOverlay,
  DrawerHeader,
  Image,
  Link,
  Button,
  Heading,
  VStack,
  useDisclosure,
  HStack,
} from '@chakra-ui/react';
import { RiMenu3Fill, RiCloseFill } from 'react-icons/ri';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { seasonSelections } from './ShellMenu';
import anilistLogo from '~/assets/anilist-logo.png';

const ShellResponsiveDrawer: FC = () => {
  const [renderDrawer, setRenderDrawer] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // optimize drawer render
  // without lossing the sliding effect
  // on drawer open, immediately render the drawer
  // on drawer close, delay 100ms before removing it from the DOM
  useEffect(() => {
    if (isOpen) setRenderDrawer(true);
    else
      setTimeout(() => {
        setRenderDrawer(false);
      }, 100);
  }, [isOpen]);

  return (
    <>
      <IconButton
        aria-label="Hamburger icon"
        variant="ghost"
        icon={<Icon fontSize="xl" as={RiMenu3Fill} />}
        onClick={onOpen}
      />
      {renderDrawer && (
        <ShellResponsiveDrawerContent isOpen={isOpen} onClose={onClose} />
      )}
    </>
  );
};

export type ShellResponsiveDrawerContentProps = {
  isOpen: boolean;
  onClose: () => any;
};

const ShellResponsiveDrawerContent: FC<ShellResponsiveDrawerContentProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();

  return (
    <Drawer
      blockScrollOnMount={false}
      placement="top"
      isOpen={isOpen}
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent
        borderBottom="1px"
        borderColor="whiteAlpha.300"
        bg="bgAlpha.300"
        backdropFilter="blur(15px) saturate(2.5)"
      >
        {/* Drawer header of icon and close icon */}
        <DrawerHeader>
          <HStack justify="space-between">
            <Link _focus={{ boxShadow: 'none' }} as={RouterLink} to="/">
              <Image src={anilistLogo} h="60px" w="auto" />
            </Link>
            <IconButton
              aria-label="Hamburger icon"
              variant="ghost"
              icon={<Icon fontSize="2xl" as={RiCloseFill} />}
              onClick={onClose}
            />
          </HStack>
        </DrawerHeader>

        {/* Drawer content of menu list */}
        <DrawerBody>
          <VStack pb={4}>
            {seasonSelections.map((s) => (
              <Button
                key={s.id}
                variant="ghost"
                colorScheme={s.accent}
                textTransform="capitalize"
                leftIcon={<Icon fontSize="lg" as={s.icon} />}
                onClick={() => {
                  navigate(s.path);
                  onClose();
                }}
                isFullWidth
                size="lg"
                justifyContent="flex-start"
                px={4}
              >
                <Heading fontWeight="500" fontSize="md" pl={2}>
                  {s.text}
                </Heading>
              </Button>
            ))}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default ShellResponsiveDrawer;
