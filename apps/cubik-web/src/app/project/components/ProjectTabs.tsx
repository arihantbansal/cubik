import React from 'react';
import {
  Box,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@/utils/chakra';

import { ContributionSection } from './contributions/index';
import { DetailSection } from './details';
import { TeamSection } from './team';

interface Props {
  slug: string;
}

export const ProjectTabs = ({ slug }: Props) => {
  return (
    <>
      <Box
        display={'flex'}
        w="full"
        flexDir="column"
        alignItems={{ base: 'end', lg: 'center' }}
        minH={'30rem'}
      >
        <Tabs variant={'cubik'} alignSelf={'start'} w="full">
          <Box bg={'cubik.grey.700'} w={'full'}>
            <TabList
              w="full"
              maxW={'7xl'}
              mx={'auto'}
              overflowY={{ base: 'hidden', md: 'inherit' }}
              overflowX={{ base: 'scroll', md: 'inherit' }}
            >
              <Tab>About</Tab>
              <Tab>Contributions</Tab>
              <Tab>Team</Tab>
              <Tab>
                <HStack>
                  <Box>More</Box>
                </HStack>
              </Tab>
            </TabList>
          </Box>
          <TabPanels p="0">
            <TabPanel>
              {/* @ts-expect-error  Async Server Component   */}
              <DetailSection slug={slug} />
            </TabPanel>
            <TabPanel>
              <ContributionSection />
            </TabPanel>
            <TabPanel>
              {/* @ts-expect-error  Async Server Component   */}
              <TeamSection slug={slug} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};
