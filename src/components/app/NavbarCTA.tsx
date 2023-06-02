import { Center, HStack, Skeleton, Spinner } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
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
  const { publicKey, disconnect, connected } = useWallet();
  const { status } = useSession();
  trpc.user.getMe.useQuery(
    {
      connected: connected,
      wallet: publicKey?.toBase58() ?? '',
    },
    {
      retry(failureCount) {
        return failureCount > 3;
      },
      refetchIntervalInBackground: true, // Refetch data even if window is not focused

      refetchInterval: 5000,
    }
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);

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
