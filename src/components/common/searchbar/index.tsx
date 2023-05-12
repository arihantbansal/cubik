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
    isLoading,
    isError,
    error,
  } = trpc.project.findMany.useQuery();
  const initialRef = useRef(null);

  const [searchInput, setSearchInput] = useState('');
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

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
      setSelectedProjectIndex((prevIndex) => {
        if (prevIndex === filteredProjects.length - 1) {
          return 0;
        }
        return prevIndex + 1;
      });
    }
    if (event.key === 'Enter') {
      router.push(`/projects/${filteredProjects[selectedProjectIndex].id}`);
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
                  placeholder="Search Projects and People... "
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
              {searchInput.length > 0 && (
                <VStack p="12px" pt="0px" w="full" rounded="8px">
                  <Box w="full" h="1px" bg="neutral.4" />
                  {isLoading ? (
                    <Spinner color="purple.500" size="xl" />
                  ) : isError ? (
                    <Box p="16px">
                      Error: {error?.message || 'Something went wrong.'}
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
                          as="button"
                          gap="8px"
                          rounded="8px"
                          w="full"
                          p="8px"
                          bg={
                            index === selectedProjectIndex
                              ? 'neutral.5'
                              : 'transparent'
                          }
                          onClick={() => router.push(`/project/${project.id}`)}
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
                </VStack>
              )}
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
