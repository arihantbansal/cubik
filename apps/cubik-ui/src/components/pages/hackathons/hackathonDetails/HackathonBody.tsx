import {
  Center,
  Container,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import HackathonInteractions from './HackathonInteractions';
import { ProjectsDetailedDescription } from '../../projects/project-details/ProjectDetailedDescription';
import { Team, UserModel } from '@cubik/database';
import {
  HackathonHost,
  HackathonSchedule as HackathonScheduleType,
  HackathonSocial,
  HackathonTracks,
} from '~/types/hackathon';
import HackathonSchedule from './HackathonSchedule';

const HackathonBody = ({
  isLoading,
  description,
  host,
  prize_pool,
  timeline,
  social,
  team,
  hackathonId,
  tracks,
}: {
  isLoading: boolean;
  description?: string;
  prize_pool?: number;
  tracks: HackathonTracks[];
  host?: HackathonHost[];
  timeline?: HackathonScheduleType;
  social?: HackathonSocial[];
  team: (Team & {
    user: UserModel;
  })[];
  hackathonId: string;
}) => {
  return (
    <Container p="0px" maxW="full">
      <Stack
        gap={{ base: '12px', md: '24px', lg: '8rem' }}
        w="full"
        alignItems="top"
        direction={{ base: 'column-reverse', lg: 'row' }}
      >
        <Center w="full" flex={3.5}>
          <Tabs variant={'cubik'} alignSelf={'start'} w="full">
            <TabList
              overflowY={{ base: 'hidden', md: 'inherit' }}
              overflowX={{ base: 'scroll', md: 'inherit' }}
              gap={{ base: '24px', md: '32px' }}
            >
              <Tab>Details</Tab>
              <Tab>Schedule</Tab>
              <Tab>Tracks</Tab>
            </TabList>
            <TabPanels p="0">
              <TabPanel>
                <ProjectsDetailedDescription
                  isLoading={isLoading}
                  description={description}
                />
              </TabPanel>
              <TabPanel>
                <HackathonSchedule />
              </TabPanel>
              <TabPanel overflowX="scroll"></TabPanel>
            </TabPanels>
          </Tabs>
        </Center>
        <Center w="full" h="full" flex={1.5}>
          <HackathonInteractions
            hackathonId={hackathonId as string}
            prizePool={prize_pool?.toLocaleString() ?? '0'}
            isLoading={isLoading}
            team={team}
            sponsors={[]}
          />
        </Center>
      </Stack>
    </Container>
  );
};

export default HackathonBody;
