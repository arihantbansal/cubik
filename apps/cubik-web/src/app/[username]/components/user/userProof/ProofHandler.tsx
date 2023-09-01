import { Wrap } from "@chakra-ui/react";
import React from "react";
import { GithubProof } from "./GithubProof";
import type { Proof } from "@cubik/database";
import { SuperteamProof } from "./SuperteamProof";
import { CubikVerifiedProject } from "./CubikVerifiedProject";

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
