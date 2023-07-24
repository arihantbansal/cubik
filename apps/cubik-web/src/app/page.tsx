'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function Home() {
  const {} = useWallet();
  return (
    <>
      <div>
        <WalletMultiButton />
      </div>
    </>
  );
}
