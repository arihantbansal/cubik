import { Card } from "@chakra-ui/card";
import { Box, Center, HStack, Stack, VStack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { OverviewStatsCard } from "~/components/common/card/OverviewStatsCard";
import { useErrorBoundary } from "~/hooks/useErrorBoundary";
import { trpc } from "~/utils/trpc";

const UserDetails = ({
  isLoading,
  userId,
}: {
  isLoading: boolean;
  userId: string;
}) => {
  const { ErrorBoundaryWrapper } = useErrorBoundary();
  const { data, isLoading: userContributionIsLoading } =
    trpc.contribution.getUserContributions.useQuery({ userId: userId });

  const { data: amountRaiseCount, isLoading: amountRaisedIsLoading } =
    trpc.project.findManyVerifiedUser.useQuery({
      id: userId ?? "",
    });

  const userTotalContributionsAmount = data?.reduce((acc, contribution) => {
    return acc + contribution.usdTotal;
  }, 0.0);

  const userLastDonationAmount = data
    ? data[(data?.length as number) - 1]?.usdTotal
    : 0.0;

  return (
    <ErrorBoundaryWrapper>
      <VStack
        align="start"
        w="full"
        gap={{ base: "16px", sm: "20px", md: "24px" }}
      >
        <Skeleton
          isLoaded={!isLoading}
          opacity={isLoading ? "0.5" : 1}
          minH="2rem"
          fadeDuration={2}
        >
          <Box
            as="p"
            textStyle={{ base: "title4", md: "title3" }}
            color="neutral.11"
          >
            Funding
          </Box>
        </Skeleton>
        <Stack
          w="full"
          direction={{ base: "column", md: "row" }}
          spacing={{ base: "24px", md: "32px" }}
        >
          <Center minW="22rem">
            <OverviewStatsCard
              height="full"
              title={"Funds Donated"}
              value={
                userTotalContributionsAmount
                  ? Number(userTotalContributionsAmount?.toFixed(2))
                  : 0
              }
              isLoading={userContributionIsLoading}
            >
              <HStack
                w="full"
                mt="36px"
                justify={"space-between"}
                rounded="8px"
                p="16px"
                background={"#141414"}
                borderTop="1px solid #1D1F1E"
              >
                <Skeleton isLoaded={!isLoading} fadeDuration={1}>
                  <Box
                    as="p"
                    textStyle={{ base: "overline5", md: "overline4" }}
                    color="neutral.8"
                  >
                    Last Contribution
                  </Box>
                </Skeleton>
                <Skeleton isLoaded={!isLoading} fadeDuration={1}>
                  <Box
                    as="p"
                    textStyle={{ base: "title6", md: "title5" }}
                    color="neutral.11"
                  >
                    {userTotalContributionsAmount
                      ? `$` + userTotalContributionsAmount?.toFixed(2)
                      : "$ 0.0"}
                  </Box>
                </Skeleton>
              </HStack>
            </OverviewStatsCard>
          </Center>
          {/* funds raised */}
          <Card
            p={{ base: "16px", md: "24px" }}
            flexDirection={{ base: "column", md: "row" }}
            gap={{ base: "48px", md: "80px" }}
            w={{ base: "100%", md: "auto" }}
          >
            <VStack align={"start"} gap="8px">
              <Skeleton
                isLoaded={!amountRaisedIsLoading}
                opacity={amountRaisedIsLoading ? "0.3" : 1}
                fadeDuration={2}
              >
                <Box
                  as="p"
                  color="neutral.8"
                  textStyle={{ base: "body5", md: "body4" }}
                >
                  Funds Raised
                </Box>
              </Skeleton>
              <Skeleton
                isLoaded={!amountRaisedIsLoading}
                opacity={amountRaisedIsLoading ? "0.3" : 1}
                fadeDuration={2}
              >
                <Box
                  as="p"
                  color="neutral.11"
                  textStyle={{ base: "title3", sm: "title2", md: "title1" }}
                >
                  {amountRaiseCount && amountRaiseCount![0] !== 0
                    ? "$" +
                      parseFloat(
                        (amountRaiseCount![0] ?? 0)?.toFixed(2) as string
                      ).toLocaleString()
                    : "$0.0"}
                </Box>
              </Skeleton>
            </VStack>
            <VStack align={"start"} gap={{ base: "8px", md: "12px" }}>
              <Skeleton
                fadeDuration={2}
                isLoaded={!amountRaisedIsLoading}
                w="full"
                opacity={amountRaisedIsLoading ? "0.3" : 1}
              >
                <HStack
                  w={{ base: "full", md: "15rem" }}
                  justifyContent={"space-between"}
                  alignItems="end"
                >
                  <Box
                    as="p"
                    color="neutral.8"
                    textStyle={{ base: "body6", md: "body5" }}
                  >
                    Grants Matching Pool
                  </Box>
                  <Box
                    as="p"
                    color="neutral.11"
                    textStyle={{ base: "title6", sm: "title5", md: "title4" }}
                  >
                    {amountRaiseCount &&
                      "$" +
                        parseFloat(
                          (
                            ((amountRaiseCount![0] ?? 0) as number) -
                            ((amountRaiseCount![1] ?? 0) as number)
                          ).toFixed(1)
                        )}
                  </Box>
                </HStack>
              </Skeleton>
              <Skeleton
                isLoaded={!amountRaisedIsLoading}
                opacity={amountRaisedIsLoading ? "0.3" : 1}
                fadeDuration={2.5}
                w="full"
              >
                <HStack
                  w={{ base: "full", md: "15rem" }}
                  justifyContent={"space-between"}
                  alignItems="end"
                >
                  <Box
                    as="p"
                    color="neutral.8"
                    textStyle={{ base: "body6", md: "body5" }}
                  >
                    Community Donations
                  </Box>
                  <Box
                    as="p"
                    color="neutral.11"
                    textStyle={{ base: "title6", sm: "title5", md: "title4" }}
                  >
                    {amountRaiseCount &&
                      "$" + (amountRaiseCount![1] ?? 0)?.toFixed(1)}
                  </Box>
                </HStack>
              </Skeleton>
              <Skeleton
                isLoaded={!amountRaisedIsLoading}
                opacity={
                  amountRaisedIsLoading || amountRaisedIsLoading ? "0.3" : 1
                }
                fadeDuration={3}
                w="full"
              >
                <HStack
                  w={{ base: "full", md: "15rem" }}
                  justifyContent={"space-between"}
                  alignItems="end"
                >
                  <Box
                    as="p"
                    color="neutral.8"
                    textStyle={{ base: "body6", md: "body5" }}
                  >
                    Creator Tips
                  </Box>
                  <Box
                    as="p"
                    color="neutral.11"
                    textStyle={{ base: "title6", sm: "title5", md: "title4" }}
                  >
                    $0.0
                  </Box>
                </HStack>
              </Skeleton>
              <Skeleton
                isLoaded={!amountRaisedIsLoading}
                opacity={amountRaisedIsLoading ? "0.3" : 1}
                fadeDuration={2.6}
                w="full"
              >
                <HStack
                  w={{ base: "full", md: "15rem" }}
                  justifyContent={"space-between"}
                  alignItems="end"
                >
                  <Box
                    as="p"
                    color="neutral.8"
                    textStyle={{ base: "body6", md: "body5" }}
                  >
                    Hackathon Prizes
                  </Box>
                  <Box
                    as="p"
                    color="neutral.11"
                    textStyle={{ base: "title6", sm: "title5", md: "title4" }}
                  >
                    $0.0
                  </Box>
                </HStack>
              </Skeleton>
            </VStack>
          </Card>
        </Stack>
      </VStack>
    </ErrorBoundaryWrapper>
  );
};

export default UserDetails;
