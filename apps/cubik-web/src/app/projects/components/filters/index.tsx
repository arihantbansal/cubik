'use client';

import FilterIcon from '@/theme/icons/filter.svg';
import type {
  ProjectExploreBanner,
  ProjectExplorerType,
} from '@/types/explorer';
import {
  Button,
  Center,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from '@/utils/chakra';

import Categories from './categories';
import CollapsedFilters from './Filters';

const Filters = ({
  _projects,
  projects,
  setProjects,
  banner,
}: {
  _projects: ProjectExplorerType[];
  projects: ProjectExplorerType[];
  setProjects: (projects: ProjectExplorerType[]) => void;
  banner: ProjectExploreBanner[];
}) => {
  const { isOpen, onToggle } = useDisclosure();
  const HackathonTracks = () => {
    let tracks: string[] = [];
    const hackathons = banner.filter((e) => e.type === 'hackathon');
    hackathons.forEach((hackathon) => {
      hackathon.hackathonTracks?.forEach((track) => {
        if (!tracks.includes(track)) {
          tracks.push(track);
        }
      });
    });

    return tracks;
  };
  return (
    <>
      <VStack align={'start'} justify={'space-between'} w="full">
        <HStack
          spacing={'0px'}
          w="full"
          align={'start'}
          justify={'space-between'}
        >
          <Categories
            _projects={_projects}
            projects={projects}
            setProjects={setProjects}
          />
          <Button
            aria-label="Options"
            rounded="12px"
            onClick={onToggle}
            p={{ base: '8px', md: '10px 16px' }}
            height="100%"
            backgroundColor={'neutral.3'}
            color="#626665"
            iconSpacing={{ base: '0px', md: '8px' }}
            size={{ base: 'cubikMini', md: 'cubikSmall' }}
            _hover={{
              backgroundColor: 'neutral.4',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            }}
            leftIcon={
              <Center
                width={{ base: '16px', md: '18px' }}
                height={{ base: '16px', md: '18px' }}
              >
                <FilterIcon color="#626665" />
              </Center>
            }
          >
            <Text display={{ base: 'none', md: 'block' }}>Filter</Text>
          </Button>
        </HStack>{' '}
        <Center w="full">
          <CollapsedFilters
            projects={projects}
            _projects={_projects}
            setProjects={setProjects}
            tracks={HackathonTracks()}
            isOpen={isOpen}
          />
        </Center>
      </VStack>
    </>
  );
};

export default Filters;
