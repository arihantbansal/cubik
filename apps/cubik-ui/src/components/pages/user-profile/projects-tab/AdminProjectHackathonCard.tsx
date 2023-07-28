import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/accordion';
import { Box, Center, Flex, HStack, Stack } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';
import { Player } from '@lottiefiles/react-lottie-player'; // todo: package size is too big
import {
  Contribution,
  ProjectJoinRound,
  ProjectJoinRoundStatus,
  Round,
  UserModel,
} from '@cubik/database';
import { isFuture, isPast } from 'date-fns';
import { CgMediaLive } from 'react-icons/cg';
import { FiClock } from 'react-icons/fi';
import { HiBan } from 'react-icons/hi';
import { ImCheckboxChecked } from 'react-icons/im';
import { IoMdDoneAll } from 'react-icons/io';
import RoundStatus from '~/components/common/dates/Status';
import { useErrorBoundary } from '~/hooks/useErrorBoundary';
import ProjectContributorsAdminView from '../../projects/project-details/project-interactions/project-tabs/ProjectContributorsAdminView';
import { CountdownTimer } from '../../projects/project-explorer/header/FundingRoundBanner';
import FundingOverview from './project-admin-dashboard/FundingOverview';
import ProjectInsights from './project-admin-dashboard/ProjectInsights';

const AdminProjectHackathonCard = ({
  isLoading,
  id,
  endTime,
  startTime,
  status,
  projectId,
  hackathonName,
  amountRaise,
}: {
  isLoading: boolean;
  id: string;
  status: ProjectJoinRoundStatus;
  endTime: Date;
  startTime: Date;
  hackathonName: string;
  projectId: string;
  amountRaise: number;
}) => {
  const { ErrorBoundaryWrapper } = useErrorBoundary();
  return (
    <ErrorBoundaryWrapper>
      <Skeleton
        key={id}
        isLoaded={!isLoading}
        fadeDuration={2.5}
        opacity={isLoading ? 0.5 : 1}
        w="full"
      >
        <AccordionItem overflow={'scroll'} w="full" outline="none" border="none">
          <AccordionButton
            borderRadius="12px"
            backgroundColor={'neutral.2'}
            p="16px"
            _expanded={{
              backgroundColor: 'neutral.3',
              borderBottomLeftRadius: '0px',
              borderBottomRightRadius: '0px',
            }}
            _hover={{
              backgroundColor: 'neutral.3',
            }}
            w="full"
          >
            <HStack justify={'space-between'} w="full">
              <HStack justify={'space-between'} w="full">
                <HStack gap={{ base: '6px', md: '8px' }}>
                  <Box as="p" textStyle={{ base: 'title6', md: 'title4' }} color="neutral.11">
                    {hackathonName}
                  </Box>
                </HStack>
                <HStack display={{ base: 'none', md: 'flex' }}>
                  <RoundStatus startDate={startTime} endDate={endTime} />
                </HStack>
              </HStack>
              <AccordionIcon display={{ base: 'none', md: 'block' }} />
            </HStack>
          </AccordionButton>
          <AccordionPanel
            backgroundColor={'neutral.3'}
            borderBottomRightRadius={'12px'}
            borderBottomLeftRadius={'12px'}
          >
            <Tabs variant={'cubik'}>
              <TabList gap="12px" height="2.5rem">
                <Tab height="2.5rem" fontSize={{ base: '14px', md: '17px' }}>
                  Details
                </Tab>
                {/* <Tab height="2.5rem" fontSize={{ base: '14px', md: '17px' }}>
                      Contributors
                    </Tab> */}
              </TabList>
              <TabPanels p={'0'}>
                <TabPanel>
                  {
                    <Stack
                      gap={{ base: '64px', sm: '72px', md: '80px' }}
                      padding={{
                        base: '0px',
                        sm: '0px',
                        md: '0px 16px',
                      }}
                      direction={{ base: 'column', lg: 'row' }}
                    >
                      <FundingOverview
                        amountRaise={amountRaise ?? 0}
                        projectId={projectId as string}
                        roundId={id}
                        roundStartDate={startTime}
                        roundEndDate={endTime}
                      />
                      <ProjectInsights
                        projectId={projectId as string}
                        roundId={id}
                        roundStartDate={startTime}
                        roundEndDate={endTime}
                      />
                    </Stack>
                  }
                </TabPanel>
                {/* <TabPanel p="0">
                      <Flex direction="column" w="full" gap="32px" overflow={'scroll'}>
                        <ProjectContributorsAdminView
                          contributorsData={round.fundingRound.Contribution}
                        />
                      </Flex>
                    </TabPanel> */}
              </TabPanels>
            </Tabs>
          </AccordionPanel>
        </AccordionItem>
      </Skeleton>
    </ErrorBoundaryWrapper>
  );
};

export default AdminProjectHackathonCard;
