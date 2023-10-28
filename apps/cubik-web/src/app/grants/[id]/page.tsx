import React from 'react';
import { Box, Container } from '@/utils/chakra';

import { prisma } from '@cubik/database';
import type { Prisma } from '@cubik/database';

import type { ProjectJoinRoundReturnType } from '../components/GrantDetailsBody';
import { GrantDetailsBody } from '../components/GrantDetailsBody';
import { GrantDetailsHeader } from '../components/GrantDetailsHeader';

type GrantReturnType = Prisma.RoundGetPayload<{
  select: {
    name: true;
    startTime: true;
    endTime: true;
    matchedPool: true;
    shortDescription: true;
    description: true;
    projectJoinRound: {
      select: {
        id: true;
        status: true;
        project: {
          select: {
            id: true;
            name: true;
            shortDescription: true;
            logo: true;
            industry: true;
            projectLink: true;
            owner: {
              select: {
                username: true;
              };
            };
          };
        };
      };
    };
  };
}>;

const getGrant = async (
  id: string,
): Promise<[GrantReturnType | null, boolean]> => {
  try {
    const res = await prisma.round.findFirst({
      where: {
        id: id,
      },
      select: {
        name: true,
        endTime: true,
        matchedPool: true,
        startTime: true,
        shortDescription: true,
        description: true,
        projectJoinRound: {
          where: {
            status: 'APPROVED',
          },
          select: {
            id: true,
            status: true,
            project: {
              select: {
                id: true,
                name: true,
                shortDescription: true,
                logo: true,
                industry: true,
                projectLink: true,
                owner: {
                  select: {
                    username: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return [res, false];
  } catch (error) {
    console.log(error);
    return [null, true];
  }
};

const GrantPage = async ({ params }: { params: { id: string } }) => {
  const [grant, error] = await getGrant(params.id);
  return (
    <>
      <main>
        <Container
          py={{ base: '32px', md: '80px' }}
          maxW="7xl"
          px="1rem"
          display={'flex'}
          flexDir={'column'}
          gap={{ base: '32px', md: '60px' }}
        >
          <GrantDetailsHeader
            endTime={grant?.endTime || new Date()}
            isLoading={false}
            matchingPool={grant?.matchedPool || 0}
            roundName={grant?.name || ''}
            shortDescription={grant?.shortDescription || ''}
            startTime={grant?.startTime || new Date()}
          />

          <Box h="1px" backgroundColor="#1D1F1E90" w="full" />

          <GrantDetailsBody
            description={grant?.description || ''}
            isError={error}
            isLoading={false}
            projectJoinRound={
              (grant?.projectJoinRound as unknown as ProjectJoinRoundReturnType[]) ??
              []
            }
          />
        </Container>
      </main>
    </>
  );
};

export default GrantPage;
