import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { FC, memo } from 'react';
import { UserWithProjectType } from '~/types/user';
import UserDetails from './details-tab/UserDetails';
import { VisitorProjectEmptyState } from './empty-states/ProjectEmptyState';
import ProfileHeader from './ProfileHeader';
import ProjectVisitorCard from './projects-tab/ProjectVisitorCard';
import { VisitorViewSkeleton } from './skeletons/ProfileViewSkeletons';
import { ProjectVerifyStatus } from '@prisma/client';

type visitorViewType = {
  user: UserWithProjectType;
  isLoading: boolean;
};

const VisitorView: FC<visitorViewType> = ({
  user,
  isLoading,
}: visitorViewType) => {
  if (isLoading) return <VisitorViewSkeleton />;
  // filter projects by status and remove the project with ProjectVerifyStatus.REVIEW
  const filteredProjects = user.project.filter(
    (project) => project.status !== ProjectVerifyStatus.REVIEW
  );
  return (
    <Flex flexDir={'column'} gap="48px">
      <ProfileHeader user={user} />
      <Tabs variant={'cubik'} isLazy>
        <TabList>
          <Tab>Details</Tab>
          <Tab>Projects</Tab>
          <Tab>Contributions</Tab>
        </TabList>
        <TabPanels p={'0'}>
          <TabPanel>
            <Flex maxW={'full'} p="0" flexDir="column" gap="32px">
              <UserDetails />
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex direction="column" w="full" gap="32px">
              {filteredProjects.length ? (
                filteredProjects.map((project, key) => (
                  <ProjectVisitorCard project={project} key={key} />
                ))
              ) : (
                <VisitorProjectEmptyState />
              )}
            </Flex>
          </TabPanel>
          <TabPanel></TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default memo(VisitorView);
