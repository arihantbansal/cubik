import React from 'react';
import ProfilePictureAvatar from '@/app/components/common/profile-picture';
import type { NFTProfile } from '@/types/NFTProfile';
import { Box, Button, Container, HStack, VStack } from '@/utils/chakra';

import type { Prisma } from '@cubik/database';
import { prisma } from '@cubik/database';

type getTeamReturn = Prisma.ProjectGetPayload<{
  select: {
    name: true;
    team: {
      select: {
        user: {
          select: {
            profileNft: true;
            username: true;
            id: true;
            profilePicture: true;
            mainWallet: true;
          };
        };
      };
    };
  };
}>;

export const getTeam = async (
  slug: string,
): Promise<[getTeamReturn | null, Error | null]> => {
  try {
    const res = await prisma.project.findFirst({
      where: {
        slug: slug,
      },
      select: {
        name: true,
        team: {
          select: {
            user: {
              select: {
                profileNft: true,
                username: true,
                id: true,
                profilePicture: true,
                mainWallet: true,
              },
            },
          },
        },
      },
    });
    return [res, null];
  } catch (error) {
    console.log(error);

    return [null, error as Error];
  }
};

interface Props {
  slug: string;
}
export const TeamSection = async ({ slug }: Props) => {
  const [team, error] = await getTeam(slug);
  if (error || !team) {
    console.log(error);
    return <>error</>;
  }
  return (
    <>
      <Container
        display={'flex'}
        flexDirection={{
          base: 'column',
          lg: 'row',
        }}
        w={'full'}
        maxW={'7xl'}
        mx={'auto'}
        gap={10}
      >
        <VStack w="full">
          <VStack w={'full'} align={'start'}>
            <HStack align={'start'}>
              <Box p={2} borderRadius={3} border={'1px solid #0D2F00'}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.25 2.25C15.5439 2.59387 16.5 3.80665 16.5 5.25C16.5 6.69335 15.5439 7.90613 14.25 8.25M3.75 2.25C2.45608 2.59387 1.5 3.80665 1.5 5.25C1.5 6.69335 2.45608 7.90613 3.75 8.25M16.6146 12.2818C17.0117 12.7667 17.25 13.3868 17.25 14.0625C17.25 14.5966 17.0019 15.0727 16.6146 15.3819M1.38538 12C0.988272 12.4849 0.75 13.105 0.75 13.7807C0.75 14.3148 0.998118 14.7909 1.38538 15.1001M12 5.25C12 6.90685 10.6569 8.25 9 8.25C7.34314 8.25 6 6.90685 6 5.25C6 3.59315 7.34314 2.25 9 2.25C10.6569 2.25 12 3.59315 12 5.25ZM5.4375 15.75H12.5625C13.4945 15.75 14.25 14.9945 14.25 14.0625C14.25 12.5092 12.9908 11.25 11.4375 11.25H6.5625C5.0092 11.25 3.75 12.5092 3.75 14.0625C3.75 14.9945 4.50552 15.75 5.4375 15.75Z"
                    stroke="#31F579"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Box>
              <Box color={'white'} fontWeight={600} fontSize={'2xl'}>
                {team?.name} Team
              </Box>
            </HStack>
            <Box color={'#AAA'} fontSize={'lg'} fontWeight={500}>
              These are the Founders, developers, designers and product people
              behind {team?.name.toLocaleLowerCase()}
            </Box>
            <VStack w="full" mt={5} h="full">
              {team.team.map((team) => {
                return (
                  <>
                    <HStack
                      p={5}
                      w="full"
                      align={'start'}
                      justify={'space-between'}
                    >
                      <HStack align={'center'}>
                        <ProfilePictureAvatar
                          NFTProfile={
                            team.user.profileNft as unknown as NFTProfile
                          }
                          asNFT={team.user.profileNft ? true : false}
                          profilePicture={
                            team.user.profileNft
                              ? undefined
                              : team.user.profilePicture!
                          }
                          username={team.user.username as string}
                          width={{
                            base: '56px',
                            sm: '56px',
                            md: '56px',
                            lg: '56px',
                            xl: '56px',
                          }}
                          height={{
                            base: '56px',
                            sm: '56px',
                            md: '56px',
                            lg: '56px',
                            xl: '56px',
                          }}
                        />
                        <VStack align={'start'} gap={0}>
                          <Box fontSize={'lg'} color={'#FFFFFF'}>
                            {team.user.username}
                          </Box>
                          <Box fontSize={'md'} color={'#6F6F6F'}>
                            {team.user.username}
                          </Box>
                        </VStack>
                      </HStack>

                      <Button
                        variant={'outline'}
                        border={'1.5px solid #2C2500'}
                        w={'36'}
                        _hover={{
                          bg: '#2C2500',
                          color: '#FFD600',
                        }}
                        h={14}
                        rightIcon={
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.00016 3.33325V3.86659C4.00016 4.61332 4.00016 4.98669 3.85484 5.27191C3.72701 5.52279 3.52303 5.72676 3.27215 5.85459C2.98693 5.99992 2.61357 5.99992 1.86683 5.99992H1.3335M12.0002 12.6666V12.1333C12.0002 11.3865 12.0002 11.0131 12.1455 10.7279C12.2733 10.477 12.4773 10.2731 12.7282 10.1452C13.0134 9.99992 13.3868 9.99992 14.1335 9.99992H14.6668M12.0002 3.33325V3.86659C12.0002 4.61332 12.0002 4.98669 12.1455 5.27191C12.2733 5.52279 12.4773 5.72676 12.7282 5.85459C13.0134 5.99992 13.3868 5.99992 14.1335 5.99992H14.6668M4.00016 12.6666V12.1333C4.00016 11.3865 4.00016 11.0131 3.85484 10.7279C3.72701 10.477 3.52303 10.2731 3.27215 10.1452C2.98693 9.99992 2.61357 9.99992 1.86683 9.99992H1.3335M3.46683 12.6666H12.5335C13.2802 12.6666 13.6536 12.6666 13.9388 12.5213C14.1897 12.3934 14.3937 12.1895 14.5215 11.9386C14.6668 11.6534 14.6668 11.28 14.6668 10.5333V5.46659C14.6668 4.71985 14.6668 4.34648 14.5215 4.06126C14.3937 3.81038 14.1897 3.60641 13.9388 3.47858C13.6536 3.33325 13.2802 3.33325 12.5335 3.33325H3.46683C2.72009 3.33325 2.34672 3.33325 2.06151 3.47858C1.81063 3.60641 1.60665 3.81038 1.47882 4.06126C1.3335 4.34648 1.3335 4.71985 1.3335 5.46659V10.5333C1.3335 11.28 1.3335 11.6534 1.47882 11.9386C1.60665 12.1895 1.81063 12.3934 2.06151 12.5213C2.34672 12.6666 2.72009 12.6666 3.46683 12.6666ZM8.00016 9.99992C6.89559 9.99992 6.00016 9.10449 6.00016 7.99992C6.00016 6.89535 6.89559 5.99992 8.00016 5.99992C9.10473 5.99992 10.0002 6.89535 10.0002 7.99992C10.0002 9.10449 9.10473 9.99992 8.00016 9.99992Z"
                              stroke="#FFD600"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        }
                        color={'#FFD600'}
                      >
                        Tip
                      </Button>
                    </HStack>
                  </>
                );
              })}
            </VStack>
          </VStack>
        </VStack>
        <VStack
          w={'full'}
          maxW={{
            base: 'full',
            lg: 'sm',
          }}
        >
          <VStack w={'full'} align={'start'}>
            <HStack align={'start'}>
              <Box p={2} borderRadius={3} border={'1px solid #0D2F00'}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.49578 6.14356C4.56064 6.14356 3.54907 5.27185 3.54907 4.19671C3.54907 3.12157 4.56064 2.25 5.49578 2.25C6.57092 2.25 7.45649 3.12157 7.45649 4.19671C7.45649 5.27185 6.57092 6.14356 5.49578 6.14356ZM5.49578 6.14356C6.94566 6.14356 8.22479 6.8625 8.99986 7.96315C9.77494 6.8625 11.0555 6.14356 12.5039 6.14356M5.49578 6.14356C4.0473 6.14356 2.76678 6.8625 1.9917 7.96315M12.5039 6.14356C11.5688 6.14356 10.5572 5.27185 10.5572 4.19671C10.5572 3.12157 11.5688 2.25 12.5039 2.25C13.5791 2.25 14.4507 3.12157 14.4507 4.19671C14.4507 5.27185 13.5791 6.14356 12.5039 6.14356ZM12.5039 6.14356C13.9524 6.14356 15.233 6.8625 16.008 7.96315M5.49578 13.9303C4.56064 13.9303 3.54907 13.0587 3.54907 11.9836C3.54907 10.9084 4.56064 10.0368 5.49578 10.0368C6.57092 10.0368 7.45649 10.9084 7.45649 11.9836C7.45649 13.0587 6.57092 13.9303 5.49578 13.9303ZM5.49578 13.9303C6.94566 13.9303 8.22479 14.6494 8.99986 15.75C9.77494 14.6494 11.0555 13.9303 12.5039 13.9303M5.49578 13.9303C4.0473 13.9303 2.76678 14.6494 1.9917 15.75M12.5039 13.9303C11.5688 13.9303 10.5572 13.0587 10.5572 11.9836C10.5572 10.9084 11.5688 10.0368 12.5039 10.0368C13.5791 10.0368 14.4507 10.9084 14.4507 11.9836C14.4507 13.0587 13.5791 13.9303 12.5039 13.9303ZM12.5039 13.9303C13.9524 13.9303 15.233 14.6494 16.008 15.75"
                    stroke="#31F579"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Box>
              <Box color={'white'} fontWeight={600} fontSize={'2xl'}>
                {team?.name} Communities
              </Box>
            </HStack>
            <Box color={'#AAA'} fontSize={'lg'} fontWeight={500}>
              These are the communities which gum team is a part of
            </Box>
          </VStack>
        </VStack>
      </Container>
    </>
  );
};
