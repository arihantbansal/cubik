'use client';

import React from 'react';
import { useUser } from '@/app/context/user';
import { Button, useDisclosure } from '@/utils/chakra';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

import { SubmitNowModal } from './SubmitNowModal';

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
  const { isOpen, onClose } = useDisclosure();
  const { user } = useUser();
  const { setVisible } = useWalletModal();

  if (!user)
    return (
      <>
        <Button w="full" onClick={() => setVisible(true)}>
          Submit Project
        </Button>
      </>
    );

  return (
    <>
      <Button
        isDisabled
        disabled
        onClick={() => {}}
        variant={'cubikFilled'}
        w="full"
      >
        Submit Project
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
