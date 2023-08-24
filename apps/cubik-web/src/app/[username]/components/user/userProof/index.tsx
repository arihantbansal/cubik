import { Box, HStack, VStack } from "@/utils/chakra";
import React from "react";
import { ProofHandler } from "./ProofHandler";
import { ProofWrapper } from "./ProofWrapper";
import { prisma } from "@cubik/database";
interface Props {
  username: string;
}

const getProofs = async (username: string) => {
  try {
    const res = await prisma.proof.findMany({
      where: {
        user: {
          username: username,
        },
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const UserProof = async ({ username }: Props) => {
  const proofs = await getProofs(username);
  return (
    <>
      <VStack align="start" gap={4} w="full">
        <ProofWrapper proofs={proofs} username={username} />
      </VStack>
    </>
  );
};
