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
import UserProofs from './details-tab/UserProofs';
import { VisitorProjectEmptyState } from './empty-states/ProjectEmptyState';
import ProfileHeader from './ProfileHeader';
import ProjectVisitorCard from './projects-tab/ProjectVisitorCard';

type visitorViewType = {
  user: UserWithProjectType | null | undefined;
  isLoading: boolean;
};

const VisitorView: FC<visitorViewType> = ({
  user,
  isLoading,
}: visitorViewType) => {
  return (
    <Flex flexDir={'column'} gap="48px">
      <ProfileHeader isLoading={isLoading} user={user} />
      <Tabs variant={'cubik'} isLazy>
        <TabList>
          <Tab>Details</Tab>
          <Tab>Projects</Tab>
          <Tab>Contributions</Tab>
        </TabList>
        <TabPanels p={'0'}>
          <TabPanel p="0">
            <Flex maxW={'full'} p="0" flexDir="column" gap="40px" py="40px">
              <UserDetails isLoading={isLoading} />
              <UserProofs isLoading={isLoading} />
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex direction="column" w="full" gap="32px">
              {user && user.project.length ? (
                user.project.map((project, key) => (
                  <ProjectVisitorCard project={project} key={key} />
                ))
              ) : (
                <VisitorProjectEmptyState />
              )}
            </Flex>
          </TabPanel>
          <TabPanel>{/* <UserContributions userId={user.id} /> */}</TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default memo(VisitorView);
