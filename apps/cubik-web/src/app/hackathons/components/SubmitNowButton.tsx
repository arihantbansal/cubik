"use client";
import React from "react";
import { SubmitNowModal } from "./SubmitNowModal";
import { Button, useDisclosure } from "@/utils/chakra";
import { useUser } from "@/app/context/user";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

interface Props {
  name: string;
  id: string;
  shortDescription: string;
  logo: string;
  tracks: {
    value: string;
    label: string;
  }[];
}
export const SubmitNowButton = ({
  id,
  name,
  shortDescription,
  logo,
  tracks,
}: Props) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { user } = useUser();
  const { setVisible } = useWalletModal();

  if (!user)
    return (
      <>
        <Button w="full" onClick={() => setVisible(true)}>
          Connect Wallet
        </Button>
      </>
    );

  return (
    <>
      <Button onClick={onOpen} variant={"cubikFilled"} w="full">
        Submit
      </Button>
      <SubmitNowModal
        hackathonDescription={shortDescription as string}
        hackathonId={id}
        hackathonLogo={logo}
        hackathonName={name}
        hackathonTracks={tracks}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};
