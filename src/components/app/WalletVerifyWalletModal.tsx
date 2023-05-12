// NavbarCTA.tsx
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Center,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
  VStack,
} from '@chakra-ui/react';
import * as anchor from '@coral-xyz/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useUserWalletVerification } from '~/context/UserWalletVerificationContext';
import { useAuthStore } from '~/store/authStore';
import { createMessage, verifyMessage } from '~/utils/getsignMessage';
import { FailureToast, SuccessToast } from '../common/toasts/Toasts';
import { WalletAddress } from '../common/wallet/WalletAdd';

const WalletVerifyModal = () => {
  const toast = useToast();
  const router = useRouter();
  const { setAuthenticated } = useAuthStore();
  const [verifying, setVerifying] = useState(false);
  const { publicKey, disconnect, signMessage } = useWallet();
  const { isOpen, onClose, status } = useUserWalletVerification();
  const [verifyWalletError, setVerifyWalletError] = useState<string | null>(
    null
  );

  async function VerifyWallet() {
    setVerifying(true);
    console.log(signMessage && publicKey);

    if (signMessage && publicKey) {
      try {
        const msg = await createMessage();
        const sig = await signMessage(msg);
        const final = await verifyMessage(
          anchor.utils.bytes.bs58.encode(sig),
          publicKey
        );

        console.log('final - ', final);
        const signInResponse = await signIn('credentials', {
          callbackUrl: '/',
          redirect: false,
          wallet: publicKey.toBase58(),
          signature: anchor.utils.bytes.bs58.encode(sig),
        });
        console.log('sign In- ');
        const expiryDate = new Date().getTime() + 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds
        console.log('Date- ');
        localStorage.setItem(
          'x-sig-solana',
          JSON.stringify({
            signature: anchor.utils.bytes.bs58.encode(sig),
            wallet: publicKey.toBase58(),
            expiryDate,
          })
        );
        console.log('local- ');
        //
        if (signInResponse?.status === 401) {
          console.log('401');
          router.push('/create-profile');
          setVerifying(false);
        }
        console.log('outside 401');
        setAuthenticated(true);
        setVerifying(false);
        onClose();
        SuccessToast({ toast, message: 'Wallet Verified' });
      } catch (error: any) {
        if ((error as Error).message === 'User rejected the request.') {
          setVerifying(false);
          setVerifyWalletError(`Error: ${error.message}`);
          throw error; // re-throw the error after handling it
        }
      }
    }
  }

  return publicKey ? (
    <Modal variant="cubik" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack>
            <Box
              as="p"
              textStyle={{ base: 'title3', md: 'title2' }}
              color="neutral.11"
            >
              Verify Wallet
            </Box>
            {publicKey && (
              <Center
                backgroundColor={'neutral.5'}
                p={{ base: '6px 10px', md: '8px 12px' }}
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
          <VStack pt="16px" align={'start'} gap="16px">
            <Box
              as="p"
              textStyle={{ base: 'body5', md: 'body3' }}
              color="white"
            >
              Verify Wallet to prove ownership. No SOL will be charged
            </Box>{' '}
            {verifyWalletError && (
              <Alert status="error" variant="cubik">
                <AlertIcon />
                <AlertDescription
                  fontSize={{ base: '10px', md: '11px', xl: '12px' }}
                  lineHeight={{ base: '14px', md: '14px', xl: '16px' }}
                >
                  {verifyWalletError}
                </AlertDescription>
              </Alert>
            )}
          </VStack>
        </ModalBody>

        <ModalFooter display="flex" justifyContent="space-between">
          <Button
            w="8rem"
            variant="close_modal"
            onClick={() => {
              disconnect()
                .then(() => {
                  signOut({ redirect: false });
                })
                .catch((e: any) => {
                  new Error(e.message || 'there was an error');
                });
              onClose();
              FailureToast({
                toast,
                message: 'Wallet Verification Failed',
              });
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
  ) : (
    <></>
  );
};

export default WalletVerifyModal;
