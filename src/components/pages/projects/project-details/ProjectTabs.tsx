import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { ProjectWithCommentsAndRoundsType } from '~/types/IProjectDetails';
import ProjectContributors from './project-interactions/project-tabs/ProjectContributors';
import { ProjectsDetailedDescription } from './ProjectDetailedDescription';
import Discussions from './ProjectDiscussion';

export const ProjectsTabs = ({
  projectDetails,
  isLoading,
}: {
  projectDetails: ProjectWithCommentsAndRoundsType;
  isLoading: boolean;
}) => {
  console.log('project details - ', projectDetails);
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
            description={projectDetails.long_description}
          />
        </TabPanel>
        <TabPanel>
          <ProjectContributors
            projectId={projectDetails.id}
            isLoading={isLoading}
          />
        </TabPanel>
        <TabPanel>{isLoading ? <></> : <Discussions />}</TabPanel>
      </TabPanels>
    </Tabs>
  );
};
