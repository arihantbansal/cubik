import { Container, Stack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import ComponentErrors from '~/components/errors/ComponenetErrors';
import { ProjectInteractions } from '~/components/pages/projects/project-details/project-interactions/ProjectInteractions';
import { ProjectDetailsAndTabs } from '~/components/pages/projects/project-details/ProjectDetailsAndTabs';
import ProjectDetailsLiveRoundStatus from '~/components/pages/projects/project-details/ProjectDetailsLiveRoundStatus';
import SEO from '~/components/SEO';
import { Mixpanel } from '~/utils/mixpanel';
import { trpc } from '~/utils/trpc';

const ProjectDetails = ({ projectId }: { projectId: string }) => {
  const { data, isError, isLoading, error } = trpc.project.findOne.useQuery({
    id: projectId as string,
    projectJoinId: null,
  });

  Mixpanel.track('project_page_load', {
    id: projectId,
  });

  if (isError) {
    return <ComponentErrors error={error} />;
  }

  if (typeof window !== 'undefined') {
    const url = new URL(window.location.href);
    const round = url.searchParams.get('round');
    const prev = url.searchParams.get('prev');
    console.log('round, prev - ', round, prev);
  }

  return (
    <>
      <SEO
        title={`${data ? data.name : 'Project'} - Cubik`}
        description={`${data ? data.short_description : ''}`}
        image={data ? data?.logo : ''}
      />
      <main style={{ width: 'full' }}>
        <Container maxW={'full'} p="0">
          <ProjectDetailsLiveRoundStatus projectDetails={data} />
          <Stack
            maxW="7xl"
            mx="auto"
            direction={{ base: 'column', lg: 'row' }}
            gap={{ base: '24px', md: '12px', lg: '60px', xl: '100px' }}
            px={{ base: '1rem', sm: '2rem', md: '2rem', xl: '1rem' }}
            py={{ base: '24px', md: '64px' }}
            alignItems={'start'}
            justifyContent={'start'}
          >
            <ProjectDetailsAndTabs
              projectDetails={data}
              isLoading={isLoading}
            />
            <ProjectInteractions projectDetails={data} isLoading={isLoading} />
          </Stack>
        </Container>
      </main>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const projectId = context.query.projectId as string;

  return {
    props: { projectId },
  };
};

export default ProjectDetails;
