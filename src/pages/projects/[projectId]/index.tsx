import { Center, Container, Spinner, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ProjectInteractions } from '~/components/pages/projects/project-details/project-interactions/ProjectInteractions';
import { ProjectDetailsAndTabs } from '~/components/pages/projects/project-details/ProjectDetailsAndTabs';
import ProjectPageLoadingSkeleton from '~/components/pages/projects/project-details/skeletons/ProjectPageLoadingSkeleton';
import SEO from '~/components/SEO';
import { trpc } from '~/utils/trpc';

const ProjectDetails = () => {
  const router = useRouter();

  const { data, isLoading, isError, error } = trpc.project.findOne.useQuery({
    id: router.query.projectId as string,
  });

  if (isError) {
    return <>{error.message}</>;
  }

  return (
    <>
      {/* <SEO
        title={(data?.name as string) ?? ''}
        description={(data?.short_description as string) ?? ''}
        image={(data?.logo as string) ?? ''}
      /> */}
      <main style={{ width: 'full' }}>
        <Container maxW={'full'} p="0" py={{ base: '2rem', md: '3rem' }}>
          <Stack
            maxW="7xl"
            mx="auto"
            direction={{ base: 'column', md: 'row' }}
            gap={{ base: '24px', md: '12px', lg: '80px', xl: '100px' }}
            px={{ base: '1rem', sm: '2rem', md: '2rem', xl: '1rem' }}
            alignItems={'start'}
            justifyContent={'start'}
          >
            {!data ? (
              <ProjectPageLoadingSkeleton />
            ) : (
              <>
                <ProjectDetailsAndTabs
                  projectDetails={data}
                  isLoading={isLoading}
                />
                <ProjectInteractions
                  projectDetails={data}
                  isLoading={isLoading}
                />
              </>
            )}
          </Stack>
        </Container>
      </main>
    </>
  );
};

export default ProjectDetails;
