import { useDisclosure } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect } from 'react';
import WalletVerifyModal from '~/components/app/WalletVerifyWalletModal';
import jwt from 'jsonwebtoken';

interface SignatureData {
  signature: string;
  wallet: string;
}

interface Props {
  children: React.ReactNode;
}

export const AuthWrapper: React.FC<Props> = ({ children }) => {
  const { publicKey, connected } = useWallet();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const checkAndVerifySignature = () => {
    if (!publicKey || !connected) {
      return;
    }

    // check the jwt for expire or wallet address
    if (localStorage.getItem('wallet_auth')) {
      const walletAuth = localStorage.getItem('wallet_auth') as string;

      const payload = jwt.decode(walletAuth) as jwt.JwtPayload;

      if (
        payload.wallet !== publicKey.toBase58() ||
        payload.exp! < Date.now() / 1000
      ) {
        onOpen();
        // return;
      }
      console.log(payload, 'this payload');
      return null;
    }
    // if (!localStorage.getItem('anon_sig')) {
    onOpen();
    // }
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
