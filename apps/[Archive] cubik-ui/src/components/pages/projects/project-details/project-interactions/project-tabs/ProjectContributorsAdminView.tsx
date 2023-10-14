import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Center,
  HStack,
  IconButton,
  Skeleton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { Contribution, UserModel } from "@cubik/database";
import { useRouter } from "next/router";
import { useState } from "react";
import { BiChevronDown, BiChevronRight, BiChevronUp } from "react-icons/bi";
import ContributionsEmptyState from "~/components/common/empty-state/ContributionsEmptyState";
import Pagination from "~/components/common/pagination/Pagination";
import { SOL, USDC } from "~/components/common/tokens/token";
import Username from "~/components/common/username/Username";
import { TruncatedAddr } from "~/components/common/wallet/WalletAdd";
import { UserProof } from "~/types/user";
import { formatNumberWithK } from "~/utils/formatWithK";
import { timeSince } from "~/utils/gettimeSince";

type ExtendedContribution = Contribution & {
  avatar: string;
  username: string;
  walletAddress: string;
  currentusdTotal: number;
};

const formatContributorData = (data: any[]): ExtendedContribution[] => {
  return data?.map((contributor) => ({
    ...contributor,
  }));
};

export const TableLoading = () => {
  return (
    <Tbody width="full">
      <Tr>
        <Td p="8px">
          <Skeleton w="full" height="2rem" opacity="0.2" />
        </Td>
        <Td p="8px">
          <Skeleton w="full" height="2rem" opacity="0.2" />
        </Td>
        <Td p="8px">
          <Skeleton w="full" height="2rem" opacity="0.2" />
        </Td>
        <Td p="8px">
          <Skeleton w="full" height="2rem" opacity="0.2" />
        </Td>
      </Tr>
      <Tr>
        <Td p="8px">
          <Skeleton w="full" height="2rem" opacity="0.2" />
        </Td>
        <Td p="8px">
          <Skeleton w="full" height="2rem" opacity="0.2" />
        </Td>
        <Td p="8px">
          <Skeleton w="full" height="2rem" opacity="0.2" />
        </Td>
        <Td p="8px">
          <Skeleton w="full" height="2rem" opacity="0.2" />
        </Td>
      </Tr>
    </Tbody>
  );
};

type ContributorRowProps = Contribution & { user: UserModel };

export const ContributorRow: React.FC<ContributorRowProps> = ({
  user,
  ...contribution
}) => {
  const router = useRouter();
  return (
    <Tr
      onClick={() => {
        router.push(`/${user.username}`);
      }}
      cursor="pointer"
    >
      <Td p={{ base: "10px", md: "16px" }}>
        <HStack align={"start"} gap={{ base: "8px", md: "16px" }}>
          <Avatar
            width={{ base: "36px", md: "44px" }}
            height={{ base: "36px", md: "44px" }}
            src={user.profilePicture}
          />
          <VStack
            align={"start"}
            justify="center"
            spacing={{ base: "8px", md: "8px" }}
          >
            <Username
              isLoading={false}
              username={user?.username}
              proofs={(user?.proof as unknown as UserProof[]) ?? []}
              size="sm"
            />
            <Box
              as="p"
              textStyle={{ base: "body6", md: "body5" }}
              color="neutral.7"
            >
              {TruncatedAddr({
                walletAddress: user.mainWallet,
              })}
            </Box>
          </VStack>
        </HStack>
      </Td>
      <Td p={{ base: "10px", md: "16px" }}>
        <HStack gap="8px" align={"center"}>
          <Center>
            {contribution.token.includes("sol") ? (
              <SOL size={"28px"} />
            ) : (
              <USDC size={"28px"} />
            )}
          </Center>
          <VStack justify={"center"} spacing="2px" align={"start"}>
            <HStack align={"baseline"} color="white">
              <Box as="p" textStyle={{ base: "title5", md: "title4" }}>
                {formatNumberWithK(contribution.total)}
              </Box>
              <Box as="p" textStyle={{ base: "title6", md: "title7" }}>
                {contribution.token.toLocaleUpperCase()}
              </Box>
            </HStack>
            <Box
              as="p"
              color="neutral.8"
              textStyle={{ base: "body6", md: "body5" }}
            >
              {formatNumberWithK(contribution.currentusdTotal)}$
            </Box>
          </VStack>
        </HStack>
      </Td>
      <Td p={{ base: "10px", md: "16px" }}>
        <Box
          as="p"
          textStyle={{ base: "body5", md: "body4" }}
          color="neutral.11"
        >
          {timeSince(new Date(contribution.createdAt))}
        </Box>
      </Td>
      <Td p={{ base: "10px", md: "16px" }}>
        <BiChevronRight size="24" />
      </Td>
    </Tr>
  );
};

