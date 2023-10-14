import { Tag } from "@chakra-ui/tag";

export enum PROOF_STATE {
  CLAIM = "claim",
  MINT = "mint",
  MINTED = "minted",
  NOT_CLAIMABLE = "not_claimable",
}

const ProofsTags = ({ state }: { state: PROOF_STATE }) => {
  return (
    <Tag
      size={{ base: "xs", md: "sm" }}
      px="12px"
      py="4px"
      color={
        PROOF_STATE.MINTED
          ? "surface.green.2"
          : PROOF_STATE.MINT
          ? "surface.yellow.2"
          : "surface.red.2"
      }
      background={
        PROOF_STATE.MINTED
          ? "surface.green.3"
          : PROOF_STATE.MINT
          ? "surface.yellow.3"
          : "surface.red.3"
      }
      rounded="full"
      fontSize={{ base: "10px", sm: "12px", md: "14px" }}
    >
      {PROOF_STATE.MINTED
        ? "Minted"
        : PROOF_STATE.MINT
        ? "Mint"
        : "Can’t Claim"}
    </Tag>
  );
};

export default ProofsTags;
