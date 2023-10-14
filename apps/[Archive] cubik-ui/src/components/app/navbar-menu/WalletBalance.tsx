import { HStack, VStack } from "@chakra-ui/layout";
import { Box, Skeleton } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import axios from "axios";
import { useQuery } from "react-query";
import ComponentErrors from "~/components/errors/ComponentErrors";
import { env } from "~/env.mjs";
import useCurrentTokenPrice from "~/hooks/useCurrentTokenPrice";
import { useUserStore } from "~/store/userStore";
import { formatNumberWithK } from "~/utils/formatWithK";
import { BONK, SOL, USDC } from "../../common/tokens/token";

type TokenInfo = {
  tokenAccount: string;
  mint: string;
  amount: number;
  decimals: number;
};

const filterTokens = (tokens: TokenInfo[]) => {
  const tokenAddressesToFilter = [
    "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", //usdc
    "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263", //bonk
    // Add more token addresses here if needed
  ];

  // filter all the tokens which contains tokenAccount of the array
  return tokens.filter((token) => {
    // if the tokenAccount is not in the array, return true
    return tokenAddressesToFilter.includes(token.mint);
  });
};

const getBalances = async (address: string) => {
  const { data } = await axios.get(
    `https://api.helius.xyz/v0/addresses/${address}/balances?api-key=${env.NEXT_PUBLIC_HELIUS_API_KEY}`
  );
  return data;
};

