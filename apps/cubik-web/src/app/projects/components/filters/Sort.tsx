import React from 'react';
import type { ProjectExplorerType } from '@/types/explorer';
import { Box, Select, VStack } from '@chakra-ui/react';

interface Props {
  _projects: ProjectExplorerType[];
  projects: ProjectExplorerType[];
  setProjects: (projects: ProjectExplorerType[]) => void;
}

export const Sort = ({ projects, setProjects }: Props) => {
  const handleFilter = (filter: string) => {
    let filterProjects: ProjectExplorerType[] = projects;
    if (filter === 'option1') {
      console.log('hit');
      const final = filterProjects.sort(
        (a, b) => a.projectEvent.amount - b.projectEvent.amount,
      );
      setProjects(final);
      return;
    }
    if (filter === 'option2') {
      const final = filterProjects.sort(
        (a, b) => b.projectEvent.amount - a.projectEvent.amount,
      );
      setProjects(final);
      return;
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
        Sort Project By
      </Box>
      <Select
        defaultValue={1}
        onChange={(e) => handleFilter(e.target.value)}
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
      >
        <option value="funds_raised_ltoh">
          Est. Funds Raised ( Low to how )
        </option>
        <option value="funds_raised_htoL">
          Est. Funds Raised ( High to low )
        </option>
        <option value="contributors_htoL">
          Contributors ( Highest to lowest )
        </option>
        <option value="contributors_ltoh">
          Contributors ( Lowest to highest )
        </option>
      </Select>
    </VStack>
  );
};
