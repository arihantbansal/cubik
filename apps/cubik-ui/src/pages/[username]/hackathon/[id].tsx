import { Container, Stack } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import { HackathonSchedule } from '@cubik/common-types';
import { ProjectsModel } from '@prisma/client';
import { isPast } from 'date-fns';
import { GetServerSideProps } from 'next';
import React from 'react';
import SEO from '~/components/SEO';
import ComponentErrors from '~/components/errors/ComponentErrors';
import { ProjectDetailsAndTabs } from '~/components/pages/projects/project-details/ProjectDetailsAndTabs';
import ProjectDetailsLiveRoundStatus from '~/components/pages/projects/project-details/ProjectDetailsLiveRoundStatus';
import { ProjectInteractions } from '~/components/pages/projects/project-details/project-interactions/ProjectInteractions';
import { trpc } from '~/utils/trpc';
interface Props {
  id: string;
}
const HackathonJoinPage = ({ id }: Props) => {
  const { data, isError, error, isLoading } = trpc.project.findOneHackthon.useQuery({
    id: id,
  });

  if (isError) {
    return <ComponentErrors error={error} />;
  }

  const RoundStatusBanner = () => {
    if (!data) return <> </>;

    const timeline = (data?.hackathon.timeline as unknown as HackathonSchedule).sort(
      (a, b) => a.index - b.index,
    );
    if (isPast(timeline[2].start as Date)) {
      return (
        <ProjectDetailsLiveRoundStatus
          endTime={timeline[2].end as Date}
          startTime={timeline[2].start as Date}
          status={'LIVE'}
          show={true}
          roundName={data?.hackathon.name as string}
        />
      );
    } else return <></>;
  };

  return (
    <>
      <SEO
        title={`${data ? data?.projectsModel?.name : 'Project'} - Cubik`}
        description={`${data ? data?.projectsModel?.short_description : ''}`}
        image={data ? data?.projectsModel?.logo : ''}
      />

      <Container maxW={'full'} p="0">
        {id && (
          <Skeleton
            isLoaded={!isLoading}
            w="full"
            maxW="7xl"
            mx="auto"
            fadeDuration={2}
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
          px={{ base: '1rem', sm: '2rem', md: '2rem', xl: '1rem' }}
          py={{ base: '24px', md: '64px' }}
          alignItems={'start'}
          justifyContent={'start'}
        >
          <ProjectDetailsAndTabs
            projectDetails={{
              ...data?.projectsModel!!,
            }}
            roundId={data?.hackathon.id as string}
            joinId={id}
            isLoading={isLoading}
            amountRaise={0}
            contributions={0}
            communityContributions={0}
          />

          <ProjectInteractions
            projectDetails={data?.projectsModel as ProjectsModel}
            isLoading={isLoading}
            preview={true}
            team={data?.projectsModel.Team || []}
          />
        </Stack>
      </Container>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async context => {
  const id = context.query.id as string;

  return {
    props: {
      id: id,
    },
  };
};
export default HackathonJoinPage;
