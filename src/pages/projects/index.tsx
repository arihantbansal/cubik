import React from 'react';
import { Container } from '@chakra-ui/react';
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
        px={{ base: '1.5rem', sm: '2rem', md: '2rem', xl: '0px' }}
        maxW="7xl"
        py={{ base: '24px', md: '44px' }}
      >
        <ProjectsExplorer />
      </Container>
    </main>
  );
};
export default Projects;
