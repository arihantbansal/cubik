import {
  Avatar,
  Box,
  Center,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { SOL } from "@metaplex-foundation/js";
import React from "react";
import { USDC } from "~/components/common/tokens/token";
import { TruncatedAddr } from "~/components/common/wallet/WalletAdd";
import { UserProof } from "~/types/user";
import { formatNumberWithK } from "~/utils/formatWithK";
import { trpc } from "~/utils/trpc";
import Username from "~/components/common/username/Username";
import { useRouter } from "next/router";
interface Props {
  id: string;
}
export const GrantDetailsLeaderboard = (props: Props) => {
  const { data, isError, isLoading } = trpc.round.leaderboard.useQuery({
    id: props.id,
  });
  const router = useRouter();
  return (
    <>
      <TableContainer w="full">
        <Table
          bg={""}
          w="full"
          minW="34rem"
          overflowX="scroll"
          variant="unstyled"
        >
          <Thead bg="neutral.3">
            <Tr>
              <Th width="10%" textAlign={"center"}>
                Rank
              </Th>
              <Th width="35%">Contributor</Th>
              <Th width="15%" textAlign={"center"}>
                No. of Projects
              </Th>
              <Th width="15%" textAlign={"center"}>
                Total Contribution
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((item, index) => {
              return (
                <>
                  <Tr
                    _hover={{
                      background: "rgba(255, 255, 255, 0.05)",
                    }}
                    onClick={() => {
                      router.push(`/${item.username}`);
                    }}
                    cursor="pointer"
                  >
                    <Td textAlign="center" width={"10rem"}>
                      {index + 1}
                    </Td>
                    <Td>
                      <HStack
                        align={"center"}
                        gap={{ base: "8px", md: "16px" }}
                      >
                        <Avatar
                          width={{ base: "36px", md: "44px" }}
                          height={{ base: "36px", md: "44px" }}
                          src={item.profilePicture}
                        />

                        <Username
                          proofs={[]}
                          isLoading={isLoading}
                          username={item?.username}
                          size="sm"
                        />
                      </HStack>
                    </Td>
                    <Td width={52} textAlign={"center"}>
                      <Box
                        as="p"
                        textAlign={"center"}
                        textStyle={{ base: "title5", md: "title4" }}
                      >
                        {formatNumberWithK(item.counter)}
                      </Box>
                    </Td>
                    <Td textAlign={"center"} width={52}>
                      <Box
                        as="p"
                        textAlign={"center"}
                        textStyle={{ base: "title5", md: "title4" }}
                      >
                        ${formatNumberWithK(Number(item.total.toFixed(2)))}
                      </Box>
                    </Td>
                  </Tr>
                </>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
