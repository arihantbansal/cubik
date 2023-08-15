"use client";
import { Box } from "@/utils/chakra";
import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { AuthConnectWallet } from "@/app/components/common/wallet/AuthConnectWallet";

interface Props {
  children: React.JSX.Element | React.JSX.Element[];
}
const ProfileLayout = ({ children }: Props) => {
  const { publicKey, connected } = useWallet();
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

export default ProfileLayout;
