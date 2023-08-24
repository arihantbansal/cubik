"use client";
import { SOL, USDC } from "@/app/components/common/tags/TokenTags";
import Username from "@/app/components/common/username";
import { TruncatedAddr } from "@/app/components/common/wallet";
import { Avatar, Box, Center, HStack, Td, Tr, VStack } from "@/utils/chakra";
import { formatNumberWithK } from "@/utils/helpers/formatNumberWithK";
import { timeSince } from "@/utils/helpers/timeSince";
import { fullTokenList } from "@/utils/helpers/tokenlist";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
  avatar: string;
  username: string;
  walletAddress: string;
  amount: number;
  timestamp: Date;
  token: string;
  usd: number;
};

export const ContributorRow: React.FC<Props> = (props) => {
  const router = useRouter();
  return (
    <Tr
      w={"full"}
      onClick={() => {
        router.push(`/${props?.username}`);
      }}
      cursor="pointer"
      _hover={{ backgroundColor: "#0C0D0D" }}
    >
      <Td p="18px">
        <HStack align={"start"} gap={{ base: "8px", md: "16px" }}>
          <Avatar
            width={{ base: "36px", md: "44px" }}
            height={{ base: "36px", md: "44px" }}
            src={props.avatar}
          />
          <VStack
            align={"start"}
            justify="center"
            spacing={{ base: "8px", md: "8px" }}
          >
            <Username isLoading={false} username={props?.username} size="sm" />
            <Box
              as="p"
              textStyle={{ base: "body6", md: "body5" }}
              color="neutral.7"
            >
              {TruncatedAddr({
                walletAddress: props.walletAddress,
              })}
            </Box>
          </VStack>
        </HStack>
      </Td>
      <Td p="18px">
        <HStack gap="8px" align={"center"}>
          <Center>
            {fullTokenList.find(
              (e) => e.name.includes("Solana") && e.address === props.token
            ) && <SOL size={"32px"} />}
            {fullTokenList.find(
              (e) => e.name.includes("USDC") && e.address === props.token
            ) && <USDC size={"32px"} />}
          </Center>
          <VStack justify={"center"} spacing="2px" align={"start"}>
            <HStack align={"baseline"} color="white">
              <Box as="p" textStyle={{ base: "title5", md: "title4" }}>
                {formatNumberWithK(props.amount)}
              </Box>
              <Box as="p" textStyle={{ base: "title6", md: "title7" }}>
                {fullTokenList.find((e) => e.address === props.token)?.name}
              </Box>
            </HStack>

            <Box
              as="p"
              color="neutral.8"
              textStyle={{ base: "body6", md: "body5" }}
            >
              ${formatNumberWithK(props.usd)}
            </Box>
          </VStack>
        </HStack>
      </Td>
      <Td p="18px">
        <Box
          as="p"
          textStyle={{ base: "body5", md: "body4" }}
          color="neutral.11"
        >
          {timeSince(new Date(props.timestamp))}
        </Box>
      </Td>
      <Td p="18px">{/* <BiChevronRight size="24" /> */}</Td>
    </Tr>
  );
};
