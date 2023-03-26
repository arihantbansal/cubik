import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Drawer,
  useMediaQuery,
} from '@chakra-ui/react';
import { ConnectWalletCardBody } from './create-profile/ConnectWalletCardBody';

const ConnectWalletModal = ({ isOpen, onClose }: any) => {
  const [isLargerThan480] = useMediaQuery('(max-width: 600px)');

  return isLargerThan480 ? (
    <Drawer
      isOpen={isOpen}
      placement="bottom"
      onClose={onClose}
      variant="cubik"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Connect a wallet</DrawerHeader>
        <DrawerBody>
          <ConnectWalletCardBody />
        </DrawerBody>
        <DrawerFooter
          display={'flex'}
          flexDir="row"
          justifyContent={'space-between'}
          alignItems="center"
        >
          <Box as="p" color={'neutral.8'} textStyle="body5">
            New to Solana Wallets?
          </Box>
          <Box as="p" color={'brand.teal5'} textStyle="title6">
            Learn more
          </Box>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ) : (
    <Modal isOpen={isOpen} onClose={onClose} variant="cubik">
      <ModalOverlay />
      <ModalContent
        position="relative"
        overflow={'hidden'}
        _before={{
          content: '""',
          zIndex: '-1',
          position: 'absolute',
          bottom: '100%',
          left: '50%',
          transform: 'translate(-50%, 0%)',
          width: '6rem',
          height: '6rem',
          backgroundColor: '#A8F0E6',
          filter: 'blur(120px)',
          borderRadius: 'full',
        }}
      >
        <ModalHeader>Connect a wallet</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ConnectWalletCardBody />
        </ModalBody>
        <ModalFooter
          display={'flex'}
          flexDir="row"
          justifyContent={'space-between'}
          alignItems="center"
        >
          <Box as="p" color={'neutral.8'} textStyle="body5">
            New to Solana Wallets?
          </Box>
          <Box as="p" color={'brand.teal5'} textStyle="title6">
            Learn more
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConnectWalletModal;
