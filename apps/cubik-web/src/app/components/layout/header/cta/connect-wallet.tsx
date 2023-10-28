'use client';

import { Button } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

import VerifyWallet from './verify-wallet';

const ConnectWallet = () => {
  const { connected } = useWallet();
  const { setVisible } = useWalletModal();

  return (
    <>
      {!connected ? (
        <Button
          variant="cubikFilled"
          size={{ base: 'cubikMini', md: 'cubikSmall' }}
          onClick={() => setVisible(true)}
        >
          Connect Wallet
        </Button>
      ) : (
        <div>
          <VerifyWallet />
        </div>
      )}
    </>
  );
};

export default ConnectWallet;
