import { Box, HStack } from "@chakra-ui/react";
import { BiError } from "react-icons/bi";
import { useTokenBalance } from "~/hooks/useTokenBalance";
import { tokenGroup } from "~/interfaces/token";
import { useUserStore } from "~/store/userStore";

type WalletBalanceErrorProps = {
  selectedToken: tokenGroup;
};

export const WalletBalanceError = ({
  selectedToken,
}: WalletBalanceErrorProps) => {
  const { user } = useUserStore();
  const {
    data: balance,
    isError,
    error,
  } = useTokenBalance(
    selectedToken.mainNetAdd as string,
    user?.mainWallet as string
  );

  return isError || !balance ? (
    <HStack
      mt="8px"
      align={"center"}
      justify="center"
      spacing="8px"
      p="12px"
      rounded="8px"
      width="full"
      backgroundColor={"surface.red.3"}
    >
      <BiError size={18} color="#FFCAC2" />
      <Box as="p" color="surface.red.1" textStyle={"body4"}>
        {error?.message || "Insufficient wallet balance"}
      </Box>
    </HStack>
  ) : null;
};
