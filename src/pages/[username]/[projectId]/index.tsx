import { Container, Stack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { join } from 'path';
import ComponentErrors from '~/components/errors/ComponenetErrors';
import { ProjectInteractions } from '~/components/pages/projects/project-details/project-interactions/ProjectInteractions';
import { ProjectDetailsAndTabs } from '~/components/pages/projects/project-details/ProjectDetailsAndTabs';
import ProjectDetailsLiveRoundStatus from '~/components/pages/projects/project-details/ProjectDetailsLiveRoundStatus';
import SEO from '~/components/SEO';
import { Mixpanel } from '~/utils/mixpanel';
import { trpc } from '~/utils/trpc';

const ProjectDetails = ({
  projectId,
  roundId,
}: {
  projectId: string;
  roundId: string | null;
}) => {
  const { data, isError, isLoading, error } = trpc.project.findOne.useQuery({
    id: projectId as string,
    projectJoinId: roundId,
  });

  Mixpanel.track('project_page_load', {
    id: projectId,
  });

  if (isError) {
    return <ComponentErrors error={error} />;
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
          {roundId && <ProjectDetailsLiveRoundStatus projectDetails={data} />}
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
              roundId={
                data?.ProjectJoinRound.find((e) => e.id === roundId)?.roundId ??
                ''
              }
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

  const roundId = context.query.round as string;
  const prev = context.query.prev as string | undefined;

  if (prev) {
    return {
      props: { projectId, roundId: null },
    };
  } else {
    if (roundId) {
      return {
        props: { projectId, roundId },
      };
    }
    return {
      props: { projectId, roundId: null },
    };
  }
};

export default ProjectDetails;
