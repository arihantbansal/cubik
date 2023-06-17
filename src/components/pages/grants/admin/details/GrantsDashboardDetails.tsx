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
import GrantUnderReviewProjects from '~/components/pages/grants/admin/details/tabs/GrantUnderReviewProjects';
import React from 'react';
import { Round } from '@prisma/client';
import { formatNumberWithK } from '~/utils/formatWithK';
import FlipNumbers from 'react-flip-numbers';
import RoundStatus from '~/components/common/dates/Status';
import GrantAcceptedProjects from './tabs/GrantAcceptedProjects';
import GrantRejectedProjects from './tabs/GrantRejectedProjects';
import { isFuture, isPast } from 'date-fns';

interface CountdownTimerProps {
  finalDate: Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ finalDate }) => {
  const getTimeRemaining = (endDate: Date) => {
    const total = endDate?.getTime() - new Date().getTime();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const [timeRemaining, setTimeRemaining] = useState<number>(
    getTimeRemaining(finalDate).total
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const time = getTimeRemaining(finalDate);
      if (time.total <= 0) {
        clearInterval(interval);
      }
      setTimeRemaining(time.total);
    }, 1000);

    return () => clearInterval(interval);
  }, [finalDate]);

  const formatNumber = (number: number) => {
    return number < 10 ? '0' + number : number;
  };

  return (
    <Box
      display="flex"
      alignItems={{ base: 'start', md: 'center' }}
      justifyContent="center"
      fontWeight={'700'}
    >
      <HStack gap={{ base: '1.8rem', md: '2rem' }}>
        {getTimeRemaining(finalDate).days && (
          <VStack>
            <Box as="p" textStyle={'headline3'}>
              <Box as="p" textStyle="headline3">
                <FlipNumbers
                  height={30}
                  width={22}
                  color="white"
                  //background="black"
                  play
                  perspective={700}
                  numbers={String(
                    formatNumber(
                      getTimeRemaining(finalDate).days > 0
                        ? getTimeRemaining(finalDate).days
                        : 0
                    )
                  )}
                />
              </Box>
            </Box>
            <Box as="p" textStyle="overline3" color="#B4B0B2">
              Days
            </Box>
          </VStack>
        )}
        {getTimeRemaining(finalDate).hours && (
          <VStack>
            <Box as="p" textStyle={'headline3'}>
              <Box as="p" textStyle="headline3">
                <FlipNumbers
                  height={30}
                  width={22}
                  color="white"
                  //background="black"
                  play
                  perspective={700}
                  numbers={String(
                    formatNumber(
                      getTimeRemaining(finalDate).hours > 0
                        ? getTimeRemaining(finalDate).hours
                        : 0
                    )
                  )}
                />
              </Box>
            </Box>
            <Box as="p" textStyle="overline3" color="#B4B0B2">
              Hours
            </Box>
          </VStack>
        )}
        {getTimeRemaining(finalDate).minutes && (
          <VStack>
            <Box as="p" textStyle={'headline3'}>
              <Box as="p" textStyle="headline3">
                <FlipNumbers
                  height={30}
                  width={22}
                  color="white"
                  //background="black"
                  play
                  perspective={700}
                  numbers={String(
                    formatNumber(
                      getTimeRemaining(finalDate).minutes > 0
                        ? getTimeRemaining(finalDate).minutes
                        : 0
                    )
                  )}
                />
              </Box>
            </Box>
            <Box as="p" textStyle="overline3" color="#B4B0B2">
              Minutes
            </Box>
          </VStack>
        )}
      </HStack>
    </Box>
  );
};

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
  roundEndingDate,
  roundStartingDate,
  isLoading,
  totalContribution,
  avgContribution,
  totalContributors,
  lastContribution,
  todayAverage,
  todayContributors,
}: {
  roundEndingDate: Date | undefined;
  roundStartingDate: Date | undefined;
  isLoading?: boolean;
  totalContribution: number;
  avgContribution: number;
  totalContributors: number;
  lastContribution: number;
  todayAverage: number;
  todayContributors: number;
}) => {
  const today = new Date();
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
          title={'Total Donation'}
          value={totalContribution}
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
            <Skeleton isLoaded={!isLoading} fadeDuration={0.6}>
              <Box
                as="p"
                textStyle={{ base: 'title6', md: 'title5' }}
                color="neutral.11"
              >
                ${lastContribution}
              </Box>
            </Skeleton>
          </HStack>
        </OverviewStatsCard>
        <OverviewStatsCard
          title={'Average Contribution'}
          value={avgContribution}
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
                Todays Average
              </Box>
            </Skeleton>
            <Skeleton isLoaded={!isLoading} fadeDuration={0.6}>
              <Box
                as="p"
                textStyle={{ base: 'title6', md: 'title5' }}
                color="neutral.11"
              >
                ${todayAverage}
              </Box>
            </Skeleton>
          </HStack>
        </OverviewStatsCard>
        <Stat variant="cubik" overflow="hidden">
          <VStack p="24px" mb="12px" align="start">
            <Skeleton isLoaded={!isLoading} fadeDuration={0.6}>
              <StatLabel
                whiteSpace={'nowrap'}
                overflow="hidden"
                textStyle={{ base: 'title6', md: 'title5' }}
                color="neutral8"
              >
                Total Contributors
              </StatLabel>
            </Skeleton>
            <Skeleton isLoaded={!isLoading} fadeDuration={0.6}>
              <StatNumber>{totalContributors}</StatNumber>
            </Skeleton>
          </VStack>
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
                Todays Contributors
              </Box>
            </Skeleton>
            <Skeleton isLoaded={!isLoading} fadeDuration={0.6}>
              <Box
                as="p"
                textStyle={{ base: 'title6', md: 'title5' }}
                color="neutral.11"
              >
                {todayContributors}
              </Box>
            </Skeleton>
          </HStack>
        </Stat>
        <Stat variant="cubik" overflow="hidden">
          <VStack p="24px" mb="18px" align="center" mx="auto" gap="1rem">
            <Skeleton isLoaded={!isLoading} fadeDuration={0.6}>
              <RoundStatus
                startDate={roundStartingDate}
                endDate={roundEndingDate}
              />
            </Skeleton>
            <Skeleton isLoaded={!isLoading} fadeDuration={0.6}>
              <CountdownTimer
                finalDate={
                  isPast(roundEndingDate as Date)
                    ? today
                    : isFuture(roundStartingDate as Date)
                    ? (roundStartingDate as Date)
                    : (roundEndingDate as Date)
                }
              />
            </Skeleton>
          </VStack>
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
      <Skeleton isLoaded={!isLoading} fadeDuration={0.6}>
        <Box textStyle={{ base: 'title3', md: 'title2' }} color="neutral.11">
          Projects
        </Box>
      </Skeleton>
      <Tabs variant={'cubik'} alignSelf={'start'} w="full">
        <TabList gap={{ base: '0.5rem', md: '1rem' }}>
          <Skeleton isLoaded={!isLoading} fadeDuration={0.6}>
            <Tab gap="8px" display={'flex'}>
              <Box
                whiteSpace={'nowrap'}
                overflow="hidden"
                as="p"
                textStyle={{ base: 'title5', md: 'title4' }}
              >
                Under Review
              </Box>
              {projectsNumberByStatus.review > 0 && (
                <Tag rounded="full" variant="colorful">
                  {projectsNumberByStatus.review &&
                    projectsNumberByStatus.review}
                </Tag>
              )}
            </Tab>
          </Skeleton>
          <Skeleton isLoaded={!isLoading} fadeDuration={0.6}>
            <Tab gap="8px" display={'flex'}>
              <Box as="p" textStyle={{ base: 'title5', md: 'title4' }}>
                Accepted
              </Box>
              {projectsNumberByStatus.accepted > 0 && (
                <Tag
                  rounded="full"
                  variant="colorful"
                  color="#FFF066"
                  bg="#2D2A14"
                >
                  {projectsNumberByStatus.accepted}
                </Tag>
              )}
            </Tab>
          </Skeleton>
          <Skeleton isLoaded={!isLoading} fadeDuration={0.6}>
            <Tab gap="8px" display={'flex'}>
              <Box as="p" textStyle={{ base: 'title5', md: 'title4' }}>
                Rejected
              </Box>
              {projectsNumberByStatus.rejected > 0 && (
                <Tag
                  rounded="full"
                  variant="colorful"
                  color="#FF1F1F"
                  bg="#3b1515"
                >
                  {projectsNumberByStatus.rejected}
                </Tag>
              )}
            </Tab>
          </Skeleton>
        </TabList>
        <TabPanels p="0">
          <TabPanel>
            <GrantUnderReviewProjects
              setProjectsNumberByStatus={setProjectsNumberByStatus}
              roundId={roundData?.id as string}
            />
          </TabPanel>
          <TabPanel>
            <GrantAcceptedProjects
              setProjectsNumberByStatus={setProjectsNumberByStatus}
              roundId={roundData?.id as string}
            />
          </TabPanel>
          <TabPanel>
            <GrantRejectedProjects
              setProjectsNumberByStatus={setProjectsNumberByStatus}
              roundId={roundData?.id as string}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

const GrantsDashboardDetails = ({
  roundData,
  isLoading,
  totalContribution,
  avgContribution,
  totalContributors,
  lastContribution,
  todayAverage,
  todayContributors,
}: {
  roundData: Round | undefined;
  isLoading?: boolean;
  totalContribution: number;
  avgContribution: number;
  totalContributors: number;
  lastContribution: number;
  todayAverage: number;
  todayContributors: number;
}) => {
  return (
    <Container maxW="full" p="0">
      <VStack w="full" gap="40px">
        <GrantAdminDashboardOverview
          roundEndingDate={roundData?.endTime}
          roundStartingDate={roundData?.startTime}
          isLoading={isLoading}
          totalContribution={totalContribution}
          totalContributors={totalContributors}
          avgContribution={avgContribution}
          lastContribution={lastContribution}
          todayAverage={todayAverage}
          todayContributors={todayContributors}
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
