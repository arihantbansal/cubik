import {
  Box,
  Container,
  VStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Stat,
  StatLabel,
  StatNumber,
  HStack,
  StatArrow,
  StatGroup,
  Wrap,
  Skeleton,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import GrantUnderReviewProjects from '~/components/pages/grants/admin/GrantUnderReviewProjects';
import React from 'react';
import { Round } from '@prisma/client';
import { formatNumberWithK } from '~/utils/formatWithK';

const OverviewStatsCard = ({
  children,
  title,
  value,
  isLoading,
}: {
  title: string;
  value: number;
  isLoading?: boolean;
  children?: JSX.Element;
}) => {
  return (
    <Stat variant="cubik" overflow="hidden">
      <VStack p="24px" mb="12px" align="start">
        <Skeleton isLoaded={!isLoading} fadeDuration={0.4}>
          <StatLabel
            whiteSpace={'nowrap'}
            overflow="hidden"
            textStyle={{ base: 'title6', md: 'title5' }}
            color="neutral8"
          >
            {title}
          </StatLabel>
        </Skeleton>
        <Skeleton isLoaded={!isLoading} fadeDuration={0.4}>
          <StatNumber>${formatNumberWithK(value)}</StatNumber>
        </Skeleton>
      </VStack>
      {children}
    </Stat>
  );
};

const GrantAdminDashboardOverview = ({
  roundData,
  isLoading,
}: {
  roundData: Round | undefined;
  isLoading?: boolean;
}) => {
  const [totalCommunityContributions, setTotalCommunityContributions] =
    useState(0);

  const [averageContributionSize, setAverageContributionSize] = useState();

  useEffect(() => {
    console.log('roundData', roundData);
    if (roundData) {
      const total = roundData.contributions;
      setTotalCommunityContributions(total);
    }
  }, [roundData]);

  return (
    <VStack align={'start'} w="full" gap="16px">
      <Skeleton isLoaded={!isLoading} fadeDuration={0.6}>
        <Box textStyle={{ base: 'title3', md: 'title2' }} color="neutral.11">
          Overview
        </Box>
      </Skeleton>
      <Wrap
        direction={{ base: 'column', sm: 'row' }}
        justify={'start'}
        align={'start'}
        spacing="16px"
        w="full"
      >
        <OverviewStatsCard
          title={'Total Contributions'}
          value={totalCommunityContributions}
          isLoading={isLoading}
        >
          <HStack
            w="full"
            justify={'space-between'}
            rounded="8px"
            p="16px"
            background={'#141414'}
            borderTop="1px solid #1D1F1E"
          >
            <Skeleton isLoaded={!isLoading} fadeDuration={0.6}>
              <Box
                as="p"
                textStyle={{ base: 'overline5', md: 'overline4' }}
                color="neutral.8"
              >
                Last Contribution
              </Box>
            </Skeleton>
            <Skeleton>
              <Box
                as="p"
                textStyle={{ base: 'title6', md: 'title5' }}
                color="neutral.11"
              >
                $10
              </Box>
            </Skeleton>
          </HStack>
        </OverviewStatsCard>
        <OverviewStatsCard
          title={'Average Contribution'}
          value={0.0}
          isLoading={isLoading}
        >
          <HStack
            w="full"
            justify={'space-between'}
            rounded="8px"
            p="16px"
            background={'#141414'}
            borderTop="1px solid #1D1F1E"
          >
            <Skeleton isLoaded={!isLoading} fadeDuration={0.6}>
              <Box
                as="p"
                textStyle={{ base: 'overline5', md: 'overline4' }}
                color="neutral.8"
              >
                Last Contribution
              </Box>
            </Skeleton>
            <Skeleton>
              <Box
                as="p"
                textStyle={{ base: 'title6', md: 'title5' }}
                color="neutral.11"
              >
                $10
              </Box>
            </Skeleton>
          </HStack>
        </OverviewStatsCard>
        <Stat variant="cubik" overflow="hidden">
          <VStack p="24px" mb="12px" align="start">
            <StatLabel
              whiteSpace={'nowrap'}
              overflow="hidden"
              textStyle={{ base: 'title6', md: 'title5' }}
              color="neutral8"
            >
              Total Contributors
            </StatLabel>
            <StatNumber>$0.00</StatNumber>
          </VStack>
          <HStack
            w="full"
            justify={'space-between'}
            rounded="8px"
            p="16px"
            background={'#141414'}
            borderTop="1px solid #1D1F1E"
          >
            <Box
              as="p"
              textStyle={{ base: 'overline5', md: 'overline4' }}
              color="neutral.8"
            >
              Last Donation
            </Box>
            <Box
              as="p"
              textStyle={{ base: 'title6', md: 'title5' }}
              color="neutral.11"
            >
              $10
            </Box>
          </HStack>
        </Stat>
        <Stat variant="cubik" overflow="hidden">
          <VStack p="24px" mb="12px" align="start">
            <StatLabel
              whiteSpace={'nowrap'}
              overflow="hidden"
              textStyle={{ base: 'title6', md: 'title5' }}
              color="neutral8"
            >
              Total Donation
            </StatLabel>
            <StatNumber>$0.00</StatNumber>
          </VStack>
          <HStack
            w="full"
            justify={'space-between'}
            rounded="8px"
            p="16px"
            background={'#141414'}
            borderTop="1px solid #1D1F1E"
          >
            <Box
              as="p"
              textStyle={{ base: 'overline5', md: 'overline4' }}
              color="neutral.8"
            >
              Last Donation
            </Box>
            <Box
              as="p"
              textStyle={{ base: 'title6', md: 'title5' }}
              color="neutral.11"
            >
              $10
            </Box>
          </HStack>
        </Stat>
      </Wrap>
    </VStack>
  );
};

const GrantAdminDashboardProjects = ({
  roundData,
  isLoading,
}: {
  roundData: Round | undefined;
  isLoading?: boolean;
}) => {
  const [projectsNumberByStatus, setProjectsNumberByStatus] = useState({
    review: 0,
    accepted: 0,
    rejected: 0,
  });
  return (
    <VStack align={'start'} w="full" gap="16px">
      <Box textStyle={{ base: 'title3', md: 'title2' }} color="neutral.11">
        Projects
      </Box>
      <Tabs variant={'cubik'} alignSelf={'start'} w="full">
        <TabList gap={{ base: '0.5rem', md: '1rem' }}>
          <Tab gap="8px" display={'flex'}>
            <Box
              whiteSpace={'nowrap'}
              overflow="hidden"
              as="p"
              textStyle={{ base: 'title5', md: 'title4' }}
            >
              Under Review
            </Box>
            <Tag rounded="full" variant="colorful">
              {projectsNumberByStatus.review && projectsNumberByStatus.review}
            </Tag>
          </Tab>
          <Tab gap="8px" display={'flex'}>
            <Box as="p" textStyle={{ base: 'title5', md: 'title4' }}>
              Accepted
            </Box>
            {projectsNumberByStatus.accepted ? (
              <Tag
                rounded="full"
                variant="colorful"
                color="#FFF066"
                bg="#2D2A14"
              >
                {projectsNumberByStatus.accepted}
              </Tag>
            ) : (
              ''
            )}
          </Tab>
          <Tab gap="8px" display={'flex'}>
            <Box as="p" textStyle={{ base: 'title5', md: 'title4' }}>
              Rejected
            </Box>
            {projectsNumberByStatus.rejected ? (
              <Tag
                rounded="full"
                variant="colorful"
                color="#FF1F1F"
                bg="#3b1515"
              >
                {projectsNumberByStatus.rejected}
              </Tag>
            ) : (
              ''
            )}
          </Tab>
        </TabList>
        <TabPanels p="0">
          <TabPanel>
            <GrantUnderReviewProjects
              setProjectsNumberByStatus={setProjectsNumberByStatus}
              roundId={roundData?.id as string}
            />
          </TabPanel>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

const GrantsDashboardDetails = ({
  roundData,
  isLoading,
}: {
  roundData: Round | undefined;
  isLoading?: boolean;
}) => {
  return (
    <Container maxW="full" p="0" py="20px">
      <VStack w="full" gap="40px">
        <GrantAdminDashboardOverview
          roundData={roundData}
          isLoading={isLoading}
        />
        <GrantAdminDashboardProjects
          roundData={roundData}
          isLoading={isLoading}
        />
      </VStack>
    </Container>
  );
};

export default GrantsDashboardDetails;
