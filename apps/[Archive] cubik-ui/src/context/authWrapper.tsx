import { useDisclosure } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import jwt from "jsonwebtoken";
import { useEffect } from "react";
import WalletVerifyModal from "~/components/app/WalletVerifyWalletModal";
import { verifyMessage } from "~/utils/getsignMessage";

interface SignatureData {
  signature: string;
  wallet: string;
}

interface Props {
  children: React.ReactNode;
}

export const AuthWrapper: React.FC<Props> = ({ children }) => {
  const { publicKey, connected } = useWallet();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const checkAndVerifySignature = async () => {
    if (!publicKey || !connected) {
      return;
    }

    // check the jwt for expire or wallet address
    if (localStorage.getItem("wallet_auth")) {
      const walletAuth = localStorage.getItem("wallet_auth") as string;

      const payload = jwt.decode(walletAuth) as jwt.JwtPayload;
      if (
        payload.wallet !== publicKey.toBase58() ||
        payload.exp! * 1000 < Date.now()
      ) {
        onOpen();
        return;
      }
      return null;
    }

    if (!localStorage.getItem("anon_sig")) {
      onOpen();
    }
    if (localStorage.getItem("anon_sig")) {
      const sigCheck = await verifyMessage(
        localStorage.getItem("anon_sig") as string,
        publicKey
      );
      if (!sigCheck) {
        onOpen();
      }
    }
  };
  useEffect(() => {
    checkAndVerifySignature();
  }, [publicKey]);

  return (
    <>
      {children}
      <WalletVerifyModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
