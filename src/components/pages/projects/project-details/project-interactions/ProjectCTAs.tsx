import {
  Box,
  Button,
  VStack,
  Icon,
  Skeleton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { ProjectsModel } from '@prisma/client';
import { MdArrowForward } from 'react-icons/md';
import { IconProps } from '@chakra-ui/react';
import { useState } from 'react';
import PaymentModalBody from '~/components/common/payment-modal/PaymentModalBody';
import { useSession } from 'next-auth/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

interface ProjectCTAsProps {
  projectDetails: ProjectsModel;
  isLoading: boolean;
}

const AnimatedArrowIcon = (props: IconProps & { animate: boolean }) => {
  const transition = 'all 0.2s ease-in-out';
  const transform = props.animate ? 'translateX(0.5rem)' : '';

  return (
    <Icon
      as={MdArrowForward}
      w={6}
      h={6}
      transition={transition}
      transform={transform}
      {...props}
    />
  );
};

export const ProjectCTAs = ({
  projectDetails,
  isLoading,
}: ProjectCTAsProps) => {
  const session = useSession();
  const { setVisible } = useWalletModal();
  const [isHovered, setIsHovered] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onDonateHandler = () => {
    if (session.data?.user?.id) {
      onOpen();
    } else {
      setVisible(true);
    }
  };
  return (
    <>
      <Modal variant={'cubik'} size="4xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent pt="0">
          <ModalHeader
            bg="black"
            h="full"
            pt="24px !important"
            pb="24px !important"
            roundedTop={'24px'}
          >
            Donate
          </ModalHeader>
          <ModalCloseButton top="24px" />
          <ModalBody>
            <PaymentModalBody projectDetails={projectDetails} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Box display={{ base: 'none', md: 'block' }}>
        <VStack
          ml="auto"
          right="20rem"
          w={'full'}
          alignItems={{ base: 'center', md: 'start' }}
        >
          <VStack gap="16px" align={'end'} spacing="0" w="full" pb="0.5rem">
            <Skeleton isLoaded={!isLoading} w="full">
              <Box opacity={isLoading ? '0.6' : '1'}>
                <Button
                  onClick={onDonateHandler}
                  variant="project_button_primary"
                  w="full"
                >
                  Donate
                </Button>
              </Box>
            </Skeleton>
            <Skeleton isLoaded={!isLoading} w="full">
              <Box opacity={isLoading ? '0.4' : '1'}>
                <Button
                  rightIcon={<AnimatedArrowIcon animate={isHovered} />}
                  variant="project_button_secondary"
                  w="full"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  Visit Project
                </Button>
              </Box>
            </Skeleton>
          </VStack>
        </VStack>
      </Box>
    </>
  );
};
