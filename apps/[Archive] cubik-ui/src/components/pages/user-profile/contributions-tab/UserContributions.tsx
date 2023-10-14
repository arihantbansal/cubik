import { Box, Center, HStack, VStack } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/react";
import { Skeleton, SkeletonCircle } from "@chakra-ui/skeleton";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/table";
import { Key, ReactChild } from "react";
import { BiChevronRight } from "react-icons/bi";
import ContributionsEmptyState from "~/components/common/empty-state/ContributionsEmptyState";
import CustomTag from "~/components/common/tags/CustomTag";
import { BONK, SOL, USDC } from "~/components/common/tokens/token";
import ComponentErrors from "~/components/errors/ComponentErrors";
import { UserContributionsWithProjectOwnerAndProjectRound } from "~/types/contribution";
import { formatNumberWithK } from "~/utils/formatWithK";
import { timeSince } from "~/utils/gettimeSince";
import { trpc } from "~/utils/trpc";
const UserContributionTableRow = ({
  isLoading,
  contribution,
}: {
  isLoading?: boolean;
  contribution: UserContributionsWithProjectOwnerAndProjectRound;
}) => {
  return (
    <Tr _hover={{ backgroundColor: "#0C0D0D" }}>
      <Td px="12px">
        <HStack align={"start"} gap={{ base: "14px", md: "16px" }}>
          <SkeletonCircle
            isLoaded={!isLoading}
            width={{ base: "36px", md: "52px" }}
            height={{ base: "36px", md: "52px" }}
          >
            <Avatar
              // borderRadius={'8px'}
              width={{ base: "36px", md: "52px" }}
              height={{ base: "36px", md: "52px" }}
              src={contribution.ProjectsModel.logo}
            />
          </SkeletonCircle>
          <VStack
            align={"start"}
            justify="center"
            spacing={{ base: "8px", md: "8px" }}
          >
            <Skeleton
              isLoaded={!isLoading}
              fadeDuration={2}
              opacity={isLoading ? 0.5 : 1}
            >
              <Box
                as="p"
                textStyle={{ base: "title5", md: "title4" }}
                color="neutral.11"
              >
                {contribution.ProjectsModel.name}
              </Box>
            </Skeleton>
            <Skeleton
              isLoaded={!isLoading}
              fadeDuration={2}
              opacity={isLoading ? 0.5 : 1}
            >
              <Box
                as="p"
                textStyle={{ base: "body5", md: "body4" }}
                color="neutral.7"
              >
                by <b>@{contribution.ProjectsModel.owner.username}</b>
              </Box>
            </Skeleton>
          </VStack>
        </HStack>
      </Td>
      <Td px="12px">
        <Skeleton
          isLoaded={!isLoading}
          fadeDuration={2}
          opacity={isLoading ? 0.5 : 1}
        >
          <HStack>
            {JSON.parse(contribution.ProjectsModel.industry).map(
              (industry: {
                value: Key | null | undefined;
                label: ReactChild;
              }) => (
                <CustomTag key={industry.value}>{industry.label}</CustomTag>
              )
            )}
          </HStack>
        </Skeleton>
      </Td>
      <Td px="12px">
        <HStack gap="8px" align={"center"}>
          <Skeleton
            isLoaded={!isLoading}
            fadeDuration={2}
            opacity={isLoading ? 0.5 : 1}
          >
            <Center>
              {contribution.token === "solana" ? (
                <SOL size={"32px"} />
              ) : contribution.token === "usdc" ? (
                <USDC size={"32px"} />
              ) : contribution.token === "bonk" ? (
                <BONK size={"32px"} />
              ) : (
                contribution.token
              )}
            </Center>
          </Skeleton>
          <VStack justify={"center"} spacing="2px" align={"start"}>
            <HStack align={"baseline"} color="white">
              <Skeleton
                isLoaded={!isLoading}
                fadeDuration={2}
                opacity={isLoading ? 0.5 : 1}
              >
                <Box as="p" textStyle={{ base: "title5", md: "title4" }}>
                  {formatNumberWithK(contribution.total)}
                </Box>
              </Skeleton>
              <Box as="p" textStyle={{ base: "title8", md: "title7" }}>
                {contribution.token.toUpperCase()}
              </Box>
            </HStack>
            <Skeleton
              isLoaded={!isLoading}
              fadeDuration={2}
              opacity={isLoading ? 0.5 : 1}
            >
              <Box
                as="p"
                color="neutral.8"
                textStyle={{ base: "body6", md: "body5" }}
              >
                {formatNumberWithK(contribution.usdTotal)}$
              </Box>
            </Skeleton>
          </VStack>
        </HStack>
      </Td>
      <Td px="12px">
        <VStack alignItems={"start"} gap="0px" justify="start">
          <Skeleton
            isLoaded={!isLoading}
            fadeDuration={2}
            opacity={isLoading ? 0.5 : 1}
          >
            <Box
              as="p"
              textStyle={{ base: "title5", md: "title4" }}
              color="neutral.11"
            >
              {
                contribution.ProjectsModel.ProjectJoinRound[0].fundingRound
                  .roundName
              }
            </Box>
          </Skeleton>
          <Skeleton
            isLoaded={!isLoading}
            fadeDuration={2}
            opacity={isLoading ? 0.5 : 1}
          >
            <Box
              as="p"
              textStyle={{ base: "body5", md: "body4" }}
              color="neutral.7"
            >
              {timeSince(new Date(contribution.createdAt))}
            </Box>
          </Skeleton>
        </VStack>
      </Td>
      <Td px="12px">
        <Skeleton
          isLoaded={!isLoading}
          fadeDuration={2}
          opacity={isLoading ? 0.5 : 1}
        >
          <Box
            as="p"
            textStyle={{ base: "title4", md: "title3" }}
            color="neutral.11"
          >
            {contribution.ProjectsModel.ProjectJoinRound.find(
              (e) => e.roundId === contribution.roundId
            )?.amountRaise?.toFixed(2) ?? "00.00"}
          </Box>
        </Skeleton>
      </Td>
      <Td px="12px">
        <BiChevronRight size="24" />
      </Td>
    </Tr>
  );
};

