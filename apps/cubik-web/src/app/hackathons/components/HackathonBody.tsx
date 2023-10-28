import React from 'react';
import type { HackathonHost } from '@/types/hackathon';
import {
  Center,
  Container,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@/utils/chakra';

import { prisma } from '@cubik/database';

import { HackathonInteractions } from './HackathonInteractions';
import { HackathonSchedule } from './HackathonSchedule';
import HackathonTracks from './HackathonTracks';
import { ProjectsDetailedDescription } from './ProjectDetailedDescription';

const fetchHackathon = async (slug: string) => {
  const res = await prisma.hackathon.findFirst({
    where: {
      slug: slug,
    },
    select: {
      longDescription: true,
      resultDate: true,
      registrationEndDate: true,
      registrationStartDate: true,
      hackathonEndDate: true,
      hackathonStartDate: true,
      votingEndDate: true,
      votingStartDate: true,
      host: true,
      prizePool: true,
      hackathonSponsors: {
        select: {
          name: true,
          description: true,
          sponsorOrganizations: true,
          prize: true,
          prizeBreakdown: true,
          ownerOfTrack: true,
          judges: true,
        },
      },
    },
  });
  return res;
};
interface Props {
  slug: string;
}
export const HackathonBody = async ({ slug }: Props) => {
  const hackathon = await fetchHackathon(slug);
  return (
    <>
      <Container p="0px" maxW="full">
        <Stack
          gap={{ base: '12px', md: '24px', lg: '8rem' }}
          w="full"
          alignItems="top"
          direction={{ base: 'column-reverse', lg: 'row' }}
        >
          <Center w="full" flex={3.5}>
            <Tabs variant={'cubik'} alignSelf={'start'} w="full">
              <TabList
                overflowY={{ base: 'hidden', md: 'inherit' }}
                overflowX={{ base: 'scroll', md: 'inherit' }}
                gap={{ base: '24px', md: '32px' }}
              >
                <Tab>Details</Tab>
                <Tab>Schedule</Tab>
                <Tab>Tracks</Tab>
              </TabList>
              <TabPanels p="0 !important">
                <TabPanel>
                  <ProjectsDetailedDescription
                    isLoading={false}
                    description={hackathon?.longDescription as string}
                  />
                </TabPanel>
                <TabPanel>
                  <HackathonSchedule
                    hackathonEndDate={hackathon?.hackathonEndDate as Date}
                    registrationEndDate={hackathon?.registrationEndDate as Date}
                    registrationStartDate={
                      hackathon?.registrationStartDate as Date
                    }
                    resultDate={hackathon?.resultDate as Date}
                    votingEndDate={hackathon?.votingEndDate as Date}
                    votingStartDate={hackathon?.votingStartDate as Date}
                    hackathonStartDate={hackathon?.hackathonStartDate as Date}
                    slug={slug}
                  />
                </TabPanel>
                <TabPanel p="0 !important" overflowX="scroll">
                  <HackathonTracks
                    tracks={hackathon?.hackathonSponsors as unknown as any}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Center>
          <Center w="full" h="full" flex={1.5}>
            <HackathonInteractions
              host={hackathon?.host as unknown as HackathonHost[]}
              prizePool={hackathon?.prizePool as unknown as number}
            />
          </Center>
        </Stack>
      </Container>
    </>
  );
};