const ProjectContributorsAdminView = ({
  contributorsData,
  isLoading,
}: {
  contributorsData: (Contribution & {
    user: UserModel;
  })[];
  isLoading?: boolean;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("timestamp");
  const [sortDirection, setSortDirection] = useState("desc");

  const pageSize = 8;
  const siblingCount = 1;

  const totalContributors = contributorsData ? contributorsData.length : 0;
  const totalPages = Math.ceil(totalContributors / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const sortedAndFormattedContributors = contributorsData
    ? formatContributorData(contributorsData).sort((a, b) => {
        const key = sortField as keyof ExtendedContribution;
        if (a[key]! < b[key]!) {
          return sortDirection === "asc" ? -1 : 1;
        } // todo: check types here
        if (a[key]! > b[key]!) {
          return sortDirection === "asc" ? 1 : -1;
        }
        return 0;
      })
    : [];

  const currentContributors = sortedAndFormattedContributors
    ? sortedAndFormattedContributors.slice(startIndex, endIndex)
    : [];

  const handleSortChange = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <VStack
      w="full"
      py="0px"
      align={
        currentContributors?.length === 0
          ? "center"
          : { base: "start", md: "end" }
      }
    >
      {currentContributors?.length === 0 ? (
        <ContributionsEmptyState />
      ) : (
        <>
          <Table
            w="full"
            minW={{ base: "28rem", md: "34rem" }}
            overflowX="scroll"
            variant="unstyled"
            mt="16px"
          >
            <Thead
              bg="neutral.4"
              h="1rem"
              color="neutral.8"
              fontFamily={"Plus Jakarta Sans, sans-serif"}
            >
              <Tr>
                <Th w={"40%"} p={{ base: "10px", md: "4px 16px" }}>
                  <Text
                    fontSize={{ base: "12px", md: "14px" }}
                    textTransform={"capitalize"}
                    fontWeight="500"
                  >
                    Contributor
                  </Text>
                </Th>
                <Th w={"25%"} p={{ base: "10px", md: "4px 16px" }}>
                  <ButtonGroup
                    onClick={() => handleSortChange("amount")}
                    variant="unstyled"
                    gap="8px"
                    isAttached
                  >
                    <Button
                      textAlign={"center"}
                      alignContent={"center"}
                      variant="unstyled"
                      fontWeight="500"
                      fontSize={{ base: "12px", md: "14px" }}
                      textTransform={"capitalize"}
                    >
                      Amount
                    </Button>
                    <IconButton
                      aria-label="Sort by Amount"
                      icon={
                        sortField === "amount" && sortDirection === "asc" ? (
                          <BiChevronUp size={20} />
                        ) : (
                          <BiChevronDown size={20} />
                        )
                      }
                    />
                  </ButtonGroup>
                </Th>
                <Th w={"25%"} p={{ base: "10px", md: "4px 16px" }}>
                  <ButtonGroup
                    onClick={() => handleSortChange("timestamp")}
                    variant="unstyled"
                    gap="8px"
                    isAttached
                  >
                    <Button
                      textAlign={"center"}
                      alignContent={"center"}
                      variant="unstyled"
                      fontWeight="500"
                      fontSize={{ base: "12px", md: "14px" }}
                      textTransform={"capitalize"}
                    >
                      Time
                    </Button>
                    <IconButton
                      aria-label="Sort by time"
                      icon={
                        sortField === "timestamp" && sortDirection === "asc" ? (
                          <BiChevronDown size={20} />
                        ) : (
                          <BiChevronUp size={20} />
                        )
                      }
                    />
                  </ButtonGroup>
                </Th>
                <Th w={"10%"} p={{ base: "10px", md: "4px 16px" }}></Th>
              </Tr>
            </Thead>
            {isLoading ? (
              <TableLoading />
            ) : (
              <Tbody>
                {contributorsData.length === 0 ? (
                  <></>
                ) : (
                  contributorsData.map((contributor) => (
                    <ContributorRow key={contributor.id} {...contributor} />
                  ))
                )}
              </Tbody>
            )}
          </Table>
          {currentContributors.length >= pageSize && (
            <Pagination
              currentPage={currentPage}
              totalCount={totalContributors}
              siblingCount={siblingCount}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
              totalPages={totalPages}
            />
          )}
        </>
      )}
    </VStack>
  );
};

export default ProjectContributorsAdminView;
