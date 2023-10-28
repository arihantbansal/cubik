import React from 'react';
import { Wrap } from '@chakra-ui/react';

import type { Proof } from '@cubik/database';

import { CubikVerifiedProject } from './CubikVerifiedProject';
import { GithubProof } from './GithubProof';
import { SuperteamProof } from './SuperteamProof';

interface Props {
  username: string;
  proofs: Proof[];
}
export const ProofHandler = ({ username, proofs }: Props) => {
  return (
    <>
      <Wrap gap={5}>
        <GithubProof proofs={proofs} username={username} />
        <SuperteamProof proofs={proofs} username={username} />
        <CubikVerifiedProject proofs={proofs} username={username} />
      </Wrap>
    </>
  );
};
