import { Box, Container, HStack, VStack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { GetServerSideProps } from "next";
import ErrorBoundary from "~/components/errors/Errorboundary";
import RoundAdminSettings from "~/components/pages/grants/admin/RoundAdminSettings";
import GrantsDashboardDetails from "~/components/pages/grants/admin/details/GrantsDashboardDetails";
import GrantMatchingPoolAdminPanel from "~/components/pages/grants/admin/fundingPool/GrantMatchingPoolAdminPanel";
import RoundResults from "~/components/pages/grants/admin/results/RoundResults";
import { trpc } from "~/utils/trpc";

const RoundAdmin = ({ roundId }: { roundId: string }) => {
  const { data, isLoading } = trpc.round.findOneAdmin.useQuery({
    id: roundId,
  });
  return (
    <ErrorBoundary>
      <Container maxW="full" py="40px" px="0">
        <VStack align="start" w="full" gap="40px">
          <VStack mx="auto" maxW="7xl" px="1rem" w="full" align="start">
            <Skeleton isLoaded={!isLoading} fadeDuration={1}>
              <Box
                as="p"
                textStyle={{ base: "title2", md: "title1" }}
                color="neutral.11"
              >
                {data && data ? data?.roundName : "This round does not exist"}
              </Box>
            </Skeleton>
          </VStack>
          <Tabs variant={"cubik"} alignSelf={"start"} w="full">
            <TabList borderBottom="1px solid #272929">
              <HStack
                maxW="7xl"
                px="1rem"
                w="full"
                mx="auto"
                gap={{ base: "0.5rem", md: "1rem" }}
                overflowY="scroll"
              >
                <Tab whiteSpace={"nowrap"} gap="8px" display={"flex"}>
                  Round Details
                </Tab>
                <Tab whiteSpace={"nowrap"} gap="8px" display={"flex"}>
                  Funding Pool
                </Tab>
                <Tab whiteSpace={"nowrap"} gap="8px" display={"flex"}>
                  Round Results
                </Tab>
                <Tab whiteSpace={"nowrap"} gap="8px" display={"flex"}>
                  Settings
                </Tab>
              </HStack>
            </TabList>
            <TabPanels maxW="7xl" px="1rem" mx="auto">
              <TabPanel w="full">
                <GrantsDashboardDetails
                  roundData={{
                    ...data!!,
                  }}
                  totalContribution={
                    data?.Contribution?.reduce(
                      (a: any, b: { usdTotal: any }) => a + b.usdTotal,
                      0
                    ) ?? 0
                  }
                  isLoading={isLoading}
                  totalContributors={data?.Contribution?.length ?? 0}
                  avgContribution={
                    isNaN(
                      (data?.Contribution?.reduce(
                        (a: any, b: { usdTotal: any }) => a + b.usdTotal,
                        0
                      ) as number) / (data?.Contribution?.length as number)
                    )
                      ? 0
                      : (data?.Contribution?.reduce(
                          (a: any, b: { usdTotal: any }) => a + b.usdTotal,
                          0
                        ) as number) / (data?.Contribution?.length as number)
                  }
                  lastContribution={
                    data?.Contribution[data.Contribution.length]?.usdTotal ?? 0
                  }
                  todayAverage={
                    (data?.Contribution.filter(
                      (e: { createdAt: Date }) => e.createdAt === new Date()
                    ).reduce(
                      (a: any, b: { usdTotal: any }) => a + b.usdTotal,
                      0
                    ) as number) /
                      (data?.Contribution.filter(
                        (e: { createdAt: Date }) => e.createdAt === new Date()
                      ).length as number) ?? 0
                  }
                  todayContributors={
                    (data?.Contribution.filter(
                      (e: { createdAt: Date }) => e.createdAt === new Date()
                    ).length as number) ?? 0
                  }
                />
              </TabPanel>
              <TabPanel>
                <GrantMatchingPoolAdminPanel
                  roundData={{
                    ...data!!,
                  }}
                  ProjectJoinRound={data?.ProjectJoinRound ?? []}
                  matchingPoolAmount={data?.matchedPool}
                  contributions={data?.Contribution ?? []}
                  isLoading={isLoading}
                />
              </TabPanel>
              <TabPanel>
                <RoundResults
                  roundData={{
                    ...data!!,
                  }}
                  isLoading={isLoading}
                />
              </TabPanel>
              <TabPanel>
                <RoundAdminSettings />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Container>
    </ErrorBoundary>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const roundId = context.query.roundId as string;
  return {
    props: { roundId },
  };
};

export default RoundAdmin;