const WalletBalance = ({
  size,
  walletAddress,
}: {
  size?: "sm" | "md" | "lg" | string;
  walletAddress?: string;
}) => {
  const {
    data: price,
    isLoading: priceLoading,
    error: priceError,
  } = useCurrentTokenPrice(["solana"]);

  const { user } = useUserStore();
  const { publicKey } = useWallet();

  const {
    isLoading,
    error: balanceFetchingError,
    data,
  } = useQuery(
    ["balances", walletAddress],
    () =>
      getBalances(
        walletAddress
          ? (walletAddress as string)
          : (publicKey?.toBase58() as string)
      ),
    {
      staleTime: 3 * 60 * 1000,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  if (!user?.id) return <>no user</>;
  if (!data) {
    if (isLoading) return <Skeleton w="full" height="4rem" />;
    return <ComponentErrors />;
  }
  if (balanceFetchingError || priceError) {
    return <ComponentErrors />;
  }

  const filteredData = filterTokens(data.tokens);
  const handleSolPriceCal = (): number => {
    if (data.nativeBalance / LAMPORTS_PER_SOL === 0) return 0;

    if (data.nativeBalance / LAMPORTS_PER_SOL < 0.01) {
      return 0.01 * price?.find((p) => p.token === "Sol")?.price! ?? 0;
    }

    return (
      (data.nativeBalance / LAMPORTS_PER_SOL) *
      price?.find((p) => p.token === "Sol")?.price!
    );
  };
  return (
    <VStack
      gap={
        size
          ? size === "sm"
            ? { base: "2px", md: "4px" }
            : size === "md"
            ? { base: "6px", md: "10px" }
            : { base: "8px", md: "12px" }
          : { base: "2px", md: "2px" }
      }
      px="8px"
      w="full"
    >
      <Box
        display={size === "lg" ? "none" : "block"}
        w="full"
        as="p"
        textStyle={"body5"}
        color="neutral.8"
        p="8px 2px"
      >
        Wallet Balance
      </Box>
      {data && (
        <Skeleton w="full" fadeDuration={2.6} isLoaded={!priceLoading}>
          <HStack p="0px 2px" gap="8px" w="full">
            <SOL
              size={
                size
                  ? size === "sm"
                    ? { base: "18px", md: "20px" }
                    : size === "md"
                    ? { base: "24px", md: "30px" }
                    : { base: "28px", md: "38px" }
                  : { base: "18px", md: "20px" }
              }
            />
            <Box
              as="p"
              textStyle={
                size
                  ? size === "md"
                    ? { base: "body4", md: "body3" }
                    : { base: "body3", md: "body2" }
                  : { base: "body5", md: "body4" }
              }
              color="neutral.11"
            >
              SOL
            </Box>
            <HStack alignItems={"end"} justify={"end"} w="full">
              <Skeleton isLoaded={!priceLoading}>
                <Box
                  display={size === "lg" ? "block" : "none"}
                  textAlign={"end"}
                  as="p"
                  textStyle={
                    size
                      ? size === "md"
                        ? { base: "body5", md: "body4" }
                        : { base: "body4", md: "body3" }
                      : { base: "body5", md: "body4" }
                  }
                  color="neutral.7"
                >
                  ${handleSolPriceCal()}
                </Box>
              </Skeleton>
              <Skeleton isLoaded={!priceLoading}>
                <Box
                  textAlign={"end"}
                  as="p"
                  textStyle={
                    size
                      ? size === "md"
                        ? { base: "title4", md: "title3" }
                        : { base: "title3", md: "title2" }
                      : { base: "title6", md: "title5" }
                  }
                  color="neutral.11"
                >
                  {data.nativeBalance / LAMPORTS_PER_SOL === 0
                    ? 0
                    : data.nativeBalance / LAMPORTS_PER_SOL < 0.01
                    ? (data.nativeBalance / LAMPORTS_PER_SOL).toFixed(4)
                    : (data.nativeBalance / LAMPORTS_PER_SOL).toFixed(1)}
                </Box>
              </Skeleton>
            </HStack>
          </HStack>
        </Skeleton>
      )}
      {filteredData?.map((token) => {
        const tokenBalance = token.amount / 10 ** token.decimals;
        return token.mint == "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" ? (
          <HStack p="0px 2px" gap="8px" w="full" key={token.tokenAccount}>
            <USDC
              size={
                size
                  ? size === "sm"
                    ? { base: "18px", md: "20px" }
                    : size === "md"
                    ? { base: "24px", md: "30px" }
                    : { base: "28px", md: "38px" }
                  : { base: "18px", md: "20px" }
              }
            />
            <Box
              as="p"
              textStyle={
                size
                  ? size === "md"
                    ? { base: "body4", md: "body3" }
                    : { base: "body3", md: "body2" }
                  : { base: "body5", md: "body4" }
              }
              color="neutral.11"
            >
              USDC
            </Box>
            <HStack alignItems={"end"} justify={"end"} w="full">
              <Skeleton isLoaded={!priceLoading}>
                <Box
                  display={size === "lg" ? "block" : "none"}
                  textAlign={"end"}
                  as="p"
                  textStyle={
                    size
                      ? size === "md"
                        ? { base: "body5", md: "body4" }
                        : { base: "body4", md: "body3" }
                      : { base: "body5", md: "body4" }
                  }
                  color="neutral.7"
                >
                  $
                  {tokenBalance === 0
                    ? 0
                    : tokenBalance < 0.01
                    ? tokenBalance.toFixed(4)
                    : formatNumberWithK(+tokenBalance.toFixed(1))}
                </Box>
              </Skeleton>
              <Skeleton isLoaded={!priceLoading}>
                <Box
                  textAlign={"end"}
                  as="p"
                  textStyle={
                    size
                      ? size === "md"
                        ? { base: "title4", md: "title3" }
                        : { base: "title3", md: "title2" }
                      : { base: "title6", md: "title5" }
                  }
                  color="neutral.11"
                >
                  {tokenBalance === 0
                    ? 0
                    : tokenBalance < 0.01
                    ? tokenBalance.toFixed(4)
                    : formatNumberWithK(+tokenBalance.toFixed(1))}
                </Box>
              </Skeleton>
            </HStack>
          </HStack>
        ) : null;
      })}
    </VStack>
  );
};

export default WalletBalance;
