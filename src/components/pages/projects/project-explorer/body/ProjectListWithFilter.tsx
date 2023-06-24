import {
  Box,
  Center,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  Stack,
  VStack,
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import { BiCheck, BiSearch } from 'react-icons/bi';
import { MdClear } from 'react-icons/md';
import { RiFilter3Fill } from 'react-icons/ri';
import { RxCross1 } from 'react-icons/rx';
import CategoryTag from '~/components/common/tags/CategoryTags';
import { useFilteredProjects } from '~/hooks/projects/useFilteredProjects';
import ProjectListLoadingSkeleton from '../../skeletons/ProjectListLoadingSkeleton';
import EmptyProjectsState from './empty-state/ProjectsEmptyState';
import ProjectsList from './ProjectsList';

const showCasedCategories = [
  { value: 'defi', label: 'defi' },
  { value: 'solana_infrastructure', label: 'Solana Infrastructure' },
  { value: 'sdk', label: 'SDK' },
  { value: 'consumer', label: 'Consumer' },
  { value: 'developer_tools', label: 'Developer Tools' },
];

export type RoundTypes = {
  name: string;
  colorScheme: string;
  id: string;
};

export type CategoryType = {
  label: string;
  value: string;
  colorScheme?: string;
};

export const ProjectListWithFilter: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const {
    filteredProjectsLoading,
    roundsData,
    selectedCategory,
    setSelectedCategory,
    roundIds,
    filteredProjectsFromServer,
    searchTerm,
    setSearchTerm,
    handleCategoryClick,
    handleRoundClick,
    isCategorySelected,
    filteredCategories,
    isRoundSelected,
  } = useFilteredProjects();

  return (
    <>
      <Stack
        direction={{ base: 'column-reverse', md: 'row' }}
        zIndex={'9'}
        gap={{ base: '16px', md: '' }}
        w="full"
        justify={'space-between'}
      >
        <HStack
          ref={scrollRef}
          overflow="clip"
          w="full"
          justify="start"
          whiteSpace="nowrap"
          position={'relative'}
          _after={{
            content: '""',
            position: 'absolute',
            top: '45%',
            right: '0%',
            transform: 'translateY(-50%)',
            height: { base: '2.2rem', md: '3rem' },
            width: '3rem',
            background: 'linear-gradient(90deg, #0C0D0D00 0%, #000 80%)',
          }}
        >
          {selectedCategory ? (
            <>
              <Center
                cursor="pointer"
                rounded="full"
                px="12px"
                py="12px"
                bg="#010F0D"
                color="#ADB8B6"
                _hover={{
                  color: '#14665B',
                  bg: '#E0FFFD',
                }}
                onClick={() => {
                  setSelectedCategory(undefined);
                  setSearchTerm('');
                }}
              >
                <Box
                  as={RxCross1}
                  boxSize={['12px', '14px', '18px']}
                  color="#626665"
                />
              </Center>
              <CategoryTag isSelected={true}>
                {selectedCategory.label}
              </CategoryTag>
            </>
          ) : (
            <>
              <Center
                as="button"
                color="#ADB8B6"
                onClick={() => handleCategoryClick()}
              >
                <CategoryTag isSelected={true}>All Projects</CategoryTag>
              </Center>
              {showCasedCategories.map((cat) => (
                <Center
                  key={cat.value}
                  as="button"
                  color="#ADB8B6"
                  onClick={() => handleCategoryClick(cat)}
                >
                  <CategoryTag>{cat.label}</CategoryTag>
                </Center>
              ))}
            </>
          )}
        </HStack>
        <HStack w={{ base: 'full', md: 'fit-content' }}>
          <InputGroup
            position={'relative'}
            rounded="12px"
            w={{ base: 'full', md: '320px' }}
          >
            <InputRightElement
              h={{ base: '2.2rem', md: '2.5rem' }}
              w={{ base: '2.2rem', md: '2.5rem' }}
              pointerEvents="none"
              bg="transparent"
            >
              <Box
                as={BiSearch}
                boxSize={['14px', '16px', '18px']}
                color="#626665"
              />
            </InputRightElement>
            <Input
              rounded="12px"
              h={{ base: '2.2rem', md: '2.5rem' }}
              outline="none"
              placeholder="Search Categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                fontSize: { base: '12px', md: '14px' },
                lineHeight: { base: '18px', md: '20px' },
                color: '#75757580',
              }}
            />
            {searchTerm && (
              <VStack w="full" position={'absolute'} top="120%" right="0%">
                <VStack
                  border="1px solid #A8F0E625"
                  rounded="16px"
                  zIndex={'100'}
                  maxH="13rem"
                  overflow={'scroll'}
                  w={{ base: 'full', md: '320px' }}
                  bg="red"
                  alignItems={'start'}
                  p="0"
                  backgroundColor={'#0C0D0D'}
                >
                  <HStack
                    px="16px"
                    pt="12px"
                    pb="8px"
                    w="full"
                    justify={'space-between'}
                    backgroundColor={'#0C0D0D'}
                    color="neutral.7"
                  >
                    <Box w="100%" zIndex="9" as="p" textStyle={'body4'}>
                      Categories
                    </Box>
                    <Box
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory(undefined);
                      }}
                      as={MdClear}
                      boxSize={['10px', '12px', '14px']}
                    />
                  </HStack>
                  {filteredCategories?.length === 0 ? (
                    <Center w="full" p="12px" pt="0">
                      <Skeleton w="full" height={'2rem'} opacity="12px" />
                    </Center>
                  ) : (
                    filteredCategories?.map((cat) => (
                      <HStack
                        px="24px"
                        py="6px"
                        as="button"
                        key={cat.value}
                        onClick={() => handleCategoryClick(cat)}
                      >
                        <Center
                          w="20px"
                          height="20px"
                          rounded="4px"
                          outline={'1px solid #A8F0E6'}
                          bg={
                            isCategorySelected(cat) ? '#A8F0E6' : 'transparent'
                          }
                        >
                          {isCategorySelected(cat) && (
                            <Box
                              as={BiCheck}
                              boxSize={['10px', '12px', '16px']}
                              color="#0C0D0D"
                            />
                          )}
                        </Center>
                        <Box
                          as="p"
                          textStyle={{ base: 'body6', md: 'body5' }}
                          color="white"
                        >
                          {cat.label}
                        </Box>
                      </HStack>
                    ))
                  )}
                </VStack>
              </VStack>
            )}
          </InputGroup>
          <Menu closeOnSelect={false}>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              rounded="12px"
              p={{ base: '8px', md: '10px' }}
              height="100%"
              backgroundColor={'neutral.3'}
              _hover={{
                backgroundColor: 'neutral.4',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              }}
              icon={
                <Box as={RiFilter3Fill} boxSize={['20px']} color="#626665" />
              }
            />
            <MenuList
              outline="0px"
              border="1px solid #A8F0E625"
              rounded="16px"
              zIndex={'99'}
              maxH="20rem"
              overflow={'scroll'}
              w={{ base: '200px', md: '320px' }}
              bg="red"
              alignItems={'start'}
              gap="8px"
              p="16px"
              backgroundColor={'#0C0D0D'}
            >
              <Box
                pb="12px"
                as="p"
                textStyle={{ base: 'body5', md: 'body4' }}
                color="neutral.7"
              >
                Ongoing Rounds
              </Box>
              {filteredProjectsLoading ? (
                <VStack w="full" gap="8px">
                  <Skeleton width="full" height="1.4rem" opacity="0.5" />
                  <Skeleton width="full" height="1.4rem" opacity="0.5" />
                  <Skeleton width="full" height="1.4rem" opacity="0.5" />
                </VStack>
              ) : (
                roundsData?.map((round) => (
                  <MenuItem
                    backgroundColor={'#0C0D0D'}
                    _hover={{
                      backgroundColor: `surface.${round.colorScheme}.3`,
                    }}
                    rounded="8px"
                    key={round.id}
                  >
                    <HStack
                      as="button"
                      onClick={() => handleRoundClick(round.id)}
                    >
                      <Center
                        w="20px"
                        height="20px"
                        rounded="4px"
                        border={'1px solid'}
                        borderColor={`surface.${round.colorScheme}.1`}
                        bg={
                          isRoundSelected(round?.id)
                            ? `surface.${round?.colorScheme}.1`
                            : 'transparent'
                        }
                      >
                        {isRoundSelected(round?.id) && (
                          <BiCheck size="1rem" color="#0C0D0D" />
                        )}
                      </Center>
                      <Box
                        as="p"
                        textStyle={{ base: 'body6', md: 'body5' }}
                        color={`surface.${round?.colorScheme}.1`}
                      >
                        {round?.roundName}
                      </Box>
                    </HStack>
                  </MenuItem>
                ))
              )}
            </MenuList>
          </Menu>
        </HStack>
      </Stack>
      <VStack w="full" align={'start'} gap="16px">
        {filteredProjectsLoading ? (
          <ProjectListLoadingSkeleton />
        ) : roundIds &&
          filteredProjectsFromServer &&
          filteredProjectsFromServer.length > 0 ? (
          <ProjectsList allProjectsData={filteredProjectsFromServer} />
        ) : (
          <EmptyProjectsState />
        )}
      </VStack>
    </>
  );
};
