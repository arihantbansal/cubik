"use client";
import type { NextPage } from "next";
import LandingPage from "@/app/components/landing-page/landingPage";
import { useUser } from "@/app/context/user";

import { useWallet } from '@solana/wallet-adapter-react';
import dynamic from 'next/dynamic';
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

const WalletMultiButton = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false },
);
export default function Home() {
    
  
  return (

    <>

      <LandingPage />
    </>
  );
};

