import {
  Box,
  Button,
  Center,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Tag,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import GoogleLogo from './SVGs/Google';
import { BiCheck } from 'react-icons/bi';

const GoogleProof = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <VStack
        onClick={onOpen}
        p={{ base: '24px', md: '32px' }}
        gap="8px"
        align="start"
      >
        <GoogleLogo size={'60px'} />
        <HStack spacing="8px">
          <Box
            as="p"
            textStyle={{ base: 'title4', md: 'title3' }}
            color={'neutral.11'}
          >
            Google
          </Box>
          <Tag
            size={{ base: 'xs', md: 'sm' }}
            px="12px"
            py="4px"
            color="surface.green.2"
            background={'surface.green.3'}
            rounded="full"
            fontSize={{ base: '10px', sm: '12px', md: '14px' }}
          >
            Minted
          </Tag>
        </HStack>
        <Box
          as="p"
          textStyle={{ base: 'body5', md: 'body5' }}
          color={'neutral.7'}
        >
          To mint this proof you have to connect your google account .
        </Box>
      </VStack>
      <Modal
        size="sm"
        motionPreset="scale"
        variant={'cubik'}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent
          position={'relative'}
          overflow={'hidden'}
          _before={{
            content: '""',
            position: 'absolute',
            top: '-10%',
            left: '50%',
            transform: 'translateX(-50%)',
            rounded: '50%',
            filter: 'blur(80px)',
            width: '6rem',
            height: '6rem',
            background: 'linear-gradient(180deg, #A8F0E6 0%, #A8F0E6 100%)',
            borderRadius: '8px 8px 0px 0px',
            zIndex: '-1',
          }}
        >
          <ModalBody>
            <VStack
              py={{ base: '24px', md: '32px' }}
              gap={{ base: '18px', md: '32px' }}
              textAlign={'center'}
              maxW="16rem"
              mx="auto"
            >
              <VStack spacing={{ base: '12px', md: '24px' }}>
                <Center transform={'scale(2)'} h="130px">
                  <GoogleLogo size={'60px'} />
                </Center>
                <Box
                  as="p"
                  textStyle={{ base: 'title3', md: 'title2' }}
                  color="neutral.11"
                >
                  Google Proof
                </Box>
                <Box
                  as="p"
                  textStyle={{ base: 'title6', md: 'title5' }}
                  color="neutral.11"
                >
                  Claim your first proof by connecting your google account.
                </Box>
              </VStack>
              <Button
                variant={'cubikFilled'}
                size={{ base: 'cubikMini', md: 'cubikSmall' }}
                iconSpacing={{ base: '4px', md: '6px' }}
                rightIcon={
                  <Box as={BiCheck} boxSize={{ base: '15px', md: '18px' }} />
                }
              >
                Minted
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GoogleProof;
