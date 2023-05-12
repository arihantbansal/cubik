import { useDisclosure } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';
import WalletVerifyModal from '~/components/app/WalletVerifyWalletModal';
import { authEmitter } from '~/utils/authEmitter';

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
  const router = useRouter();
  const { status } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [signatureData, setSignatureData] = useState<SignatureData | undefined>(
    undefined
  );

  const getSignature = (publicKey: PublicKey): SignatureData | undefined => {
    const itemStr = localStorage.getItem('x-sig-solana');

    if (!itemStr) {
      return undefined;
    }

    const { signature, wallet, expiryDate } = JSON.parse(itemStr);
    const now = new Date().getTime();
    if (publicKey) {
      if (now > expiryDate || publicKey?.toBase58() !== wallet) {
        localStorage.removeItem('x-sig-solana');
        return undefined;
      }
    }
    return { signature: signature, wallet: wallet };
  };

  useEffect(() => {
    if (status !== 'authenticated' && router.pathname !== 'create-profile') {
      const signature = getSignature(publicKey as PublicKey);
      if (signature?.signature) {
        setSignatureData(signature);
        return;
      } else {
        onOpen();
      }
    } else if (status === 'authenticated') {
      authEmitter.emit('authenticated'); // Emit event when user is authenticated
    }
  }, [status, publicKey]);

  useEffect(() => {
    const checkAndVerifySignature = async () => {
      const signature = getSignature(publicKey as PublicKey);

      if (signature !== null) {
        setSignatureData(signature);
        return;
      }

      try {
        if (signMessage && publicKey) {
          onOpen();
          await new Promise((resolve) =>
            authEmitter.once('authenticated', resolve)
          );
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
