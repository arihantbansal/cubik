import {
  Box,
  Container,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  VStack,
  Stat,
  Skeleton,
  StatNumber,
  StatArrow,
  StatGroup,
  Wrap,
} from '@chakra-ui/react';
import { Round } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import RoundStatus from '~/components/common/dates/Status';
import CustomTag from '~/components/common/tags/CustomTag';
import ErrorBoundary from '~/components/errors/Errorboundary';
import GrantMatchingPoolAdminPannel from '~/components/pages/grants/admin/GrantMatchingPoolAdminPannel';
import GrantUnderReviewProjects from '~/components/pages/grants/admin/GrantUnderReviewProjects';
import GrantsDashboardDetails from '~/components/pages/grants/admin/GrantsDashboardDetails';
import RoundAdminSettings from '~/components/pages/grants/admin/RoundAdminSettings';
import RoundResults from '~/components/pages/grants/admin/RoundResults';
import { trpc } from '~/utils/trpc';

const RoundAdmin = ({ roundId }: { roundId: string }) => {
  const [roundData, setRoundData] = useState<Round | undefined>(undefined);

  const { data, isLoading } = trpc.round.findActive.useQuery();

  useEffect(() => {
    const fetchRoundData = async () => {
      if (!isLoading && data) {
        const adminRound = data.find((round) => round.id === roundId);
        setRoundData(adminRound);
      }
    };
    fetchRoundData();
  }, [data, roundId]);

  return (
    <ErrorBoundary>
      <Container maxW="full" py="40px" px="0">
        <VStack align="start" w="full" gap="40px">
          {roundData && (
            <VStack mx="auto" maxW="7xl" px="1rem" w="full" align="start">
              <Skeleton isLoaded={!isLoading}>
                <Box
                  as="p"
                  textStyle={{ base: 'title2', md: 'title1' }}
                  color="neutral.11"
                >
                  {roundData.roundName}
                </Box>
              </Skeleton>
            </VStack>
          )}
          <Tabs variant={'cubik'} alignSelf={'start'} w="full">
            <TabList borderBottom="1px solid #272929">
              <HStack
                maxW="7xl"
                px="1rem"
                w="full"
                mx="auto"
                gap={{ base: '0.5rem', md: '1rem' }}
              >
                <Tab whiteSpace={'nowrap'} gap="8px" display={'flex'}>
                  Round Details
                </Tab>
                <Tab whiteSpace={'nowrap'} gap="8px" display={'flex'}>
                  Funding Pool
                </Tab>
                <Tab whiteSpace={'nowrap'} gap="8px" display={'flex'}>
                  Round Results
                </Tab>
                <Tab whiteSpace={'nowrap'} gap="8px" display={'flex'}>
                  Settings
                </Tab>
              </HStack>
            </TabList>
            <TabPanels maxW="7xl" px="1rem" mx="auto">
              <TabPanel py="40px" w="full">
                <GrantsDashboardDetails roundData={roundData} />
              </TabPanel>
              <TabPanel>
                <GrantMatchingPoolAdminPannel
                  roundData={roundData}
                  isLoading={isLoading}
                />
              </TabPanel>
              <TabPanel>
                <RoundResults roundData={roundData} isLoading={isLoading} />
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
