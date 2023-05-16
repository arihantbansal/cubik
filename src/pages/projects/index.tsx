import { Container } from '@chakra-ui/react';
import SEO from '~/components/SEO';
import AdminControls from '~/components/pages/projects/admin/AdminControls';
import ProjectsExplorer from '~/components/pages/projects/project-explorer/ProjectsExplorer';

type projectsPropsType = {
  allProjectsData: {
    data: any;
  };
};

const Projects = (_props: projectsPropsType) => {
  return (
    <>
      <SEO
        title={`Projects - Cubik`}
        description={`Browse projects and Cubik and support them`}
        image={`https://res.cloudinary.com/demonicirfan/image/upload/v1684179451/cubik%20og.png`}
      />
      <main>
        <Container
          px={{ base: '0.8rem', sm: '1rem', md: '2rem', xl: '0px' }}
          maxW="7xl"
          py={{ base: '24px', md: '40px' }}
        >
          <AdminControls />
          <ProjectsExplorer />
        </Container>
      </main>
    </>
  );
};
export default Projects;
