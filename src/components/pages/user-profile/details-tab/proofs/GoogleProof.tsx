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
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import GoogleLogo from './SVGs/Google';
import { BiCheck } from 'react-icons/bi';
import { trpc } from '~/utils/trpc';
import { SuccessToast } from '~/components/common/toasts/Toasts';
import { supabase, useUser } from '~/utils/supabase';
import { useRouter } from 'next/router';
import { env } from '~/env.mjs';
import { useEffect } from 'react';
import { useUserStore } from '~/store/userStore';

interface Props {
  minted: boolean;
  isLoading: boolean;
}
const GoogleProof = ({ minted, isLoading }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const router = useRouter();
  const { user, loading } = useUser(supabase);
  const proofMutation = trpc.user.addProof.useMutation();

  const handleMint = async () => {
    if (minted) return;
    if (!user?.data.user?.email) {
      console.log(env.NEXT_PUBLIC_URL_BASE + router.asPath);
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: env.NEXT_PUBLIC_URL_BASE + router.asPath + '?google=true',
        },
      });
    } else {
      console.log('minting', user.data.user.email);
      proofMutation.mutate({
        name: 'GOOGLE',
        tx: '0x123',
        email: user?.data.user?.email,
      });
    }
    onClose();
    SuccessToast({
      toast,
      message: 'Proof minted successfully',
    });
  };
  useEffect(() => {
    const checkGoogle = async () => {
      if (
        router.query.google &&
        !isLoading &&
        user?.data.user?.email &&
        !loading
      ) {
        // onClose clear the query
        onOpen();
      }
    };
    checkGoogle();
  }, []);

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
            {minted ? 'Minted' : 'Mint'}
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
              {minted ? (
                <Button
                  variant={'cubikFilled'}
                  size={{ base: 'cubikMini', md: 'cubikSmall' }}
                  iconSpacing={{ base: '4px', md: '6px' }}
                  onClick={handleMint}
                  rightIcon={
                    minted ? (
                      <Box
                        as={BiCheck}
                        boxSize={{ base: '15px', md: '18px' }}
                      />
                    ) : undefined
                  }
                >
                  Minted
                </Button>
              ) : (
                <>
                  <VStack>
                    {user?.data.user?.email && (
                      <Text>{user?.data.user?.email}</Text>
                    )}
                    <Button
                      variant={'cubikFilled'}
                      size={{ base: 'cubikMini', md: 'cubikSmall' }}
                      iconSpacing={{ base: '4px', md: '6px' }}
                      onClick={handleMint}
                      rightIcon={
                        minted ? (
                          <Box
                            as={BiCheck}
                            boxSize={{ base: '15px', md: '18px' }}
                          />
                        ) : undefined
                      }
                    >
                      {user?.data.user?.email ? 'Mint' : 'Connect Google'}
                    </Button>
                  </VStack>
                </>
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GoogleProof;
