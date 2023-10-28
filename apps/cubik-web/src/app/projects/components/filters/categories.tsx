'use client';

import { useRef, useState } from 'react';
import CategoryTag from '@/app/components/common/tags/CategoryTags';
import CrossIcon from '@/theme/icons/cross.svg';
import type { ProjectExplorerType } from '@/types/explorer';
import { Box, Center, HStack } from '@/utils/chakra';

export interface Category {
  value:
    | 'all'
    | 'defi'
    | 'solana_infrastructure'
    | 'sdk'
    | 'consumer'
    | 'developer_tools';
  label: string;
}

const Categories = ({
  _projects,
  setProjects,
}: {
  _projects: ProjectExplorerType[];
  projects: ProjectExplorerType[];
  setProjects: (projects: ProjectExplorerType[]) => void;
}) => {
  const [category, setCategory] = useState<Category['label']>('all');
  const categories: Category[] = [
    {
      value: 'all',
      label: 'All Projects',
    },
    { value: 'defi', label: 'defi' },
    { value: 'solana_infrastructure', label: 'Solana Infrastructure' },
    { value: 'sdk', label: 'SDK' },
    { value: 'consumer', label: 'Consumer' },
    { value: 'developer_tools', label: 'Developer Tools' },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  const changeCategory = (category: Category['value']) => {
    setCategory(category);

    if (category === 'all') {
      setProjects(_projects);
      return;
    }

    const filteredProjects = _projects.filter(({ industry }) => {
      return (JSON.parse(industry) as any[]).some(({ value }) => {
        console.log(value, category);
        return value === category;
      });
    });

    setProjects(filteredProjects);
  };

  return (
    <Box position="relative">
      <HStack
        ref={scrollRef}
        overflowX="auto"
        w="82vw"
        maxW="6xl"
        justify="start"
        whiteSpace="nowrap"
        position={'relative'}
        sx={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {/* <Center as="button" color="#ADB8B6" onClick={() => changeCategory("all")}>
        <CategoryTag isSelected={true}>All Projects</CategoryTag>
         </Center> */}
        {category !== 'all' ? (
          <>
            <Center
              cursor="pointer"
              rounded="full"
              px="9px"
              py="9px"
              bg="#010F0D"
              color="#ADB8B6"
              _hover={{
                color: '#14665B',
                bg: '#E0FFFD',
              }}
              onClick={() => {
                changeCategory('all');
              }}
            >
              {/* @todo improve the color and sizing ( maybe create custom icons library ) */}
              <Center
                width={{ base: '18px', md: '20px' }}
                height={{ base: '18px', md: '20px' }}
              >
                <CrossIcon />
              </Center>
            </Center>
            <CategoryTag isSelected={true}>{category}</CategoryTag>
          </>
        ) : (
          <>
            {categories.map(({ label, value }) => (
              <Center
                key={value}
                as="button"
                color="#ADB8B6"
                onClick={() => changeCategory(value)}
              >
                <CategoryTag isSelected={category === value}>
                  {label}
                </CategoryTag>
              </Center>
            ))}
          </>
        )}
      </HStack>{' '}
      <Box
        position="absolute"
        top="45%"
        right="0%"
        transform="translateY(-50%)"
        height={{ base: '2.5rem', md: '3rem' }}
        width={{ base: '1rem', md: '3rem' }}
        background="linear-gradient(90deg, #0C0D0D00 0%, #000 80%)"
      />
    </Box>
  );
};

export default Categories;
