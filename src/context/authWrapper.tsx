import { useDisclosure } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import WalletVerifyModal from '~/components/app/WalletVerifyWalletModal';
import { useAuthStore } from '~/store/authStore';

interface SignatureData {
  signature: string;
  wallet: string;
}

interface Props {
  children: React.ReactNode;
}

export const AuthWrapper: React.FC<Props> = ({ children }) => {
  const { publicKey, connected } = useWallet();
  const { key, setKey } = useAuthStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { data: session } = useSession();
  const getSignature = (): SignatureData | undefined => {
    if (key.sig === '') {
      return undefined;
    }
    return { signature: key.sig, wallet: key.wallet };
  };

  const checkAndVerifySignature = async () => {
    const signatureStore = getSignature();
    console.log('verifying wallet -2');
    if (!publicKey) {
      return;
    }
    // if (!connected && session?.user) {
    //   return signOut({
    //     redirect: false,
    //   });
    // }

    if (!signatureStore) {
      // check for available signature
      onOpen();
      return;
    }

    if (signatureStore && signatureStore.wallet !== publicKey.toBase58()) {
      // check for available signature for current wallet
      onOpen();
      return;
    }
    try {
      // Try Login
      const signInResponse = await signIn('credentials', {
        redirect: false,
        wallet: publicKey?.toBase58(),
        signature: signatureStore?.signature,
      });

      if (signInResponse?.status === 401) {
        console.log('redirecting to create profile');
        if (session?.user.id) {
          console.log('redirecting to ss');
          await signOut({
            redirect: false,
          });
          setKey({
            sig: '',
            wallet: '',
          });
        }
        console.log('redirecting to create profile');

        router.push('/create-profile');
        return;
      }

      if (signInResponse?.error) {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    checkAndVerifySignature();
  }, [publicKey]);

  return (
    <>
      {children}
      <WalletVerifyModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
