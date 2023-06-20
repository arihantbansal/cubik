import { Center, HStack, Skeleton, Spinner } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUserStore } from '~/store/userStore';
import ComponentErrors from '../errors/ComponenetErrors';
import UserNavMenu from './navbar-menu/UserNavMenu';

export interface UserContextProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  status: string;
}

const NavbarCTA = () => {
  const [currentPath, setCurrentPath] = useState('');
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setUser } = useUserStore();
  const { publicKey, disconnect, connected, disconnecting, connecting } =
    useWallet();
  const router = useRouter();

  useEffect(() => {
    setCurrentPath(router.pathname);
  }, [router.pathname]);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        if (connected && publicKey && !disconnecting) {
          const { data, status } = await axios.post('/api/me/id', {
            publicKey: publicKey.toBase58(),
          });

          if (status === 200) {
            localStorage.setItem('anon_id', data.data.id);

            if (localStorage.getItem('wallet_auth')) {
              const { data: user, status } = await axios.post('/api/me', {
                id: data.data.id,
              });
              setUser(user);
            }
            setIsLoading(false);
            return;
          }
          if (status === 201) {
            localStorage.setItem('anon_id', data.data.id);
            localStorage.removeItem('wallet_auth');
            router.push('/create-profile');
            setIsLoading(false);
            return;
          }
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setError(true);
        return null;
      }
    };
    fetch();
  }, [connected, publicKey]);

  // If on create-profile page, don't show anything
  if (currentPath === '/create-profile') {
    return null;
  }
  if (error) return <ComponentErrors />;

  if (connecting && !publicKey) {
    return (
      <Skeleton
        isLoaded
        fadeDuration={1}
        startColor="#121219"
        endColor="#37383E"
      />
    );
  }

  if (connected && publicKey) {
    return (
      <HStack gap={{ base: '2px', md: '16px' }}>
        {/* <MemoizedIconButtonBadge /> */}
        <UserNavMenu />
      </HStack>
    );
  }

  // Default case
  return publicKey && !isLoading ? (
    <Center
      as="button"
      onClick={() => {
        disconnect();
        setUser(null);
        localStorage.removeItem('anon_sig');
        localStorage.removeItem('wallet_auth');
      }}
    >
      <Spinner size="sm" color="teal" />
    </Center>
  ) : (
    <Center>
      <WalletMultiButton>Connect Wallet</WalletMultiButton>
    </Center>
  );
};

export default NavbarCTA;
