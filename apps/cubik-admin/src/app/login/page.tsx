"use client";
import { Button, VStack } from "@/utils/chakra";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import React from "react";
const LoginPage = () => {
  const { publicKey } = useWallet();
  const { setVisible } = useWalletModal();
  return (
    <>
      <VStack
        h={"100vh"}
        width={"100%"}
        display={"flex"}
        justify={"center"}
        align={"center"}
      >
        <Button onClick={() => setVisible(true)} variant={"cubikFilled"}>
          Connect Wallet
        </Button>
      </VStack>
    </>
  );
};

export default LoginPage;
