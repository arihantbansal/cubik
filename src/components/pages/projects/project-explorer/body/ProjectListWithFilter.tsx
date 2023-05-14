import {
  Box,
  Center,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  VStack,
} from '@chakra-ui/react';
import { Round } from '@prisma/client';
import React, { useMemo, useRef, useState } from 'react';
import { BiCheck, BiSearch } from 'react-icons/bi';
import { RiFilter3Fill } from 'react-icons/ri';
import { RxCross1 } from 'react-icons/rx';
import CategoryTag from '~/components/common/tags/CategoryTags';
import { category } from '~/components/pages/create-project/projectCategories';
import { shuffle } from '~/utils/shuffle';
import { trpc } from '~/utils/trpc';
import ProjectListLoadingSkeleton from '../../skeletons/ProjectListLoadingSkeleton';
import EmptyProjectsState from './empty-state/ProjectsEmptyState';
import ProjectsList from './ProjectsList';

const showCasedCategories = [
  { value: 'defi', label: 'defi' },
  { value: 'solana_infrastructure', label: 'Solana Infrastructure' },
  { value: 'social', label: 'Social' },
  { value: 'dao', label: 'DAO' },
  { value: 'dev_tooling', label: 'Dev Tooling' },
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
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryType | undefined
  >();
  const [selectedRounds, setSelectedRounds] = useState<Round[] | undefined>();

  const { data: projects, isLoading } = trpc.project.findMany.useQuery();

  const { data: roundsData, isLoading: roundsLoading } =
    trpc.round.findActive.useQuery();

  React.useEffect(() => {
    if (roundsData) {
      setSelectedRounds(roundsData);
    }
  }, [roundsData]);

  const filteredProjects = useMemo(() => {
    let filteredProjects = projects;

    if (selectedCategory) {
      filteredProjects = filteredProjects?.filter((project) => {
        const projectIndustry: CategoryType[] = JSON.parse(project.industry);
        return projectIndustry.some(
          (industry) => industry.value === selectedCategory.value
        );
      });
    }

    if (selectedRounds && selectedRounds.length > 0) {
      const selectedRoundId = selectedRounds.map((round) => round.id);
      filteredProjects = filteredProjects?.filter((project) => {
        return project.ProjectJoinRound.some((projectRound) =>
          selectedRoundId.includes(projectRound.fundingRound.id as string)
        );
      });
    }

    return filteredProjects;
  }, [projects, selectedCategory, selectedRounds]);

  // Make sure to import or define the shuffle function
  const shuffledProjects = useMemo(
    () => shuffle(filteredProjects),
    [filteredProjects]
  );

  const [searchTerm, setSearchTerm] = useState<string>('');

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (category?: CategoryType) => {
    // @ts-ignore
    if (isCategorySelected(category)) {
      setSelectedCategory(undefined);
      return;
    }
    setSelectedCategory(category);
  };

  const handleRoundClick = (round: Round) => {
    setSelectedRounds((prevRounds) => {
      let newRounds;
      // if prev round contains the round, remove it
      if (prevRounds?.includes(round)) {
        newRounds = prevRounds.filter((r) => r !== round);
      } else {
        newRounds = [...(prevRounds ?? []), round];
      }
      return newRounds;
    });
  };

  const isCategorySelected = (category: CategoryType) =>
    selectedCategory?.value === category.value;

  const isRoundSelected = (round: Round) => selectedRounds?.includes(round);

  const filteredCategories = category.filter((cat) =>
    cat.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <HStack w="full" justify={'space-between'}>
        <HStack
          ref={scrollRef}
          overflow="clip"
          w="full"
          justify="start"
          whiteSpace="nowrap"
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
                <RxCross1 />
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
        <HStack w={{ base: '200px', md: 'fit-content' }}>
          <InputGroup
            position={'relative'}
            rounded="12px"
            w={{ base: '200px', md: '320px' }}
            zIndex={'99'}
          >
            <InputLeftElement
              w="3rem"
              h="full"
              pointerEvents="none"
              bg="transparent"
            >
              <BiSearch size={18} color="#75757580" />
            </InputLeftElement>
            <Input
              rounded="12px"
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
            />
            {searchTerm && (
              <VStack w="full" position={'absolute'} top="120%" right="0%">
                <VStack
                  border="1px solid #A8F0E625"
                  rounded="16px"
                  zIndex={'100'}
                  maxH="13rem"
                  overflow={'scroll'}
                  w={{ base: '200px', md: '320px' }}
                  bg="red"
                  alignItems={'start'}
                  p="0"
                  backgroundColor={'#0C0D0D'}
                >
                  <Box
                    w="100%"
                    backgroundColor={'#0C0D0D'}
                    px="16px"
                    pt="12px"
                    pb="8px"
                    zIndex="9"
                    as="p"
                    textStyle={'body4'}
                    color="neutral.7"
                  >
                    Categories
                  </Box>
                  {filteredCategories.length === 0 ? (
                    <Center w="full" p="12px" pt="0">
                      <Skeleton w="full" height={'2rem'} opacity="12px" />
                    </Center>
                  ) : (
                    filteredCategories.map((cat) => (
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
                            <BiCheck size="1rem" color="#0C0D0D" />
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
              birder="1px solid red"
              as={IconButton}
              aria-label="Options"
              rounded="12px"
              p="10px"
              height="100%"
              backgroundColor={'neutral.3'}
              _hover={{
                backgroundColor: 'neutral.4',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              }}
              icon={<RiFilter3Fill size={22} color="#626665" />}
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
              <Box pb="12px" as="p" textStyle={'body4'} color="neutral.7">
                Ongoing Rounds
              </Box>
              {isLoading ? (
                <VStack w="full" gap="8px">
                  <Skeleton width="full" height="1.4rem" opacity="0.5" />
                  <Skeleton width="full" height="1.4rem" opacity="0.5" />
                  <Skeleton width="full" height="1.4rem" opacity="0.5" />
                </VStack>
              ) : (
                roundsData?.map((round: Round) => (
                  <MenuItem
                    backgroundColor={'#0C0D0D'}
                    _hover={{
                      backgroundColor: `surface.${round.colorScheme}.3`,
                    }}
                    rounded="8px"
                    key={round.id}
                  >
                    <HStack as="button" onClick={() => handleRoundClick(round)}>
                      <Center
                        w="20px"
                        height="20px"
                        rounded="4px"
                        border={'1px solid'}
                        borderColor={`surface.${round.colorScheme}.1`}
                        bg={
                          isRoundSelected(round)
                            ? `surface.${round.colorScheme}.1`
                            : 'transparent'
                        }
                      >
                        {isRoundSelected(round) && (
                          <BiCheck size="1rem" color="#0C0D0D" />
                        )}
                      </Center>
                      <Box
                        as="p"
                        textStyle={{ base: 'body6', md: 'body5' }}
                        color={`surface.${round.colorScheme}.1`}
                      >
                        {round.roundName} Round
                      </Box>
                    </HStack>
                  </MenuItem>
                ))
              )}
            </MenuList>
          </Menu>
        </HStack>
      </HStack>
      <VStack w="full" align={'start'} gap="16px">
        <VStack w="full" align={'start'} gap="16px">
          {isLoading ? (
            <ProjectListLoadingSkeleton />
          ) : selectedRounds &&
            shuffledProjects &&
            shuffledProjects.length > 0 ? (
            <ProjectsList allProjectsData={shuffledProjects} />
          ) : (
            <EmptyProjectsState />
          )}
        </VStack>
      </VStack>
    </>
  );
};
