import { Container } from '@chakra-ui/react';
import AdminControls from '~/components/pages/projects/admin/AdminControls';
import ProjectsExplorer from '~/components/pages/projects/project-explorer/ProjectsExplorer';

type projectsPropsType = {
  allProjectsData: {
    data: any;
  };
};

const Projects = (_props: projectsPropsType) => {
  return (
    <main>
      <Container
        px={{ base: '0.8rem', sm: '1rem', md: '2rem', xl: '0px' }}
        maxW="7xl"
        py={{ base: '24px', md: '44px' }}
      >
        <AdminControls />
        <ProjectsExplorer />
      </Container>
    </main>
  );
};
export default Projects;
