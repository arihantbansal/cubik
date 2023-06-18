import { ProjectJoinRoundStatus } from '.prisma/client';
import { Container, Skeleton, Stack } from '@chakra-ui/react';
import { isPast } from 'date-fns';
import { GetServerSideProps } from 'next';
import ComponentErrors from '~/components/errors/ComponenetErrors';
import { ProjectInteractions } from '~/components/pages/projects/project-details/project-interactions/ProjectInteractions';
import { ProjectDetailsAndTabs } from '~/components/pages/projects/project-details/ProjectDetailsAndTabs';
import ProjectDetailsLiveRoundStatus from '~/components/pages/projects/project-details/ProjectDetailsLiveRoundStatus';
import SEO from '~/components/SEO';
import { Mixpanel } from '~/utils/mixpanel';
import { trpc } from '~/utils/trpc';

const ProjectDetails = ({
  projectId,
  joinId,
}: {
  projectId: string;
  joinId: string;
}) => {
  const { data, isLoading, isError, error } =
    trpc.project.findOneJoinRound.useQuery({
      id: joinId as string,
    });

  Mixpanel.track('project_page_load', {
    id: projectId,
    name: data?.project.name,
  });

  if (isError) {
    return <ComponentErrors error={error} />;
  }

  const RoundStatusBanner = () => {
    if (isPast(data?.fundingRound.startTime as Date)) {
      return (
        <ProjectDetailsLiveRoundStatus
          endTime={data?.fundingRound.endTime as Date}
          startTime={data?.fundingRound.startTime as Date}
          status={'LIVE'}
          show={true}
          roundName={data?.fundingRound.roundName as string}
        />
      );
    } else return <></>;
  };

  return (
    <>
      <SEO
        title={`${data ? data?.project?.name : 'Project'} - Cubik`}
        description={`${data ? data?.project?.short_description : ''}`}
        image={data ? data?.project?.logo : ''}
      />
      <main style={{ width: 'full' }}>
        <Container maxW={'full'}>
          {joinId && (
            <Skeleton
              isLoaded={!isLoading}
              w="full"
              maxW="7xl"
              mx="auto"
              fadeDuration={3}
              opacity={isLoading ? 0.3 : 1}
              h={isLoading ? '3rem' : 'auto'}
            >
              <RoundStatusBanner />
            </Skeleton>
          )}
          <Stack
            maxW="7xl"
            mx="auto"
            direction={{ base: 'column', lg: 'row' }}
            gap={{ base: '24px', md: '12px', lg: '60px', xl: '100px' }}
            px={{ base: '0.5rem', sm: '2rem', md: '2rem', xl: '1rem' }}
            py={{ base: '24px', md: '64px' }}
            alignItems={'start'}
            justifyContent={'start'}
          >
            <ProjectDetailsAndTabs
              joinId={joinId}
              data={data}
              isLoading={isLoading}
            />
            <ProjectInteractions
              joinId={joinId}
              round={data?.fundingRound}
              projectDetails={{
                ...data?.project!!,
              }}
              contributors={data?.project.Contribution}
              funding={data?.amountRaise ?? 0}
              isLoading={isLoading}
              preview={false}
              team={data?.project.Team ?? []}
            />
          </Stack>
        </Container>
      </main>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const projectId = context.query.projectId as string;
  const join = context.query.join as string;

  return {
    props: {
      projectId,
      joinId: join,
    },
  };
};

export default ProjectDetails;
