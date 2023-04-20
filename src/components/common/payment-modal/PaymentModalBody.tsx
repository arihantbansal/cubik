import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react';
import QRCode from 'qrcode.react';
import { useRef } from 'react';
import { ProjectDonationSimulator } from '~/components/pages/projects/project-details/project-interactions/project-donation-simulator/ProjectDonationSimulator';
import { createSolanaPayRequest } from '~/utils/createSolPayTransaction';

const PaymentModalBody = ({ isOpen, onOpen, onClose }: any) => {
  const initialRef = useRef();

  const amount = 10;
  const splToken = 'So11111111111111111111111111111111111111112'; // Replace with the actual SPL token address

  const paymentUrl = createSolanaPayRequest(
    amount,
    splToken,
    'FkaHjeKxxVj4gzXmzeq4vsJEgWNRKCEjefFDQvuy6sGi'
  );
  return (
    <Stack direction="row">
      <ProjectDonationSimulator height={120} width={120} />
    </Stack>
  );
};

export default PaymentModalBody;
