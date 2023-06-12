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
  const { data, isError, isLoading, error } =
    trpc.project.findOneJoinRound.useQuery({
      id: joinId as string,
    });

  Mixpanel.track('project_page_load', {
    id: projectId,
  });

  if (isError) {
    return <ComponentErrors error={error} />;
  }

  // const isPreview = roundId === null;

  const RoundStatusBanner = () => {
    if (isPast(data?.fundingRound.startTime as Date)) {
      return (
        <ProjectDetailsLiveRoundStatus
          endTime={data?.fundingRound.endTime as Date}
          startTime={data?.fundingRound.startTime as Date}
          status={'LIVE'}
          roundName={data?.fundingRound.roundName as string}
        />
      );
    } else return <></>;
  };

  return (
    <>
      <SEO
        title={`${data ? data.project.name : 'Project'} - Cubik`}
        description={`${data ? data.project.short_description : ''}`}
        image={data ? data?.project.logo : ''}
      />
      <main style={{ width: 'full' }}>
        <Container maxW={'full'}>
          <Skeleton
            isLoaded={!isLoading}
            w="full"
            h="auto"
            maxW="7xl"
            mx="auto"
          >
            {joinId && <RoundStatusBanner />}
          </Skeleton>
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
              funding={data?.amountRaise ?? 0}
              contributors={data?.project.Contribution.length ?? 0}
              ownerName={data?.project.owner.username as string}
              roundId={data?.fundingRound.id as string}
              isLoading={isLoading}
              projectJoinRoundId={data?.id as string}
              roundName={data?.fundingRound.roundName as string}
              team={data?.project.Team ?? []}
              projectDetails={{
                ...data?.project!!,
              }}
            />

            <ProjectInteractions
              round={data?.fundingRound}
              projectDetails={{
                ...data?.project!!,
              }}
              contributors={data?.project.Contribution.length ?? 0}
              funding={data?.amountRaise ?? 0}
              roundId={data?.fundingRound.id as string}
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
