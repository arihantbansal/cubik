"use client";
import type { NextPage } from "next";
import LandingPage from "@/app/components/landing-page/landingPage";
import { useUser } from "@/app/context/user";

import dynamic from 'next/dynamic';

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

