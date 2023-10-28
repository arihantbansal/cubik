'use client';

import React from 'react';
import { DetailedDescription } from '@/app/components/common/description';
import { ErrorUI } from '@/app/components/common/errors/errorUI';
import GetFormattedLink from '@/app/components/common/formatters/getFormattedLink';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Center,
  HStack,
  Link,
  Skeleton,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@/utils/chakra';

import type { Prisma } from '@cubik/database';

export type ProjectJoinRoundReturnType = Prisma.ProjectJoinRoundGetPayload<{
  select: {
    id: true;
    status: true;
    project: {
      select: {
        id: true;
        name: true;
        short_description: true;
        logo: true;
        industry: true;
        project_links: true;
        owner: {
          select: {
            username: true;
          };
        };
      };
    };
  };
}>;

interface Props {
  isLoading: boolean;
  isError: boolean;
  projectJoinRound: ProjectJoinRoundReturnType[];
  description: string;
}

export const GrantDetailsBody = (props: Props) => {
  return (
    <>
      <Tabs variant={'cubik'} alignSelf={'start'} w="full">
        <TabList
          overflowY={{ base: 'hidden', md: 'inherit' }}
          overflowX={{ base: 'scroll', md: 'inherit' }}
          gap={{ base: '24px', md: '32px' }}
        >
          <Tab>About</Tab>
          <Tab>Leaderboard</Tab>
          <Tab gap="8px" display={'flex'}>
            <Box as="p" textStyle={{ base: 'title5', md: 'title4' }}>
              Participants
            </Box>
            {/* {data && data?.ProjectJoinRound.length ? (
              <Tag
                rounded="full"
                variant="colorful"
                color="#FFF066"
                bg="#2D2A14"
              >
                {
                  data?.ProjectJoinRound.filter(
                    (round) => round.status === ProjectJoinRoundStatus.APPROVED
                  ).length
                }
              </Tag>
            ) : (
              ""
            )} */}
          </Tab>
        </TabList>
        <TabPanels p="0">
          <TabPanel>
            <DetailedDescription
              isError={props.isError}
              isLoading={props.isLoading}
              description={props?.description}
            />
            <TabPanel>
              {props.isError && <ErrorUI />}
              {/* <GrantDetailsLeaderboard id={data?.id as string} /> */}
            </TabPanel>{' '}
          </TabPanel>
          <TabPanel w="full">
            {props.isError && <ErrorUI />}
            {props?.projectJoinRound.map((round) => (
              <Skeleton
                w="full"
                isLoaded={!props.isLoading}
                fadeDuration={2}
                opacity={props.isLoading ? '0.3' : '1'}
                key={round.project.id}
              >
                <Card
                  key={round.project.id}
                  border="none"
                  px="24px"
                  pt={{ base: '16px', sm: '20px', md: '24px' }}
                  pb={{ base: '16px', sm: '20px', md: '24px' }}
                  gap={{ base: '16px', sm: '20px', md: '24px' }}
                  w="100%"
                >
                  <CardBody>
                    <Stack
                      direction={{ base: 'column', sm: 'row' }}
                      px={''}
                      gap={'12px'}
                      w="full"
                    >
                      <Stack
                        w="full"
                        direction="row"
                        gap={{ base: '8px', sm: '12px', md: '16px' }}
                      >
                        <Center>
                          <Avatar
                            src={round.project.logo}
                            name={round.project.name}
                            width={{ base: '36px', sm: '48px', md: '52px' }}
                            height={{ base: '36px', sm: '48px', md: '52px' }}
                          />
                        </Center>
                        <VStack
                          alignItems={'start'}
                          align={'center'}
                          justify="center"
                          spacing={{ base: '2px', sm: '4px', md: '6px' }}
                        >
                          <Box
                            as="p"
                            textStyle={{
                              base: 'title4',
                              sm: 'title3',
                              md: 'title2',
                            }}
                            noOfLines={1}
                            textAlign="left"
                            color="white"
                          >
                            {round.project.name}
                          </Box>
                          <GetFormattedLink
                            link={round.project.project_links}
                          />
                        </VStack>
                      </Stack>
                      <HStack justifyContent={'end'}>
                        <Button
                          as={Link}
                          href={`/${round.project.owner.username}/${round.project.id}/${round.id}`}
                          variant={'cubikFilled'}
                          maxW={{ base: '100%', sm: '8rem', md: '10rem' }}
                          w={{ base: 'full', sm: '8rem', md: '10rem' }}
                          size={{ base: 'cubikMedium', md: 'cubikSmall' }}
                          onClick={() => {}}
                        >
                          View Project
                        </Button>
                      </HStack>
                    </Stack>
                  </CardBody>
                </Card>
              </Skeleton>
            ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
