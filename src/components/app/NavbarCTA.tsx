import {
  Center,
  HStack,
  Skeleton,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  useWalletModal,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import { signIn, signOut, useSession } from 'next-auth/react';
import { FC, useEffect, useState } from 'react';
import { createMessage, verifyMessage } from '~/utils/getsignMessage';
import UserNavMenu from './navbar-menu/UserNavMenu';
import * as anchor from '@coral-xyz/anchor';
import { useRouter } from 'next/router';
import MemoizedIconButtonBadge from './list/ListButton';
import { WalletAddress } from '../common/wallet/WalletAdd';
import { FailureToast, SuccessToast } from '../common/toasts/Toasts';

const NavbarCTA: FC = () => {
  const [verifying, setVerifying] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { publicKey, disconnect, connecting, connected, signMessage } =
    useWallet();
  const router = useRouter();
  const { status } = useSession();
  const toast = useToast();
  let CTA;

  async function VerifyWallet() {
    setVerifying(true);
    console.log('verify wallet called'); // todo @dhruv: second time when you connect wallet there is some issue in this function after this line
    if (connected && signMessage && publicKey) {
      try {
        const msg = await createMessage();
        const sig = await signMessage(msg);
        console.log(publicKey);
        const final = await verifyMessage(
          anchor.utils.bytes.bs58.encode(sig),
          publicKey
        );
        console.log(final, '--client final', publicKey);

        const signInResponse = await signIn('credentials', {
          callbackUrl: '/',
          redirect: false,
          wallet: publicKey.toBase58(),
          signature: anchor.utils.bytes.bs58.encode(sig),
        });
        if (signInResponse?.status === 401) {
          console.log('now redirect to create-profile which is prefetched');
          router.push('/create-profile');
        }
        setVerifying(false);
        onClose();
        // toast
        SuccessToast({ toast, message: 'Wallet Verified' });
      } catch (error) {
        if ((error as Error).message === 'User rejected the request.') {
          disconnect()
            .then(() => {
              signOut({
                redirect: false,
              });
            })
            .catch((e) => {
              console.log(e);
            });
          // show a banner for reject
          setVerifying(false);
          onClose();
          // toast
          FailureToast({ toast, message: 'Wallet Verification Failed' });
        } else {
          console.log('error while verifying wallet - ', error);
        }
      }
    } else {
      console.log(
        'wallet not connected or signMessage not available or publicKey not available',
        publicKey,
        connected,
        signMessage
      );
    }
  }

  useEffect(() => {
    console.log('use effect called - state: ', status);
    if (status !== 'authenticated') onOpen();
  }, [connecting, status, connected]);

  switch (status) {
    case 'loading':
      CTA = (
        <Skeleton
          isLoaded
          fadeDuration={1}
          rounded={'md'}
          w="8rem"
          height="full"
          startColor="#121219"
          endColor="#37383E"
        />
      );
      break;
    case 'authenticated':
      CTA = (
        <HStack gap={{ base: '2px', md: '16px' }}>
          <>
            <MemoizedIconButtonBadge />
            <UserNavMenu />
          </>
        </HStack>
      );
      break;
    default:
      CTA = publicKey ? (
        <Center
          as="button"
          onClick={disconnect}
          w={{ base: '4rem', md: '6rem' }}
        >
          {router.pathname === '/create-profile' ? '' : <Spinner size="sm" />}
        </Center>
      ) : (
        <Center w="10rem">
          <WalletMultiButton>Connect Wallet</WalletMultiButton>
        </Center>
      );
  }
  return (
    <>
      {connected && (
        <Modal variant={'cubik'} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <HStack>
                <Box gap="8px" as="p" textStyle={'title2'} color="neutral.11">
                  Verify Wallet
                </Box>
                {publicKey && (
                  <Center
                    backgroundColor={'neutral.5'}
                    p="8px 12px"
                    rounded="8px"
                  >
                    <WalletAddress
                      size="xs"
                      walletAddress={publicKey?.toBase58()}
                    />
                  </Center>
                )}
              </HStack>
            </ModalHeader>
            <ModalBody>
              <VStack pt="16px" align={'start'} gap="8px">
                <Box as="p" textStyle={'body3'} color="white">
                  Verify Wallet to prove ownership. No SOL will be charged
                </Box>
              </VStack>
            </ModalBody>

            <ModalFooter display="flex" justifyContent="space-between">
              <Button
                w="8rem"
                variant="close_modal"
                onClick={() => {
                  disconnect();
                  onClose();
                  // refresh the page to clear the cache
                  localStorage.removeItem('walletName');
                }}
              >
                Cancel
              </Button>
              <Button
                px="32px"
                variant="apply_for_grant"
                onClick={VerifyWallet}
                isLoading={verifying}
              >
                Verify Wallet
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      {CTA}
    </>
  );
};

export default NavbarCTA;
