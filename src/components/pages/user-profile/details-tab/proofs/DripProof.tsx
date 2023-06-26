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
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useUserStore } from '~/store/userStore';
import { trpc } from '~/utils/trpc';
import DripHauz from './SVGs/DripHauz';

interface Props {
  claimed: boolean;
}
const DripProof = ({ claimed }: Props) => {
  const { user } = useUserStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [canClaim, setCanClaimed] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleClaim = async () => {
    try {
      setLoading(true);
      const res = await axios.post('/api/info/nft', {
        address: user?.mainWallet,
        collection: 'F8FdDYD3PWndYoae9TrBcucXDWFwDvm6bZU2LQT1PwyB',
      });
      console.log(res.data);
      if (res.data.data > 0) {
        setCanClaimed(true);
      } else {
        setError("You don't have any drip s1 NFTs");
        setCanClaimed(false);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setCanClaimed(false);
      setError('Something went wrong, please try again later.');
      setLoading(false);
    }
  };
  const handleDripProof = trpc.user.dripProof.useMutation({
    onSuccess: () => {
      console.log('success');
      /// add confettie and everything here
      onClose();
    },
  });
  return (
    <>
      <VStack onClick={onOpen} p="32px" gap="8px" align="start">
        <DripHauz size={'60px'} />
        <HStack spacing="8px">
          <Box
            as="p"
            textStyle={{ base: '', md: 'title3' }}
            color={'neutral.11'}
          >
            Drip Hauz
          </Box>
          <Tag
            size={{ base: 'xs', md: 'sm' }}
            px="12px"
            py="4px"
            color="surface.green.2"
            background={'surface.green.3'}
            rounded="full"
          >
            {claimed ? 'Claimed' : 'claim'}
          </Tag>
        </HStack>
        <Box as="p" textStyle={{ base: '', md: 'body5' }} color={'neutral.7'}>
          If Drip S1 NFTs were airdropped to you can collect this proof
        </Box>
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
                py="32px"
                gap="32px"
                textAlign={'center'}
                maxW="16rem"
                mx="auto"
              >
                <VStack spacing="24px">
                  <Center transform={'scale(2)'} h="130px">
                    <DripHauz size={'60px'} />
                  </Center>
                  <VStack spacing="12px">
                    <Box as="p" textStyle={'title2'} color="neutral.11">
                      Drip Haus Proof
                    </Box>
                    <Box
                      as="p"
                      textStyle={'overline3'}
                      color="neutral.8"
                      textTransform={'uppercase'}
                    >
                      Drip S1 NFTs Holder
                    </Box>
                  </VStack>
                  <Box as="p" textStyle={'title5'} color="neutral.11">
                    Claim your drip proof by verifying your wallet that holds
                    drip s1 NFTs.
                  </Box>
                </VStack>

                {claimed ? (
                  <>
                    <Button isDisabled variant={'connect_wallet'} w="12rem">
                      Proof Collected
                    </Button>
                  </>
                ) : canClaim ? (
                  <>
                    {handleDripProof.isError && (
                      <>
                        <Text>{handleDripProof.error.message}</Text>
                      </>
                    )}
                    <Button
                      onClick={() => {
                        handleDripProof.mutate();
                      }}
                      variant={'connect_wallet'}
                      w="12rem"
                    >
                      Claim
                    </Button>
                  </>
                ) : (
                  <>
                    {error && (
                      <>
                        <Text>{error}</Text>
                      </>
                    )}
                    <Button
                      onClick={handleClaim}
                      variant={'connect_wallet'}
                      w="12rem"
                      isLoading={loading}
                    >
                      Verify Wallet
                    </Button>
                  </>
                )}
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </VStack>
    </>
  );
};

export default DripProof;
