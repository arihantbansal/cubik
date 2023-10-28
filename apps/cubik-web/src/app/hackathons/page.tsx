import React from 'react';
import type { Metadata } from 'next';
import {
  Box,
  Center,
  Container,
  HStack,
  Stack,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@/utils/chakra';

import { prisma } from '@cubik/database';

import { EmptyStateHOC } from '../components/common/empty-state/EmptyStateHOC';
import { HackathonCard } from './components/hackathonCard';

export const metadata: Metadata = {
  title: 'Projects - Cubik',
  description: 'Browse projects and Cubik and support them',
  openGraph: {
    images: [
      'https://res.cloudinary.com/demonicirfan/image/upload/v1692786112/OG-Grant_23_tbhrsg.png',
    ],
  },
  twitter: {
    title: 'Cubik',
    card: 'summary_large_image',
    images: [
      'https://res.cloudinary.com/demonicirfan/image/upload/v1692786112/OG-Grant_23_tbhrsg.png',
    ],
  },
};

export const FutureHackathon = async () => {
  const future = await prisma.hackathon.findMany({
    where: {
      resultDate: {
        gte: new Date(),
      },
    },
    select: {
      background: true,
      name: true,
      slug: true,
      shortDescription: true,
      registrationStartDate: true,
      registrationEndDate: true,
      hackathonEndDate: true,
      hackathonStartDate: true,
      votingEndDate: true,
      votingStartDate: true,
      prizePool: true,
      id: true,
    },
  });
  return future;
};
export const PastHackathon = async () => {
  const past = await prisma.hackathon.findMany({
    where: {
      resultDate: {
        lt: new Date(),
      },
    },
    select: {
      background: true,
      name: true,
      slug: true,
      shortDescription: true,
      registrationStartDate: true,
      registrationEndDate: true,
      hackathonEndDate: true,
      hackathonStartDate: true,
      votingEndDate: true,
      votingStartDate: true,
      id: true,
      prizePool: true,
    },
  });
  return past;
};
const HackathonExplorer = async () => {
  const futureHackathon = await FutureHackathon();
  const pastHackathon = await PastHackathon();
  return (
    <>
      <Container maxW="7xl" py={{ base: '48px', md: '64px' }} mt="4rem">
        <Stack
          direction={{ base: 'column', md: 'row' }}
          gap="40px"
          w="full"
          align="start"
          justify="space-between"
          pb={{ base: '32px', md: '48px' }}
          position={'relative'}
          _after={{
            content: '""',
            zIndex: '0',
            position: 'absolute',
            top: '-100%',
            right: { base: '20%', md: '5%' },
            transform: 'translate(0%,0%) scale(12)',
            width: '2vw',
            maxW: '1rem',
            minW: '0.6rem',
            height: 'full',
            maxH: '1.2rem',
            minH: '0.8rem',
            backgroundColor: '#FFE53D',
            filter: 'blur(10px)',
            WebkitFilter: 'blur(10px)',
            rounded: 'full',
          }}
          _before={{
            content: '""',
            zIndex: '0',
            position: 'absolute',
            top: '-100%',
            right: { base: '20%', md: '0%' },
            transform: {
              base: 'translate(0%,0%) scale(8)',
              md: 'translate(0%,0%) scale(16)',
            },
            width: '2vw',
            maxW: '2rem',
            minW: '1.2rem',
            height: '2vw',
            maxH: '2rem',
            minH: '1.2rem',
            backgroundColor: '#31F579',
            filter: 'blur(25px)',
            WebkitFilter: 'blur(25px)',
            rounded: 'full',
          }}
        >
          <VStack align={'start'} gap="8px">
            <Box
              color="neutral.11"
              as="p"
              textStyle={{ base: 'display5', md: 'display3' }}
            >
              Solana Ecosystem Hackathons
            </Box>{' '}
            <Box
              color="neutral.9"
              as="p"
              textStyle={{ base: 'body4', md: 'body3' }}
            >
              Participate in community run Hackathons and build the next big
              thing on Solana
            </Box>
          </VStack>
        </Stack>
        <VStack
          py={{ base: '32px', md: '64px' }}
          w="full"
          align="start"
          spacing="32px"
        >
          <Tabs w="full" variant="unstyled" position={'relative'}>
            <HStack pb="1rem" w="full" justify="space-between">
              <Box
                color="neutral.11"
                as="p"
                textStyle={{ base: 'title2', md: 'title1' }}
              >
                Hackathons
              </Box>
              <TabList
                gap={{ base: '8px', md: '14px' }}
                border="1px solid"
                borderColor="neutral.4"
                bg="neutral.3"
                p="4px"
                rounded="12px"
              >
                <Tab
                  zIndex="1"
                  color="neutral.7"
                  _selected={{ color: 'neutral.10' }}
                >
                  <Box as="p" textStyle={{ base: 'title6', md: 'title4' }}>
                    Upcoming
                  </Box>
                </Tab>
                <Tab
                  zIndex="1"
                  color="neutral.7"
                  _selected={{ color: 'neutral.10' }}
                >
                  <Box as="p" textStyle={{ base: 'title6', md: 'title4' }}>
                    Past
                  </Box>
                </Tab>
              </TabList>
            </HStack>
            <TabIndicator
              zIndex={'0'}
              position={'absolute'}
              top="0"
              borderColor="neutral.4"
              bg="neutral.4"
              rounded="10px"
              h={{ base: '2.1rem', md: '2.5rem' }}
              mt="4px"
            />
            <TabPanels>
              <TabPanel>
                {futureHackathon.length > 0 &&
                  futureHackathon.map((hackathon) => {
                    return (
                      <HackathonCard
                        key={hackathon.slug}
                        background={hackathon.background}
                        name={hackathon.name}
                        slug={hackathon.slug}
                        prizePool={hackathon.prizePool}
                        id={hackathon.id}
                        shortDescription={hackathon.shortDescription}
                      />
                    );
                  })}
                {futureHackathon.length === 0 && (
                  <Center
                    w="full"
                    border="1px dashed"
                    borderColor={'neutral.6'}
                    rounded="12px"
                    flexDir={'column'}
                  >
                    <EmptyStateHOC
                      heading={'ah, no hackathon currently!'}
                      subHeading={
                        'There are no ongoing hackathon and no upcoming hackathons right now to view here, check previous hackathons or come back later!'
                      }
                    />
                  </Center>
                )}
              </TabPanel>
              <TabPanel>
                {pastHackathon.length > 0 &&
                  pastHackathon.map((hackathon) => {
                    return (
                      <HackathonCard
                        key={hackathon.slug}
                        background={hackathon.background}
                        name={hackathon.name}
                        slug={hackathon.slug}
                        prizePool={hackathon.prizePool}
                        id={hackathon.id}
                        shortDescription={hackathon.shortDescription}
                      />
                    );
                  })}
                {pastHackathon.length === 0 && (
                  <Center
                    w="full"
                    border="1px dashed"
                    borderColor={'neutral.6'}
                    rounded="12px"
                    flexDir={'column'}
                  >
                    <EmptyStateHOC
                      heading={'No Hackathon History to View'}
                      subHeading={
                        'There are no previous hackathons to view here'
                      }
                    />
                  </Center>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Container>
    </>
  );
};

export default HackathonExplorer;
