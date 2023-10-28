import React from 'react';
import { Button, Container, Text } from '@/utils/chakra';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

export const AuthConnectWallet = () => {
  const { setVisible } = useWalletModal();
  return (
    <>
      <Container
        maxW={'7xl'}
        w="full"
        h={'80vh'}
        my={10}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'column'}
        gap={5}
      >
        <Text>Connect your wallet to get started</Text>
        <Button onClick={() => setVisible(true)} variant={'cubikFilled'}>
          Connect Wallet
        </Button>
      </Container>
    </>
  );
};
