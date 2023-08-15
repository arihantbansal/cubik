"use client";
import { AuthConnectWallet } from "@/app/components/common/wallet/AuthConnectWallet";
import { Box } from "@/utils/chakra";
import { useWallet } from "@solana/wallet-adapter-react";
import React from "react";

interface Props {
  children: React.JSX.Element | React.JSX.Element[];
}
const Layout = ({ children }: Props) => {
  const { connected } = useWallet();
  return (
    <>
      {connected ? (
        <Box mt={10}>{children}</Box>
      ) : (
        <Box mt={20}>
          <AuthConnectWallet />
          {/* // update to wallet connet button UI */}
        </Box>
      )}
    </>
  );
};

export default Layout;
