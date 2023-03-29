import { Button, Container, Skeleton, useDisclosure } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect } from 'react';
import { useAsPath } from '~/store/pathStore';
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
  const { prevAsPath } = useAsPath();

  async function auth() {
    if (!publicKey) return;
    const signInResponse = await signIn('credentials', {
      callbackUrl: '',
      redirect: false,
      wallet: publicKey.toBase58(),
    });
    if (signInResponse?.status === 401) {
      router.push('/create-profile');
      return onClose();
    }
    if (prevAsPath) {
      return router.push(prevAsPath);
    }
    if (session) {
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
  const { publicKey } = useWallet();
  const { status } = useSession();

  useEffect(() => {
    if (publicKey && status === 'authenticated') {
      onClose();
    }
  }, [onClose, publicKey, status]);

  const NavbarCTA = () => {
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
        return (
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
