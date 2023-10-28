import React from 'react';
import { notFound } from 'next/navigation';
import { CustomModal } from '@/app/components/common/modal';
import { ProjectHeader } from '@/app/project/components/layout/ProjectHeader';
import type {
  ProjectPageEventType,
  ProjectPageLayoutType,
} from '@/types/project';
import { Container, Stack } from '@/utils/chakra';
import { InterFont } from '@/utils/fonts/inter';

import { prisma } from '@cubik/database';

interface Props {
  params: {
    slug: string;
  };
  children: React.JSX.Element | React.JSX.Element[];
}

const fetchProject = async (
  slug: string,
): Promise<[ProjectPageLayoutType | null, Error | null]> => {
  try {
    const project = await prisma.project.findFirst({
      where: {
        isActive: true,
        isArchive: false,
        slug: slug,
      },
      select: {
        id: true,
        name: true,
        shortDescription: true,
        logo: true,
        projectLink: true,
        mutliSigAddress: true,
        projectJoinHackathon: {
          where: {
            isArchive: false,
          },
          select: {
            id: true,
            hackathonId: true,
            hackathon: {
              select: {
                name: true,
                votingStartDate: true,
                votingEndDate: true,
              },
            },
          },
        },
        projectJoinRound: {
          where: {
            isArchive: false,
          },
          select: {
            id: true,
            roundId: true,
            round: {
              select: {
                name: true,
                startTime: true,
                endTime: true,
              },
            },
          },
        },
      },
    });
    if (!project) {
      return [null, null];
    }
    const hackathons: ProjectPageEventType[] = project.projectJoinHackathon.map(
      (hackathon) => {
        return {
          eventId: hackathon.hackathonId,
          eventType: 'hackathon',
          name: hackathon.hackathon.name,
          joinId: hackathon.id,
          startTime: hackathon.hackathon.votingStartDate || new Date(),
          endTime: hackathon.hackathon.votingEndDate || new Date(),
        };
      },
    );
    const rounds: ProjectPageEventType[] = project.projectJoinRound.map(
      (round) => {
        return {
          eventId: round.roundId,
          eventType: 'round',
          name: round.round.name,
          joinId: round.id,
          startTime: round.round.startTime,
          endTime: round.round.endTime,
        };
      },
    );
    const layoutData: ProjectPageLayoutType = {
      id: project?.id,
      name: project?.name,
      shortDescription: project?.shortDescription,
      logo: project?.logo,
      projectLink: project?.projectLink,
      mutliSigAddress: project?.mutliSigAddress,
      events: [...hackathons, ...rounds],
    };
    return [layoutData, null];
  } catch (error) {
    console.log(error);
    return [null, error as Error];
  }
};

const ProjectPageLayout = async ({ params, children }: Props) => {
  const [projectWithEvent, error] = await fetchProject(params.slug as string);

  if (error || !projectWithEvent) {
    notFound();
  }

  return (
    <>
      <CustomModal>
        <Container bg={'cubik.grey.700'} maxW={'full'} p="0">
          <Stack
            maxW="7xl"
            mx="auto"
            gap={10}
            px={{ base: '1rem', sm: '2rem', md: '2rem', xl: '1rem' }}
            py={{ base: '24px', md: '64px' }}
            alignItems={'start'}
            justifyContent={'start'}
            pt={{
              base: 24,
              md: 32,
            }}
          >
            <ProjectHeader projectWithEvent={projectWithEvent} />
          </Stack>
        </Container>
        <Container
          className={InterFont.className}
          bg={'#0D0D0D'}
          w={'full'}
          maxW={'full'}
          p="0"
        >
          {children}
        </Container>
      </CustomModal>
    </>
  );
};

export default ProjectPageLayout;
