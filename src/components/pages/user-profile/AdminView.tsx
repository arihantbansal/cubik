import {
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { User } from '~/types/user';
import ProfileHeader from './ProfileHeader';
import ProjectAdminCard from './projects-tab/ProjectAdminCard';

const AdminView = ({ user }: { user: User }) => {
  return (
    <Container
      maxW={'full'}
      display="flex"
      flexDir={'column'}
      gap="48px"
      my="8rem"
    >
      <ProfileHeader user={user} />
      <Tabs variant={'cubik'}>
        <TabList>
          <Tab>Details</Tab>
          <Tab>Contributions</Tab>
          <Tab>Projects</Tab>
        </TabList>
        <TabPanels p={{ base: '1rem', md: '0rem' }}>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
          <TabPanel>
            <Container
              maxW={'full'}
              p="0"
              display={'flex'}
              flexDir="column"
              gap="32px"
            >
              {user.projects.map((project) => (
                <ProjectAdminCard
                  project={project}
                  key={project.project_name}
                />
              ))}
            </Container>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default AdminView;
