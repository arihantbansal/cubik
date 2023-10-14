import { PublicKey } from "@metaplex-foundation/js";
import { useQuery } from "react-query";
import { metaplexGetByOwner } from "~/utils/metaplexGetByOwner";

export function useMetaplexGetByOwner(publicKey: PublicKey | null) {
  return useQuery(
    ["metaplexGetByOwner", publicKey],
    () => metaplexGetByOwner(publicKey),
    {
      enabled: !!publicKey,
    }
  );
}
