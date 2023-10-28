import React from 'react';
import type { ProjectExplorerType } from '@/types/explorer';
import { Collapse, Stack } from '@/utils/chakra';

import { Sort } from './Sort';
import { TrackFilter } from './TrackFilter';

interface Props {
  _projects: ProjectExplorerType[];
  projects: ProjectExplorerType[];
  setProjects: (projects: ProjectExplorerType[]) => void;
}

type CollapsedFiltersProps = Props & {
  tracks: string[];
  isOpen: boolean;
};

const CollapsedFilters = ({
  isOpen,
  _projects,
  projects,
  tracks,
  setProjects,
}: CollapsedFiltersProps) => {
  return (
    <Collapse style={{ width: '100%' }} in={isOpen} animateOpacity>
      <Stack
        p="12px"
        direction={{ base: 'row', md: 'row' }}
        spacing={{ base: '16px', md: '32px' }}
        pt={{ base: '16px', md: '32px' }}
        w="full"
        maxW="7xl"
        justify="start"
        zIndex={1}
        overflow={'visible'}
      >
        <Sort
          _projects={_projects}
          projects={projects}
          setProjects={setProjects}
        />
        <TrackFilter
          _projects={_projects}
          setProjects={setProjects}
          tracks={tracks}
        />
        {/* Category */}
        {/* <VStack w="full" zIndex={1000} gap="8px">
            <Box w="full" textStyle={'body4'} color="neutral.8">
              Categories
            </Box>
            <InputGroup
              position={'relative'}
              rounded="12px"
              w={{ base: 'full', md: 'full' }}
            >
              <InputRightElement
                h={{ base: '2.2rem', md: '2.5rem' }}
                w={{ base: '2.2rem', md: '2.5rem' }}
                pointerEvents="none"
                bg="transparent"
              >
                <Box
                  as={BiChevronDown}
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
              hello
              {searchTerm && (
                <VStack w="full" position={'absolute'} zIndex={1000}>
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
                              isCategorySelected(cat)
                                ? '#A8F0E6'
                                : 'transparent'
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
          </VStack> */}
        {/* Rounds */}
        {/* <VStack w="full" gap="8px">
            <Box w="full" textStyle={'body4'} color="neutral.8">
              Rounds
            </Box>
            <Menu closeOnSelect={false}>
              <MenuButton
                w="full"
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
                _active={{
                  backgroundColor: 'neutral.4',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                }}
                icon={
                  <Box as={RiFilter3Fill} boxSize={['20px']} color="#626665" />
                }
              />
              <MenuList
                w="full"
                outline="0px"
                border="1px solid #A8F0E625"
                rounded="16px"
                zIndex={'99'}
                maxH="20rem"
                overflow={'scroll'}
                // w={{ base: '200px', md: '320px' }}
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
                  [
                    {
                      id: '934kc83jcnejke93u4h',
                      colorScheme: 'pink',
                      roundName: 'Climate Round',
                    },
                    {
                      id: 'lwe9o2mncvites',
                      colorScheme: 'teal',
                      roundName: 'Dev tooling Round',
                    },
                  ]?.map((round) => (
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
          </VStack> */}
        {/* Sort by */}
        {/* <VStack w="full" gap="8px">
            <Box w="full" textStyle={'body4'} color="neutral.8">
              Sort by
            </Box>
            <Select
              defaultValue={1}
              rounded="12px"
              h={{ base: '2.2rem', md: '2.5rem' }}
              textStyle={{ base: 'body5', md: 'body4' }}
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
                fontSize: { base: '12px', md: '14px' },
                lineHeight: { base: '18px', md: '20px' },
                color: '#75757580',
              }}
            >
              <option value="option1">Est. Funds Raised ( Low to how )</option>
              <option value="option1">Est. Funds Raised ( High to low )</option>
              <option value="option1">
                Contributors ( Highest to lowest )
              </option>
              <option value="option2">
                Contributors ( Lowest to highest )
              </option>
            </Select>
          </VStack> */}
      </Stack>
    </Collapse>
  );
};

export default CollapsedFilters;
