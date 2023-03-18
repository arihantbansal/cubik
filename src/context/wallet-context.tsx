import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import {
  BackpackWalletAdapter,
  CoinbaseWalletAdapter,
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TokenaryWalletAdapter,
  TorusWalletAdapter,
  UnsafeBurnerWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import type { FC, ReactNode } from 'react';
import { useMemo } from 'react';

const WalletContext: FC<{ children: ReactNode }> = ({ children }) => {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(
    () => [
      new BackpackWalletAdapter(),
      new CoinbaseWalletAdapter(),
      new GlowWalletAdapter(),
      new PhantomWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter(),
      new SolletExtensionWalletAdapter(),
      new SolletWalletAdapter(),
      new TorusWalletAdapter(),
      new TokenaryWalletAdapter(),
      new UnsafeBurnerWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={true}>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default WalletContext;
