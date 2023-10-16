"use client";
import { Button } from "@cubik/ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useEffect } from "react";
export default function Home() {
  const { setVisible } = useWalletModal();
  const { publicKey } = useWallet();

  useEffect(() => {
    const handleLogin = () => {
      try {
        if (publicKey) {
        } else {
          throw new Error("Pubkey not found");
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleLogin();
  }, []);

  return (
    <>
      <Button onClick={() => setVisible(true)} variant={"link"}>
        {publicKey ? publicKey.toBase58() : "Connect"}
      </Button>
    </>
  );
}
