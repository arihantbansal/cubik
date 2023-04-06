import {
  Badge,
  Center,
  HStack,
  IconButton,
  Skeleton,
  useMediaQuery,
} from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useSession } from 'next-auth/react';
import { FC, useMemo } from 'react';
import { TiFlash } from 'react-icons/ti';
import useListStore from '~/store/listStore';
import UserNavMenu from './navbar-menu/UserNavMenu';

const NavbarCTA: FC = () => {
  const count = useListStore((state) => state.count);
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)', {
    ssr: true,
    fallback: false, // return false on the server, and re-evaluate on the client side
  });
  const { publicKey, disconnect } = useWallet();

  const { status } = useSession();

  const CTA = useMemo(() => {
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
        return (
          <HStack gap={{ base: '2px', md: '16px' }}>
            <>
              <IconButton
                variant="outline"
                color={'#A8F0E6'}
                border="1px solid"
                borderColor={{ base: 'transparent', md: '#A8F0E6' }}
                rounded="8px"
                borderRadius="8xp"
                aria-label="list"
                p={{ base: '6px', md: '6px' }}
                fontSize={{ base: '18px', md: '22px' }}
                icon={<TiFlash />}
              />
              {count > 0 && (
                <Badge
                  position={'absolute'}
                  transform={'translate(22px, -16px)'}
                  rounded="full"
                  backgroundColor={'#FFE53D'}
                  minW="1rem"
                  minH="1rem"
                  display={'flex'}
                  alignItems="center"
                  justifyContent={'center'}
                  colorScheme="green"
                >
                  {count}
                </Badge>
              )}
              <UserNavMenu />{' '}
            </>
          </HStack>
        );
      default:
        return publicKey ? (
          <Center as="button" onClick={disconnect}>
            Loading...
          </Center>
        ) : (
          <WalletMultiButton />
        );
    }
  }, [status, publicKey, disconnect]);

  return <>{CTA}</>;
};

export default NavbarCTA;
