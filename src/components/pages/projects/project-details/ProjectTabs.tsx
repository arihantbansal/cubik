import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { ProjectsModel } from '@prisma/client';
import { ProjectWithCommentsAndRoundsType } from '~/types/IProjectDetails';
import ProjectContributors from './project-interactions/project-tabs/ProjectContributors';
import { ProjectsDetailedDescription } from './ProjectDetailedDescription';
import Discussions from './ProjectDiscussion';
import ProjectsDetailedDescriptionSkeleton from './skeletons/ProjectsDetailedDescriptionSkeleton';

export const ProjectsTabs = ({
  projectDetails,
  isLoading,
}: {
  projectDetails: ProjectWithCommentsAndRoundsType;
  isLoading: boolean;
}) => {
  return (
    <Tabs variant={'cubik'} alignSelf={'start'} w="full">
      <TabList gap={{ base: '0.5rem', md: '1rem' }}>
        <Tab>Details</Tab>
        <Tab>Discussion</Tab>
        <Tab>Contributors</Tab>
      </TabList>
      <TabPanels p="0">
        <TabPanel>
          {isLoading ? (
            <ProjectsDetailedDescriptionSkeleton />
          ) : (
            <ProjectsDetailedDescription
              description={projectDetails.long_description}
            />
          )}
        </TabPanel>
        <TabPanel>{isLoading ? '' : <Discussions />}</TabPanel>
        <TabPanel>
          <ProjectContributors />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