const UserContributions = ({
  userId,
}: {
  userId: string | null | undefined;
}) => {
  const { data, isError, isLoading } = userId
    ? trpc.contribution.getUserContributions.useQuery({ userId })
    : { data: null, isError: false, isLoading: false }; // todo: i have a doubt if it works or not

  if (!userId) {
    return <ComponentErrors>No user ID provided</ComponentErrors>;
  }

  if (isError) {
    return <ComponentErrors />;
  }

  if (!isLoading && data === null) {
    return <ContributionsEmptyState />;
  }

  return data && data.length > 0 ? (
    <TableContainer w="full">
      <Table variant="unstyled">
        <Thead>
          <Tr>
            <Th w="20%" px="12px">
              <Box
                as="p"
                color="#ADB8B6"
                textStyle={{ base: "body4", md: "body3" }}
                textTransform={"capitalize"}
              >
                Projects
              </Box>
            </Th>
            <Th w="25%" px="12px">
              <Box
                as="p"
                color="#ADB8B6"
                textStyle={{ base: "body4", md: "body3" }}
                textTransform={"capitalize"}
              >
                Category
              </Box>
            </Th>
            <Th w="15%" px="12px">
              <Box
                as="p"
                color="#ADB8B6"
                textStyle={{ base: "body4", md: "body3" }}
                textTransform={"capitalize"}
              >
                Amount Contributed
              </Box>
            </Th>
            <Th w="20%" px="12px">
              <Box
                as="p"
                color="#ADB8B6"
                textStyle={{ base: "body4", md: "body3" }}
                textTransform={"capitalize"}
              >
                Round
              </Box>
            </Th>
            <Th w="15%" px="12px">
              <Box
                as="p"
                color="#ADB8B6"
                textStyle={{ base: "body4", md: "body3" }}
                textTransform={"capitalize"}
                fontWeight="500"
              >
                Total Amount Raised
              </Box>
            </Th>
            <Th w="5%" px="12px"></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            data.map((contribution) => (
              <UserContributionTableRow
                isLoading={isLoading}
                key={contribution.id}
                contribution={contribution}
              />
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  ) : (
    <ContributionsEmptyState />
  );
};

export default UserContributions;
