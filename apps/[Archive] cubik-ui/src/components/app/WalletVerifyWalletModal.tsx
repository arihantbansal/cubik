// NavbarCTA.tsx
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Center,
  HStack,
  keyframes,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
  VStack,
} from "@chakra-ui/react";
import * as anchor from "@coral-xyz/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthStore } from "~/store/authStore";
import { createMessage } from "~/utils/getsignMessage";
import { FailureToast, SuccessToast } from "../common/toasts/Toasts";
import { WalletAddress } from "../common/wallet/WalletAdd";

import { UserModel } from "@cubik/database";
import axios from "axios";
import { useUserStore } from "~/store/userStore";

const scaleIn = keyframes`
0% {
  transform: scale(0);
}
100% {
  transform: scale(1);
}
`;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const WalletVerifyModal = ({ isOpen, onClose }: Props) => {
  const toast = useToast();
  const { setAuthenticated } = useAuthStore();
  const [verifying, setVerifying] = useState(false);
  const { setUser } = useUserStore();
  const [verified, setVerified] = useState(false);
  const { publicKey, disconnect, signMessage } = useWallet();
  const [verifyWalletError, setVerifyWalletError] = useState<string | null>(
    null
  );
  const router = useRouter();

  const VerifyWallet = async () => {
    if (!publicKey && !signMessage) return;

    try {
      setVerifying(true);

      const msg = await createMessage();
      const sig = await signMessage!(msg);
      localStorage.setItem("anon_sig", anchor.utils.bytes.bs58.encode(sig));
      const { data, status } = await axios.post("/api/me/login", {
        id: localStorage.getItem("anon_id"),
        signature: anchor.utils.bytes.bs58.encode(sig),
      });

      if (status === 204) {
        router.push("/create-profile");
        setVerifying(false);
        onClose();
        return null;
      }

      localStorage.setItem("wallet_auth", data.data.access_token);
      setUser(data.data.user as UserModel);

      setAuthenticated(true);
      setVerified(true);
      setVerifying(false);
      setAuthenticated(true);
      onClose();
      SuccessToast({ toast, message: "Wallet Verified" });
    } catch (error) {
      if ((error as Error).message === "User rejected the request.") {
        setVerifying(false);
        setVerifyWalletError(`Error: ${(error as Error).message}`);
        throw error;
      }
    }
  };

  return publicKey ? (
    <Modal
      variant="cubik"
      isOpen={isOpen}
      onClose={async () => {
        await disconnect();
        localStorage.removeItem("anon_sig");
        localStorage.removeItem("wallet_auth");
        setUser(null);
        onClose();
        FailureToast({
          toast,
          message: "Wallet Verification Failed",
        });
        localStorage.removeItem("walletName");
      }}
    >
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
                <WalletAddress
                  size="xs"
                  walletAddress={publicKey?.toBase58()}
                />
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
            {verifyWalletError && (
              <Alert status="error" variant="cubik">
                <AlertIcon />
                <AlertDescription
                  fontSize={{ base: "10px", md: "11px", xl: "12px" }}
                  lineHeight={{ base: "14px", md: "14px", xl: "16px" }}
                >
                  {verifyWalletError}
                </AlertDescription>
              </Alert>
            )}
          </VStack>
        </ModalBody>

        <ModalFooter display="flex" justifyContent="space-between">
          <Button
            variant={"cubikOutlined"}
            onClick={async () => {
              await disconnect();
              localStorage.removeItem("anon_sig");
              localStorage.removeItem("wallet_auth");
              setUser(null);
              onClose();
              FailureToast({
                toast,
                message: "Wallet Verification Failed",
              });
              localStorage.removeItem("walletName");
            }}
          >
            Cancel
          </Button>

          <Button
            variant={"cubikFilled"}
            loadingText="Verifying"
            onClick={VerifyWallet}
            isLoading={verifying}
          >
            {verified ? "Verified" : "Verify Wallet"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ) : (
    <></>
  );
};

export default WalletVerifyModal;
