'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import dynamic from 'next/dynamic';

const WalletMultiButton = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false },
);
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
