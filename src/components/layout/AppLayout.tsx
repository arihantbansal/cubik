import {
  Button,
  Center,
  Container,
  Skeleton,
  useDisclosure,
} from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect } from 'react';
import { WalletAddress } from '../common/wallet/WalletAdd';
import ConnectWalletModal from '../pages/connect-wallet/ConnectWalletModal';
import { Header } from './navigation/Header';
import UserNavMenu from './navigation/UserNavMenu';
interface AppLayoutProps {
  children: ReactNode;
}
interface AuthProviderProps {
  onClose: any;
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ onClose, children }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { publicKey } = useWallet();

  async function auth() {
    if (!publicKey) return;
    const signInResponse = await signIn('credentials', {
      callbackUrl: '',
      redirect: false,
      wallet: publicKey.toBase58(),
    });
    if (signInResponse?.status === 401) {
      // wallet connected but user does not exist
      router.push('/create-profile');
      return onClose();
    }
    if (session && router.pathname === '/create-profile') {
      // wallet connected and profile created succesfully
      //todo: if success popup showing wen created profile then remove this code
      return router.push({
        pathname: '/[username]',
        query: { username: session.user.username },
      });
    }
  }

  useEffect(() => {
    auth();
  }, [publicKey]);

  return (
    <Container maxW="full" p="0">
      {children}
    </Container>
  );
};

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { publicKey, disconnect } = useWallet();
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    //console.log('status, pubkey -', status, publicKey);
    if (publicKey && status === 'authenticated') {
      onClose();
    }
  }, [onClose, publicKey, status]);

  const NavbarCTA = () => {
    // if (router.pathname === '/create-profile' && publicKey)
    //   return (
    //     <Center cursor={'pointer'} onClick={disconnect}>
    //       <WalletAddress walletAddress={publicKey?.toBase58()} />
    //     </Center>
    //   );
    switch (status) {
      case 'loading':
        return (
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
      case 'authenticated':
        return <UserNavMenu />;
      default:
        return publicKey ? (
          <Center as="button" onClick={disconnect}></Center>
        ) : (
          <Button variant="connect_wallet" h="fit-content" onClick={onOpen}>
            Connect Wallet
          </Button>
        );
    }
  };

  return (
    <AuthProvider onClose={onClose}>
      <ConnectWalletModal isOpen={isOpen} onClose={onClose} />
      <Header>
        <NavbarCTA />
      </Header>
      {children}
    </AuthProvider>
  );
};

export default AppLayout;
