import { Center, Container, Stack } from '@chakra-ui/react';
import { QueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { AboutProject } from '~/components/pages/projects/project-details/AboutProject';
import { ProjectInteractions } from '~/components/pages/projects/project-details/project-interactions/ProjectInteractions';
import SEO from '~/components/SEO';
import { trpc } from '~/utils/trpc';

const ProjectDetails = () => {
  const router = useRouter();

  const project = trpc.project.findOne.useQuery({
    id: router.query.projectId as string,
  });
  console.log('project status - ', project.isLoading);
  console.log('project data -', project.data);
  return (
    <>
      <SEO
        title={(project.data?.name as string) ?? ''}
        description={(project.data?.short_description as string) ?? ''}
        image={(project.data?.logo as string) ?? ''}
      />
      <main style={{ width: 'full' }}>
        <Container maxW={'full'} p="0" py={{ base: '6rem', md: '8rem' }}>
          <Stack
            maxW="7xl"
            mx="auto"
            direction={{ base: 'column', md: 'row' }}
            gap={{ base: '24px', md: '120px' }}
            px={{ base: '1rem', sm: '2rem', md: '2rem', xl: '1rem' }}
          >
            {/* <AboutProject
              loading={project.isLoading}
              projectDetails={project.data}
            /> */}
            <ProjectInteractions
              loading={project.isLoading}
              projectDetails={project.data}
            />
          </Stack>
        </Container>
      </main>
    </>
  );
};

export default ProjectDetails;
