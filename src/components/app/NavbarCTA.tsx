import { Center, HStack, Skeleton, Spinner } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { trpc } from '~/utils/trpc';
import MemoizedIconButtonBadge from './list/ListButton';
import UserNavMenu from './navbar-menu/UserNavMenu';

export interface UserContextProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  status: string;
}

const NavbarCTA = () => {
  const [currentPath, setCurrentPath] = useState('');
  const { publicKey, disconnect, connected, disconnecting } = useWallet();
  const { status } = useSession();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  useEffect(() => {
    const fetch = async () => {
      try {
        if (connected && publicKey && !disconnecting) {
          const { data, status } = await axios.post('/api/me/id', {
            publicKey: publicKey.toBase58(),
          });

          if (status === 200 || status === 201) {
            return localStorage.setItem('anon_id', data.data.id);
          }
        }
      } catch (error) {
        console.log(error);
        return null;
      }
    };
    fetch();
  }, [connected, publicKey]);

  // If on create-profile page, don't show anything
  if (currentPath === '/create-profile') {
    return null;
  }

  // Based on status, render appropriate component
  if (status === 'loading') {
    return (
      <Skeleton
        isLoaded
        fadeDuration={1}
        startColor="#121219"
        endColor="#37383E"
      />
    );
  }

  if (status === 'authenticated' && publicKey) {
    return (
      <HStack gap={{ base: '2px', md: '16px' }}>
        <MemoizedIconButtonBadge />
        <UserNavMenu />
      </HStack>
    );
  }

  // Default case
  return publicKey ? (
    <Center as="button" onClick={disconnect}>
      <Spinner size="sm" color="teal" />
    </Center>
  ) : (
    <Center>
      <WalletMultiButton>Connect Wallet</WalletMultiButton>
    </Center>
  );
};

export default NavbarCTA;
