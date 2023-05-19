import {
  Avatar,
  Box,
  Center,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spinner,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { trpc } from '~/utils/trpc';

type SearchBarProps = {
  display?: any;
  width: any;
};
export const SearchBar = ({ display, width }: SearchBarProps) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    data: projects,
    isLoading: projectsLoading,
    isError: projectsIsError,
    error: projectsError,
  } = trpc.project.findMany.useQuery();
  const {
    data: people,
    isLoading: peopleLoading,
    isError: peopleIsError,
    error: peopleError,
  } = trpc.user.searchUser.useQuery({ username: '' });
  const {
    data: grants,
    isLoading: grantsLoading,
    isError: grantsIsError,
    error: grantsError,
  } = trpc.round.findActive.useQuery();
  const {
    data: hackathons,
    isLoading: hackathonsLoading,
    isError: hackathonsIsError,
    error: hackathonsError,
  } = {
    data: undefined,
    isLoading: undefined,
    isError: undefined,
    error: undefined,
  };
  const initialRef = useRef(null);

  const [searchInput, setSearchInput] = useState('');
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [selectedGrantIndex, setSelectedGrantIndex] = useState(0);
  const [selectedHackathonIndex, setSelectedHackathonIndex] = useState(0);
  const [setPeopleIndex, setSetPeopleIndex] = useState(0);

  const filteredProjects = useMemo(() => {
    if (!projects || searchInput.trim() === '') {
      return [];
    }
    const matchingProjects = projects
      .filter((project) =>
        project.name.toLowerCase().includes(searchInput.toLowerCase())
      )
      .sort((a, b) => {
        if (a.name.toLowerCase() === searchInput.toLowerCase()) return -1;
        if (b.name.toLowerCase() === searchInput.toLowerCase()) return 1;
        return a.name.localeCompare(b.name);
      });
    return matchingProjects;
  }, [projects, searchInput]);

  const filteredPeople = useMemo(() => {
    if (!people || searchInput.trim() === '') {
      return [];
    }
    // Adjust this depending on the fields you want to search in
    return people.filter((person) =>
      person.username.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, [people, searchInput]);

  const filterGrants = useMemo(() => {
    if (!people || searchInput.trim() === '') {
      return [];
    }
    // Adjust this depending on the fields you want to search in
    return people.filter((person) =>
      person.username.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, [people, searchInput]);

  const filterHackathons = useMemo(() => {
    if (!people || searchInput.trim() === '') {
      return [];
    }
    // Adjust this depending on the fields you want to search in
    return people.filter((person) =>
      person.username.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, [people, searchInput]);

  useEffect(() => {
    if (!isOpen) {
      setSearchInput('');
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedProjectIndex(0);
  }, [filteredProjects]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Tab') {
      event.preventDefault();

      // Loop through each type
      // if (filteredProjects.length > 0) {
      //   setSelectedProjectIndex(prevIndex => prevIndex + 1 >= filteredProjects.length ? 0 : prevIndex + 1);
      // } else if (filteredPeople.length > 0) {
      //   setSelectedPeopleIndex(prevIndex => prevIndex + 1 >= filteredPeople.length ? 0 : prevIndex + 1);
      // } else if (filteredGrants.length > 0) {
      //   setSelectedGrantIndex(prevIndex => prevIndex + 1 >= filteredGrants.length ? 0 : prevIndex + 1);
      // } else if (filteredHackathons.length > 0) {
      //   setSelectedHackathonIndex(prevIndex => prevIndex + 1 >= filteredHackathons.length ? 0 : prevIndex + 1);
      // }
    }

    if (event.key === 'Enter') {
      // Modify this part to handle navigation to different routes depending on the selected type
      // if (filteredProjects.length > 0) {
      //   router.prefetch(`/projects/${filteredProjects[selectedProjectIndex].id}`);
      // } else if (filteredPeople.length > 0) {
      //   router.prefetch(`/people/${filteredPeople[selectedPeopleIndex].id}`);
      // } else if (filteredGrants.length > 0) {
      //   router.prefetch(`/grants/${filteredGrants[selectedGrantIndex].id}`);
      // } else if (filteredHackathons.length > 0) {
      //   router.prefetch(`/hackathons/${filteredHackathons[selectedHackathonIndex].id}`);
      // }
    }
  };

  const handleClose = () => {
    setSearchInput('');
    onClose();
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        //variant={'cubik'}
        isOpen={isOpen}
        size="lg"
        onClose={handleClose}
      >
        <ModalOverlay backdropFilter="blur(10px)" bg="rgba(0, 0, 0, 0.40)" />
        <ModalContent h="0" rounded="8px" w={'full'} p="0" px="1rem">
          <ModalBody w={'full'} rounded="8px" border="1px solid #1B181A" p="0">
            <VStack rounded="8px" gap="0" spacing="0" background={'#0F0F0F'}>
              <InputGroup
                rounded="8px"
                display={display}
                h="3.2rem"
                background={'transparent'}
                w={'full'}
                zIndex="1"
                onClick={onOpen}
              >
                <InputLeftElement
                  w="3.2rem"
                  h="full"
                  pointerEvents="none"
                  bg="transparent"
                >
                  <BiSearch size={22} color="#75757530" />
                </InputLeftElement>
                <Input
                  variant={'unstyled'}
                  pl="3.2rem"
                  h="3.2rem"
                  fontSize={'sm'}
                  background="#05060F"
                  bg="transparent"
                  placeholder="Search Projects, Grants, Hackathons & People... "
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  _placeholder={{
                    color: '#75757550',
                    fontSize: 'sm',
                    fontWeight: '400',
                  }}
                  _focus={{
                    outline: 'none',
                    boxShadow: 'none',
                    rounded: '8px',
                  }}
                />
              </InputGroup>
              <VStack p="12px" pt="0px" w="full" rounded="8px">
                <Box w="full" h="1px" bg="neutral.4" />
                {/* Call to actions */}
                {/* Projects */}
                {projectsLoading ? (
                  <Spinner color="purple.500" size="xl" />
                ) : projectsIsError ? (
                  <Box p="16px">
                    Error: {projectsError?.message || 'Something went wrong.'}
                  </Box>
                ) : filteredProjects.length === 0 &&
                  searchInput.trim() !== '' ? (
                  <Box p="16px">No results found for {searchInput}.</Box>
                ) : (
                  <VStack align="start" w="full" spacing="8px">
                    <Box as="p" textStyle={'body5'} color="neutral.8">
                      Projects
                    </Box>
                    {filteredProjects.map((project, index) => (
                      <HStack
                        key={project.id}
                        as={Link}
                        gap="8px"
                        rounded="8px"
                        w="full"
                        p="8px"
                        bg={
                          index === selectedProjectIndex
                            ? 'neutral.5'
                            : 'transparent'
                        }
                        href={`/project/${project.id}`}
                      >
                        <Avatar
                          src={project.logo}
                          name={project.name}
                          width={{ base: '20px', md: '28px' }}
                          height={{ base: '20px', md: '28px' }}
                          rounded="full"
                        />
                        <HStack justify={'start'} gap="0" align={'center'}>
                          <Box as="p" color="white" textStyle="title5">
                            {project.name}
                          </Box>
                          <Box
                            as="p"
                            color="neutral.8"
                            fontSize={'11px'}
                            lineHeight="12px"
                          >
                            by @irffan
                          </Box>
                        </HStack>
                      </HStack>
                    ))}
                  </VStack>
                )}
                {/* Grants */}
                {/* Hackathons */}
                {/* People */}
                {peopleLoading ? (
                  <Spinner color="purple.500" size="xl" />
                ) : peopleIsError ? (
                  <Box p="16px">
                    Error: {peopleError?.message || 'Something went wrong.'}
                  </Box>
                ) : filteredPeople.length === 0 && searchInput.trim() !== '' ? (
                  <Box p="16px">No results found for {searchInput}.</Box>
                ) : (
                  <VStack align="start" w="full" spacing="8px">
                    <Box as="p" textStyle={'body5'} color="neutral.8">
                      People
                    </Box>
                    {/* {filteredPeople.map((person, index) => (
                    // Display each person...
                  ))} */}
                  </VStack>
                )}
              </VStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <InputGroup
        display={display}
        rounded="8px"
        h="fit-content"
        background={'#0F0F0F'}
        border="1px solid #1B181A"
        w={width}
        zIndex="1"
        onClick={() => {
          onOpen();
        }}
      >
        <InputLeftElement
          w="3.5rem"
          h="full"
          pointerEvents="none"
          bg="transparent"
        >
          <BiSearch size="1.4rem" color="#75757530" />
        </InputLeftElement>

        <Center alignItems="center" h="2.5rem">
          <Box
            as="p"
            pl="3rem"
            fontSize={'md'}
            background="#05060F"
            bg="transparent"
            color="#757575"
            opacity="0.3"
            fontWeight="400"
            pb={'3px'}
          >
            Search
          </Box>
        </Center>
      </InputGroup>
    </>
  );
};
