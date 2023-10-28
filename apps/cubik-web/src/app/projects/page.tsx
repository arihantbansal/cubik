import type { Metadata } from 'next';
import type {
  ProjectExploreBanner,
  ProjectExplorerType,
} from '@/types/explorer';
import { Box, Container, VStack } from '@/utils/chakra';

import { prisma } from '@cubik/database';

import Projects from './components';
import { ExploreBanner } from './components/Banner/ExploreBanner';

function shuffle<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  shuffledArray.sort(() => Math.random() - 0.5);
  return shuffledArray;
}

export const projectExplorer = async () => {
  try {
    const projectJoinRoundPromise = prisma.projectJoinRound.findMany({
      where: {
        status: 'APPROVED',
        round: {
          endTime: {
            gte: new Date(),
          },
        },
        isArchive: false,
      },
      select: {
        id: true,
        _count: true,
        amountRaise: true,
        round: {
          select: {
            id: true,
            name: true,
            colorScheme: true,
            matchedPool: true,
            endTime: true,
            startTime: true,
            registrationEndDate: true,
            registrationStartDate: true,
            contribution: {
              select: {
                projectId: true,
                user: {
                  select: {
                    profilePicture: true,
                  },
                },
              },
            },
          },
        },

        project: {
          select: {
            slug: true,
            owner: {
              select: {
                username: true,
              },
            },
            id: true,
            name: true,
            logo: true,
            shortDescription: true,
            industry: true,
          },
        },
      },
    });
    const projectJoinHackathonPromise = prisma.projectJoinHackathon.findMany({
      where: {
        project: {
          // status: "VERIFIED",
        },
        hackathon: {
          isActive: true,
        },
        isArchive: false,
      },
      select: {
        amount: true,
        id: true,
        tracks: true,
        project: {
          select: {
            slug: true,
            owner: {
              select: {
                username: true,
              },
            },
            name: true,
            id: true,
            logo: true,
            shortDescription: true,
            industry: true,
          },
        },
        hackathon: {
          select: {
            id: true,
            background: true,
            name: true,
            prizePool: true,
            shortDescription: true,
            logo: true,
            hackathonEndDate: true,
            hackathonStartDate: true,
            votingEndDate: true,
            votingStartDate: true,
            contribution: {
              select: {
                projectId: true,
                user: {
                  select: {
                    id: true,
                    profilePicture: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    const activeRoundPromise = prisma.round.findMany({
      where: {
        endTime: {
          gte: new Date(),
        },
      },
      select: {
        startTime: true,
        colorScheme: true,
        name: true,
        endTime: true,
        matchedPool: true,
        id: true,
        shortDescription: true,
      },
    });
    const activeHackathonPromise = prisma.hackathon.findMany({
      where: {
        isActive: true,
      },
      select: {
        background: true,
        name: true,
        prizePool: true,
        shortDescription: true,
        logo: true,
        id: true,
        hackathonEndDate: true,
        hackathonStartDate: true,
        votingEndDate: true,
        votingStartDate: true,
        hackathonSponsors: {
          select: {
            name: true,
          },
        },
      },
    });
    const [
      projectJoinRound,
      projectJoinHackathon,
      activeHackathon,
      activeRound,
    ] = await Promise.all([
      projectJoinRoundPromise,
      projectJoinHackathonPromise,
      activeHackathonPromise,
      activeRoundPromise,
    ]);
    const final: ProjectExplorerType[] = [];
    const banner: ProjectExploreBanner[] = [];
    projectJoinRound.forEach((project) => {
      final.push({
        id: project.project.id,
        logo: project.project.logo,
        industry: project.project.industry,
        title: project.project.name,
        slug: project.project.slug || '',
        contributorCount:
          project.round.contribution.filter(
            (e) => e.projectId === project.project.id,
          ).length - 3 || 0,
        contributors:
          project.round.contribution
            .filter((e) => e.projectId === project.project.id)
            .slice(3) || [],
        projectShortDescription: project.project.shortDescription,
        ownerName: project.project.owner.username as string,
        projectEvent: {
          eventName: 'round',
          color: 'teal',
          amount: project.amountRaise || 0,
          id: project.round.id,
          end: project.round.endTime,
          start: project.round.startTime,
          registrationEnd: project.round.registrationEndDate,
          registrationStart: project.round.registrationStartDate,
          name: project.round.name,
        },
      });
    });

    projectJoinHackathon.forEach((project) => {
      const users: string[] = [];

      const pr = project.hackathon.contribution.filter(
        (e) => e.projectId === project.project.id,
      );
      pr.forEach((e) => {
        if (!users.includes(e.user.id)) {
          users.push(e.user.id);
        }
      });

      final.push({
        id: project.project.id,
        logo: project.project.logo,
        industry: project.project.industry,
        slug: project.project.slug || '',
        title: project.project.name,
        contributorCount: users.length > 3 ? users.length - 3 : 0,
        contributors:
          project.hackathon.contribution.filter(
            (e) => e.projectId === project.project.id,
          ).length > 3
            ? project.hackathon.contribution
                .filter((e) => e.projectId === project.project.id)
                .slice(3)
            : project.hackathon.contribution.filter(
                (e) => e.projectId === project.project.id,
              ),
        ownerName: project.project.owner.username as string,
        projectShortDescription: project.project.shortDescription,
        projectEvent: {
          tracks: project.tracks as any,
          eventName: 'hackathon',
          amount: project.amount,
          bg: project.hackathon.background,
          id: project.hackathon.id,
          votingStart: project.hackathon.votingStartDate as Date,
          votingEnd: project.hackathon.votingEndDate as Date,
          hackathonEnd: project.hackathon.hackathonEndDate as Date,
          hackathonStart: project.hackathon.hackathonStartDate as Date,
          name: project.hackathon.name,
        },
      });
    });
    activeHackathon.forEach((hackathon) => {
      banner.push({
        bgImage: hackathon.background,
        id: hackathon.id,
        matchingPool: hackathon.prizePool,
        name: hackathon.name,
        type: 'hackathon',
        submissionEndDate: hackathon.hackathonEndDate as Date,
        endTime: hackathon.votingEndDate as Date,
        startTime: hackathon.votingStartDate as Date,
        shortDescription: hackathon.shortDescription,
        hackathonTracks: hackathon.hackathonSponsors.map((e) => e.name),
      });
    });

    activeRound.forEach((round) => {
      banner.push({
        colorScheme: round.colorScheme,
        endTime: round.endTime,
        id: round.id,
        matchingPool: round.matchedPool,
        name: round.name,
        type: 'round',
        submissionEndDate: round.startTime,
        startTime: round.startTime,
        shortDescription: round.shortDescription,
      });
    });

    const shuffleFinal = shuffle(final);

    return {
      projects: shuffleFinal,
      banner: banner,
    };
  } catch (error) {
    console.log(error);
    return {
      projects: [],
      banner: [],
    };
  }
};

export const metadata: Metadata = {
  title: 'Projects - Cubik',
  metadataBase: new URL('https://res.cloudinary.com'),
  description: 'Browse projects and Cubik and support them',
  openGraph: {
    images: ['/demonicirfan/image/upload/v1692786112/OG-Grant_23_tbhrsg.png'],
    type: 'website',
    title: 'Cubik',
    description: 'Browse projects and Cubik and support them',
  },
  twitter: {
    title: 'Cubik',
    card: 'summary_large_image',
    images: ['/demonicirfan/image/upload/v1692786112/OG-Grant_23_tbhrsg.png'],
    description: 'Browse projects and Cubik and support them',
  },
};
export default async function () {
  const explorerData = await projectExplorer();
  return (
    <>
      <Box bg={'black'} w="full" h="full" pt="4.5rem">
        <Container
          px={{ base: '0.6rem', sm: '0.8rem', md: '2rem', xl: '0px' }}
          maxW="7xl"
          py={{ base: '12px', md: '18px' }}
        >
          <VStack
            gap={{ base: '24px', sm: '30px', md: '42px' }}
            w="full"
            alignItems={'start'}
            justifyContent="start"
          >
            <ExploreBanner banner={explorerData.banner || []} />
            <Box
              color="neutral.11"
              as="p"
              display={{ base: 'block', md: 'none' }}
              textStyle={{ base: 'title1', sm: 'title2', md: 'title1' }}
            >
              Projects
            </Box>
            <Projects
              banner={explorerData.banner || []}
              projects={explorerData.projects}
            />
          </VStack>
        </Container>
      </Box>
    </>
  );
}

export const revalidate = 3600;
