import { useDisclosure } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { signIn, useSession } from 'next-auth/react';
import router from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';
import WalletVerifyModal from '~/components/app/WalletVerifyWalletModal';
import { useAuthStore } from '~/store/authStore';

interface SignatureData {
  signature: string;
  wallet: PublicKey;
}

interface UserWalletVerificationProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  status: string;
  signatureData?: SignatureData;
}

interface UserWalletVerificationProviderProps {
  children: React.ReactNode;
}

const defaultContextValue: UserWalletVerificationProps = {
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
  status: '',
  signatureData: undefined,
};

export const UserWalletVerificationContext =
  createContext<UserWalletVerificationProps>(defaultContextValue);

// todo: this hook needs to be worked on it does not work on create-profile
export const UserWalletVerificationProvider: React.FC<
  UserWalletVerificationProviderProps
> = ({ children }) => {
  const { publicKey, signMessage } = useWallet();
  const { authenticated, setAuthenticated, key } = useAuthStore();
  const { status } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [signatureData, setSignatureData] = useState<SignatureData | undefined>(
    undefined
  );

  const getSignature = (publicKey: PublicKey): SignatureData | undefined => {
    console.log('2 - get signature from local storage');
    if (key.sig === '') {
      return undefined;
    }
    return { signature: key.sig, wallet: new PublicKey(key.wallet) };
  };

  useEffect(() => {
    console.log('1 - check if unauthenticated or loading');
    if (status !== 'authenticated' && router.pathname !== 'create-profile') {
      const signature = getSignature(publicKey as PublicKey);
      if (
        signature?.signature &&
        signature.wallet.toBase58() === publicKey?.toBase58()
      ) {
        setSignatureData(signature);
        return; // todo yhan tak code same ha
      } else {
        onOpen();
      }
    } else if (status === 'authenticated') {
      //authEmitter.emit('authenticated'); // Emit event when user is authenticated
      setAuthenticated(true);
    }
  }, [status, publicKey]);

  useEffect(() => {
    const checkAndVerifySignature = async () => {
      console.log('1 - check for signature');
      const signature = getSignature(publicKey as PublicKey);
      try {
        if (signMessage && publicKey) {
          if (signature) {
            console.log('3 - context returned signature - ', signature);
            setSignatureData(signature);
            const signInResponse = await signIn('credentials', {
              callbackUrl: '/',
              redirect: false,
              wallet: publicKey?.toBase58(),
              signature: signature?.signature,
            });
            console.log(signInResponse);

            return; // todo yhan tak code same ha
          }

          console.log(
            '4 - could not find signature so open modal ',
            signMessage,
            publicKey
          );
          onOpen();
          console.log('5 - waiting for modal to sign transaction');
          while (!authenticated) {
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before checking again
          }
          const newSignatureData = getSignature(publicKey);
          setSignatureData(newSignatureData);
        } else {
          throw new Error(
            'Wallet is not connected or signMessage is not available'
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (publicKey) {
      checkAndVerifySignature();
    }
  }, [publicKey, signMessage, onOpen]);

  return (
    <UserWalletVerificationContext.Provider
      value={{
        isOpen,
        onOpen,
        onClose,
        status,
        signatureData,
      }}
    >
      {children}
      <WalletVerifyModal />
    </UserWalletVerificationContext.Provider>
  );
};

// Create a custom hook to use the UserWalletVerificationContext
export const useUserWalletVerification = () =>
  useContext(UserWalletVerificationContext);
