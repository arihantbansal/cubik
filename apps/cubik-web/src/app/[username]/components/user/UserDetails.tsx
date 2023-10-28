import React from 'react';
import { Box, Card, Center, HStack, Stack, VStack } from '@/utils/chakra';

import { prisma } from '@cubik/database';

import { OverviewStatsCard } from './OverviewStatsCard';

interface Props {
  username: string;
}
export const getUserDetails = async (username: string) => {
  const userContributions = await prisma.user.findFirst({
    where: {
      username: username,
    },
    select: {
      project: {
        select: {
          projectJoinHackathon: {
            select: {
              amount: true,
            },
          },
          projectJoinRound: {
            select: {
              amountRaise: true,
            },
          },
        },
      },
      contribution: {
        orderBy: {
          createdAt: 'asc',
        },
        select: {
          totalUsdAmount: true,
        },
      },
    },
  });
  let totalDonated = 0;
  let lastContribution = 0;
  let totalRaised = 0;

  userContributions?.project.forEach((project) => {
    if (project.projectJoinHackathon) {
      project.projectJoinHackathon.forEach((hackathon) => {
        totalRaised += hackathon.amount;
      });
    }

    if (project.projectJoinRound) {
      project.projectJoinRound.forEach((round) => {
        totalRaised += round.amountRaise as number;
      });
    }
  });

  userContributions?.contribution.forEach((contribution) => {
    totalDonated += contribution.totalUsdAmount;
    lastContribution = contribution.totalUsdAmount;
  });
  return {
    totalDonated,
    lastContribution,
    totalRaised,
  };
};

export const UserDetails = async ({ username }: Props) => {
  const user = await getUserDetails(username);
  return (
    <>
      <VStack
        align="start"
        w="full"
        gap={{ base: '16px', sm: '20px', md: '24px' }}
      >
        <Box
          as="p"
          textStyle={{ base: 'title4', md: 'title3' }}
          color="neutral.11"
        >
          Funding
        </Box>
        <Stack
          w="full"
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: '24px', md: '32px' }}
        >
          <Center minW="22rem">
            <OverviewStatsCard
              height="full"
              title={'Funds Donated'}
              value={user.totalDonated}
            >
              <HStack
                w="full"
                mt="36px"
                justify={'space-between'}
                rounded="8px"
                p="16px"
                background={'#141414'}
                borderTop="1px solid #1D1F1E"
              >
                <Box
                  as="p"
                  textStyle={{ base: 'overline5', md: 'overline4' }}
                  color="neutral.8"
                >
                  Last Contribution
                </Box>
                <Box
                  as="p"
                  textStyle={{ base: 'title6', md: 'title5' }}
                  color="neutral.11"
                >
                  {user.lastContribution}
                </Box>
              </HStack>
            </OverviewStatsCard>
          </Center>
          {/* funds raised */}
          <Card
            p={{ base: '16px', md: '24px' }}
            flexDirection={{ base: 'column', md: 'row' }}
            gap={{ base: '48px', md: '80px' }}
            w={{ base: '100%', md: 'auto' }}
          >
            <VStack align={'start'} gap="8px">
              <Box
                as="p"
                color="neutral.8"
                textStyle={{ base: 'body5', md: 'body4' }}
              >
                Funds Raised
              </Box>
              x
              <Box
                as="p"
                color="neutral.11"
                textStyle={{ base: 'title3', sm: 'title2', md: 'title1' }}
              >
                {user.totalRaised.toFixed(2)}
              </Box>
            </VStack>
            <VStack align={'start'} gap={{ base: '8px', md: '12px' }}>
              <HStack
                w={{ base: 'full', md: '15rem' }}
                justifyContent={'space-between'}
                alignItems="end"
              >
                <Box
                  as="p"
                  color="neutral.8"
                  textStyle={{ base: 'body6', md: 'body5' }}
                >
                  Grants Matching Pool
                </Box>
                <Box
                  as="p"
                  color="neutral.11"
                  textStyle={{ base: 'title6', sm: 'title5', md: 'title4' }}
                >
                  0.0
                </Box>
              </HStack>

              <HStack
                w={{ base: 'full', md: '15rem' }}
                justifyContent={'space-between'}
                alignItems="end"
              >
                <Box
                  as="p"
                  color="neutral.8"
                  textStyle={{ base: 'body6', md: 'body5' }}
                >
                  Community Donations
                </Box>
                <Box
                  as="p"
                  color="neutral.11"
                  textStyle={{ base: 'title6', sm: 'title5', md: 'title4' }}
                >
                  0.0
                </Box>
              </HStack>

              <HStack
                w={{ base: 'full', md: '15rem' }}
                justifyContent={'space-between'}
                alignItems="end"
              >
                <Box
                  as="p"
                  color="neutral.8"
                  textStyle={{ base: 'body6', md: 'body5' }}
                >
                  Creator Tips
                </Box>
                <Box
                  as="p"
                  color="neutral.11"
                  textStyle={{ base: 'title6', sm: 'title5', md: 'title4' }}
                >
                  $0.0
                </Box>
              </HStack>

              <HStack
                w={{ base: 'full', md: '15rem' }}
                justifyContent={'space-between'}
                alignItems="end"
              >
                <Box
                  as="p"
                  color="neutral.8"
                  textStyle={{ base: 'body6', md: 'body5' }}
                >
                  Hackathon Prizes
                </Box>
                <Box
                  as="p"
                  color="neutral.11"
                  textStyle={{ base: 'title6', sm: 'title5', md: 'title4' }}
                >
                  $0.0
                </Box>
              </HStack>
            </VStack>
          </Card>
        </Stack>
      </VStack>
    </>
  );
};
