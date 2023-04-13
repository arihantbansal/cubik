import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRef } from 'react';
import { createSolanaPayRequest } from '~/utils/createSolPayTransaction';
import QRCode from 'qrcode.react';

const PaymentModal = ({ isOpen, onOpen, onClose }: any) => {
  const initialRef = useRef();
  const wallet = useWallet();

  const amount = 10;
  const splToken = 'So11111111111111111111111111111111111111112'; // Replace with the actual SPL token address

  const paymentUrl = createSolanaPayRequest(
    amount,
    splToken,
    'FkaHjeKxxVj4gzXmzeq4vsJEgWNRKCEjefFDQvuy6sGi'
  );
  return (
    <>
      <Modal
        variant={'cubik'}
        // @ts-ignore
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        size="md"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Scan QR Code to Pay</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" justifyContent="center">
              <QRCode
                value={paymentUrl}
                level={'L'}
                radius={22}
                includeMargin={true}
                size={256}
                bgColor="#000000"
                fgColor="#FFFFFF"
                imageSettings={{
                  src: 'https://static.zpao.com/favicon.png',
                  x: undefined,
                  y: undefined,
                  height: 24,
                  width: 24,
                  excavate: true,
                }}
              />
            </Box>
            <Box mt={4} textAlign="center">
              Or visit this URL:
              <Box as="pre" mt={2} fontSize="sm" color="blue.600">
                {paymentUrl}
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PaymentModal;
