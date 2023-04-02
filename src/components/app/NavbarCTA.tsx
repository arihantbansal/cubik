import { Button, Center, Skeleton } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useSession } from 'next-auth/react';
import React, { FC, useMemo } from 'react';
import UserNavMenu from './UserNavMenu';

type NavbarCTAPropsType = {
  onOpen: () => void;
};
const NavbarCTA: FC<NavbarCTAPropsType> = ({ onOpen }: NavbarCTAPropsType) => {
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
        return <UserNavMenu />;
      default:
        return publicKey ? (
          <Center as="button" onClick={disconnect}></Center>
        ) : (
          <Button
            variant="connect_wallet"
            w="full"
            h="fit-content"
            onClick={onOpen}
          >
            Connect Wallet
          </Button>
        );
    }
  }, [status, publicKey, disconnect]);

  return <>{CTA}</>;
};

export default NavbarCTA;
