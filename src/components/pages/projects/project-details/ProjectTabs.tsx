import {
  Box,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { formatDate } from '~/utils/formatDates';
import { ProjectsDetailedDescription } from './ProjectDetailedDescription';
import Discussions from './ProjectDiscussion';
import ProjectContributors from './project-interactions/project-tabs/ProjectContributors';
import { ProjectsModel, Team, Contribution, UserModel } from '@prisma/client';

export const ProjectsTabs = ({
  projectDetails,
  isLoading,
  roundId,
  ownerName,
}: {
  projectDetails:
    | (ProjectsModel & {
        Team: (Team & {
          user: UserModel;
        })[];
        Contribution: (Contribution & {
          user: UserModel;
        })[];
        owner: UserModel;
      })
    | undefined;
  ownerName: string;
  roundId: string;
  isLoading: boolean;
}) => {
  // get the project id from the url using window object

  return (
    <Tabs variant={'cubik'} alignSelf={'start'} w="full">
      <TabList
        overflowY={{ base: 'hidden', md: 'inherit' }}
        overflowX={{ base: 'scroll', md: 'inherit' }}
        gap={{ base: '24px', md: '32px' }}
      >
        <Tab>Details</Tab>
        <Tab>Contributors</Tab>
        <Tab isDisabled>Discussion</Tab>
        <Tab isDisabled>Updates</Tab>
      </TabList>
      <TabPanels p="0">
        <TabPanel>
          <ProjectsDetailedDescription
            isLoading={isLoading}
            description={projectDetails?.long_description}
          />
          {projectDetails && (
            <Stack direction={{ base: 'row', md: 'row' }}>
              <Box as="p" textStyle="body4" color="neutral.7">
                Created: {formatDate(projectDetails?.createdAt ?? Date.now())}
                {''} by @{ownerName}
              </Box>
            </Stack>
          )}
        </TabPanel>
        <TabPanel overflowX="scroll">
          {projectDetails?.id && (
            <ProjectContributors
              roundId={roundId}
              projectId={projectDetails?.id}
              isLoading={isLoading}
            />
          )}
        </TabPanel>
        <TabPanel>{isLoading ? <></> : <Discussions />}</TabPanel>
      </TabPanels>
    </Tabs>
  );
};
