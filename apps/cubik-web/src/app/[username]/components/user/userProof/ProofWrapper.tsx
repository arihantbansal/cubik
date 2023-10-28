'use client';

import React from 'react';
import { useUser } from '@/app/context/user';
import { Box, HStack } from '@/utils/chakra';

import type { Proof } from '@cubik/database';

import { ProofHandler } from './ProofHandler';

interface Props {
  username: string;
  proofs: Proof[];
}

export const ProofWrapper = ({ proofs, username }: Props) => {
  const { user } = useUser();

  if (!user || user.username !== username) return <></>;
  return (
    <>
      <HStack gap="8px">
        <Box
          as="p"
          textStyle={{ base: 'title4', md: 'title3' }}
          color="neutral.11"
        >
          Proofs
        </Box>
      </HStack>
      <ProofHandler proofs={proofs} username={username} />
    </>
  );
};
