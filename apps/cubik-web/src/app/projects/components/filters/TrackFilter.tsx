import React from 'react';
import type { ProjectExplorerType } from '@/types/explorer';
import { Box, Select, VStack } from '@/utils/chakra';

interface Props {
  tracks: string[];
  setProjects: (projects: ProjectExplorerType[]) => void;
  _projects: ProjectExplorerType[];
}
export const TrackFilter = ({ setProjects, _projects, tracks }: Props) => {
  const handleChange = (value: string) => {
    if (value === 'all') {
      setProjects(_projects);
    } else {
      const filteredProjects = _projects.filter(
        (project) =>
          project.projectEvent.eventName === 'hackathon' &&
          project.projectEvent.tracks.find((e) => e.value == value),
      );
      setProjects(filteredProjects);
    }
  };
  return (
    <VStack
      w="full"
      gap={{ base: '12px', md: '16px' }}
      maxW={{ base: 'full', md: '20rem' }}
    >
      <Box
        w="full"
        textStyle={{ base: 'title6', md: 'title4' }}
        color="neutral.11"
      >
        Hackathon Tracks
      </Box>
      <Select
        rounded="8px"
        h={{ base: '2.2rem', md: '2.5rem' }}
        fontSize={{ base: '12px', md: '13px' }}
        fontWeight={'500'}
        color="neutral.7"
        outline="none"
        w="full"
        border={'none'}
        boxShadow="none"
        _hover={{
          boxShadow: 'none !important',
          borderColor: '#ffffff10 !important',
          outline: '#ffffff10 !important',
        }}
        _focus={{
          boxShadow: 'none !important',
          borderColor: '#ffffff10 !important',
          outline: '#ffffff10 !important',
        }}
        _focusVisible={{
          boxShadow: 'none !important',
          borderColor: 'none !important',
          outline: 'none !important',
        }}
        _active={{
          boxShadow: 'none !important',
          borderColor: 'none !important',
          outline: 'none !important',
        }}
        _placeholder={{
          fontSize: { base: '16px !important', md: '18px !important' },
          //  lineHeight: { base: "18px", md: "20px" },
          color: '#75757580',
        }}
        onChange={(e) => handleChange(e.target.value)}
        defaultValue={'all'}
      >
        <option
          value="all"
          style={{
            background: 'white !important',
            color: 'black !important',
            border: 'none !important',
            outline: 'none !important',
          }}
        >
          Select Track
        </option>
        {tracks.map((track) => {
          return (
            <option
              style={{
                background: 'white !important',
                color: 'black !important',
                border: 'none !important',
                outline: 'none !important',
              }}
              key={track}
              value={track}
            >
              {track}
            </option>
          );
        })}
      </Select>
    </VStack>
  );
};
