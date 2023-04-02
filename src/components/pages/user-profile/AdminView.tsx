import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { FC, memo } from 'react';

import { useErrorBoundary } from '~/hooks/useErrorBoundary';
import { UserWithProjectType } from '~/types/user';
import UserDetails from './details-tab/UserDetails';
import { AdminProjectEmptyState } from './empty-states/ProjectEmptyState';

import ProfileHeader from './ProfileHeader';
import ProjectAdminCard from './projects-tab/ProjectAdminCard';
import { AdminViewSkeleton } from './skeletons/ProfileViewSkeletons';

type adminViewType = {
  user: UserWithProjectType;
  isLoading: boolean;
};

const AdminView: FC<adminViewType> = ({ user, isLoading }: adminViewType) => {
  const { hasError, ErrorBoundaryWrapper } = useErrorBoundary();

  if (hasError) {
    return <p>Custom error message or fallback UI</p>;
  }

  if (isLoading) return <AdminViewSkeleton />;

  return (
    <ErrorBoundaryWrapper>
      <Flex
        w={'full'}
        flexDir={'column'}
        gap={{ base: '32px', sm: '40px', md: '56px' }}
      >
        <ProfileHeader user={user} />
        <Tabs variant={'cubik'}>
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
                {user.project.length ? (
                  user.project.map((project, key) => (
                    <ProjectAdminCard project={project} key={key} />
                  ))
                ) : (
                  <AdminProjectEmptyState />
                )}
              </Flex>
            </TabPanel>
            <TabPanel></TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </ErrorBoundaryWrapper>
  );
};

export default memo(AdminView);
