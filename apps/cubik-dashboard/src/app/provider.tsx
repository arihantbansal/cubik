"use client";
import React, { useMemo, useState } from "react";
import { web3 } from "@coral-xyz/anchor";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

interface Props {
  children: React.JSX.Element;
}
export const Provider = ({ children }: Props) => {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => web3.clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [], []);
  const [client] = useState(() => new QueryClient());

  return (
    <>
      <QueryClientProvider client={client}>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect={true}>
            <WalletModalProvider>{children}</WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </QueryClientProvider>
    </>
  );
};
