"use client";
import { WalletAddress } from "@/app/components/common/wallet";
import type { User } from "@/app/context/user";
import type { AuthVerifyReturn } from "@/types/auth";
import {
  Box,
  Button,
  Center,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@/utils/chakra";
import { decodeToken } from "@/utils/helpers/auth";
import { createMessage } from "@/utils/helpers/getSignatureMessage";
import { utils } from "@coral-xyz/anchor";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import React, { useState } from "react";

interface Props {
  publicKey?: string;
  disconnect: () => void;
  isOpen: boolean;
  onClose: () => void;
  status: "NEW_USER" | "EXISTING_USER";
  signMessage: ((message: Uint8Array) => Promise<Uint8Array>) | undefined;
  router: AppRouterInstance;
  setUser: (userData: User | null) => void;
}
export const VerifyModal = ({
  disconnect,
  isOpen,
  onClose,
  publicKey,
  signMessage,
  status,
  router,
  setUser,
}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleVerify = async () => {
    setIsLoading(true);
    if (status === "EXISTING_USER") {
      const nonce = Math.random().toString(36).substring(2, 15);
      const msg = await createMessage(nonce);
      const sig = utils.bytes.bs58.encode(await signMessage!(msg));

      const verifyRes = await fetch("/api/auth/verify", {
        method: "POST",
        body: JSON.stringify({
          signature: sig,
          publicKey: publicKey,
          nonce: nonce,
        }),
        cache: "no-cache",
      });

      const verifyResponse = (await verifyRes.json()) as AuthVerifyReturn;
      if (verifyResponse.data) {
        const token = verifyResponse.accessToken;

        if (!token) {
          disconnect();
          return onClose();
        }

        const user = await decodeToken(token);
        if (user) {
          setUser({
            id: user.id,
            mainWallet: user.mainWallet,
            profilePicture: user.profilePicture,
            username: user.username,
          });
        }
      } else {
        disconnect();
        onClose();
      }
      setIsLoading(false);
    } else {
      const nonce = Math.random().toString(36).substring(2, 15);
      const msg = await createMessage(nonce);
      const sig = utils.bytes.bs58.encode(await signMessage!(msg));
      localStorage.setItem("wallet_sig", sig);
      localStorage.setItem("wallet_nonce", nonce);

      router.push("/create/profile");
      onClose();
    }
  };
  return (
    <Modal variant="cubik" isOpen={isOpen} onClose={async () => {}}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack>
            <Box
              as="p"
              textStyle={{ base: "title3", md: "title2" }}
              color="neutral.11"
            >
              Verify Wallet
            </Box>
            {publicKey && (
              <Center
                backgroundColor={"neutral.5"}
                p={{ base: "6px 10px", md: "8px 12px" }}
                rounded="8px"
              >
                <WalletAddress size="xs" walletAddress={publicKey} />
              </Center>
            )}
          </HStack>
        </ModalHeader>
        <ModalBody>
          <VStack pt="16px" align={"start"} gap="16px">
            <Box
              as="p"
              textStyle={{ base: "body5", md: "body3" }}
              color="white"
            >
              Verify Wallet to prove ownership. No SOL will be charged
            </Box>{" "}
            {/* {verifyWalletError && (
              <Alert status="error" variant="cubik">
                <AlertIcon />
                <AlertDescription
                  fontSize={{ base: "10px", md: "11px", xl: "12px" }}
                  lineHeight={{ base: "14px", md: "14px", xl: "16px" }}
                >
                  {verifyWalletError}
                </AlertDescription>
              </Alert>
            )} */}
          </VStack>
        </ModalBody>

        <ModalFooter display="flex" justifyContent="space-between">
          <Button
            variant={"cubikOutlined"}
            onClick={async () => {
              await disconnect();
              onClose();
            }}
          >
            Cancel
          </Button>

          <Button
            variant={"cubikFilled"}
            loadingText="Verifying"
            isLoading={isLoading}
            onClick={handleVerify}
          >
            {"Verify Wallet"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
