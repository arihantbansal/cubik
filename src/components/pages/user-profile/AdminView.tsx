import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { ProjectsModel } from '@prisma/client';
import { FC, Key, memo, useEffect, useState } from 'react';
import { useErrorBoundary } from '~/hooks/useErrorBoundary';
import { UserWithProjectType } from '~/types/user';
import ProfileHeader from './ProfileHeader';
import UserContributions from './contributions-tab/UserContributions';
import UserDetails from './details-tab/UserDetails';
import UserProofs from './details-tab/UserProofs';
import { AdminProjectEmptyState } from './empty-states/ProjectEmptyState';
import ProjectAdminCard from './projects-tab/ProjectAdminCard';

type adminViewType = {
  user: UserWithProjectType | null | undefined;
  isLoading: boolean;
};

const AdminView: FC<adminViewType> = ({ user, isLoading }: adminViewType) => {
  const { ErrorBoundaryWrapper } = useErrorBoundary();
  const [loading, setLoading] = useState(false);
  const [tabIndex, setTabIndex] = useState(0); // New state variable

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 5000);
  }, []);

  //if (isLoading) return <AdminViewSkeleton />;

  return (
    <ErrorBoundaryWrapper>
      <Flex
        overflow={'none'}
        w={'full'}
        flexDir={'column'}
        gap={{ base: '28px', sm: '40px', md: '56px' }}
      >
        <ProfileHeader isLoading={isLoading} user={user} />
        <Tabs index={tabIndex} onChange={setTabIndex} variant={'cubik'}>
          <TabList>
            <Tab>Details</Tab>
            <Tab>Projects</Tab>
            <Tab>Contributions</Tab>
          </TabList>
          <TabPanels p={'0'}>
            <TabPanel>
              <Flex maxW={'full'} p="0" flexDir="column" gap="32px">
                <UserDetails
                  userId={user?.id as string}
                  isLoading={isLoading}
                />
                <UserProofs isLoading={isLoading} />
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex direction="column" w="full" gap="32px">
                {user?.project.length ? (
                  user?.project.map(
                    (project: ProjectsModel, key: Key | null | undefined) => (
                      <ProjectAdminCard project={project} key={key} />
                    )
                  )
                ) : (
                  <AdminProjectEmptyState />
                )}
              </Flex>
            </TabPanel>
            <TabPanel w="full">
              <UserContributions userId={user?.id} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </ErrorBoundaryWrapper>
  );
};

export default memo(AdminView);
