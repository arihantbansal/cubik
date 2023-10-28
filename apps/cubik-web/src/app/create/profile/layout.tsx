'use client';

import React from 'react';
import { AuthConnectWallet } from '@/app/components/common/wallet/AuthConnectWallet';
import { Box } from '@/utils/chakra';
import { useWallet } from '@solana/wallet-adapter-react';

interface Props {
  children: React.JSX.Element | React.JSX.Element[];
}
const ProfileLayout = ({ children }: Props) => {
  const { connected } = useWallet();
  return (
    <>
      {connected ? (
        <Box mt={20}>{children}</Box>
      ) : (
        <Box mt={20}>
          <AuthConnectWallet />
          {/* // update to wallet connet button UI */}
        </Box>
      )}
    </>
  );
};

export default ProfileLayout;
