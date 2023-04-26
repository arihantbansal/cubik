import { Center, HStack, Skeleton, Spinner } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { WalletAddress } from '../common/wallet/WalletAdd';
import IconButtonBadge from './ListButton';
import UserNavMenu from './navbar-menu/UserNavMenu';

const NavbarCTA: FC = () => {
  const { publicKey, disconnect } = useWallet();
  const router = useRouter();
  const { status } = useSession();

  let CTA;

  switch (status) {
    case 'loading':
      CTA = (
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
      break;
    case 'authenticated':
      CTA = (
        <HStack gap={{ base: '2px', md: '16px' }}>
          <>
            <IconButtonBadge />
            <UserNavMenu />
          </>
        </HStack>
      );
      break;
    default:
      CTA = publicKey ? (
        <Center
          as="button"
          onClick={disconnect}
          w={{ base: '4rem', md: '6rem' }}
        >
          {router.pathname === '/create-profile' ? '' : <Spinner size="sm" />}
        </Center>
      ) : (
        <Center w="10rem">
          <WalletMultiButton />
        </Center>
      );
  }

  return <>{CTA}</>;
};

export default NavbarCTA;
