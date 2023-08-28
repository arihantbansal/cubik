"use client";
import { Center, Text } from "@/utils/chakra";
import Sidebar from "./sidebar";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import ConnectWallet from "./connect-wallet";
import VerifyWallet from "./verify-wallet";
import { setCookie, deleteCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import { useUser } from "@/app/context/user";
import UserNavbarMenuButton from "./user-navbar-menu";

export interface User {
  username: string;
  profilePicture: string;
  mainWallet: string;
}

const CTA = () => {
  const { user } = useUser();

  const path = usePathname();
  const isCreateProfilePage = path === "/create/profile";

  return (
    <Center
      h={{ base: "2rem", md: "2.6rem" }}
      justifyContent="flex-end"
      alignItems="end"
      w="max"
      zIndex="99"
    >
      <Center w="fit-content">
        {!isCreateProfilePage && (
          <>{!user ? <ConnectWallet /> : <UserNavbarMenuButton />} </>
        )}
      </Center>
      <Sidebar />
    </Center>
  );
};

export default CTA;
