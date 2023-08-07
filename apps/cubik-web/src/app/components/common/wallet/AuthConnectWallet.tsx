import { Button, Container } from "@/utils/chakra";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import React from "react";

export const AuthConnectWallet = () => {
  const { setVisible } = useWalletModal();
  return (
    <>
      <Container maxW={"7xl"}>
        <Button onClick={() => setVisible(true)}>Connect Wallet</Button>
      </Container>
    </>
  );
};
