import {
  Avatar,
  Box,
  Button,
  Center,
  HStack,
  Stack,
  VStack,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react';
import { ProjectsModel } from '@prisma/client';
import { useRouter } from 'next/router';
import { Key, useRef } from 'react';
import GetFormattedLink from '~/components/HOC/GetLink';
import { getDomain } from '~/utils/getDomain';
import { ProjectsDetailedDescription } from '../../projects/project-details/ProjectDetailedDescription';
import { ProjectLink } from '../../projects/project-details/ProjectDetailsHeader';

const DrawerBodyContent = ({ project }: { project: ProjectsModel }) => {
  console.log(
    project?.twitter_handle,
    project?.discord_link,
    project?.telegram_link,
    project?.github_link
  );
  const socials = [{ name: 'string', url: 'string' }];

  return (
    <VStack gap={{ base: '32px', md: '64px' }} w="full">
      <VStack align={'start'} w="full" gap="24px">
        <HStack w="full" justifyContent={'space-between'} align="top">
          <Avatar
            src={project.logo}
            name={project.name}
            borderRadius="8px"
            width={{ base: '80px', md: '102px' }}
            height={{ base: '80px', md: '102px' }}
          />
          <Stack
            display={{ base: 'none', md: 'flex' }}
            direction="row"
            h="fit-content"
          >
            <Button
              variant="secondary"
              h="38px"
              maxW="164px"
              borderRadius={'8px'}
            >
              Edit Project
            </Button>
            <Button variant="connect_wallet">Apply For Grant</Button>
          </Stack>
        </HStack>
        <VStack gap={{ base: '4px', md: '16px' }} w="full" align="start">
          <HStack align={'start'} w="full">
            <Box
              as="p"
              textStyle={{ base: 'headline4', md: 'headline3' }}
              color="neutral.11"
            >
              {project.name}
            </Box>
          </HStack>
          <Box as="p" textStyle={'body9'} color="neutral.9">
            {project.short_description}
          </Box>
          <HStack>
            <HStack>
              <Button
                variant="unstyled"
                display={'flex'}
                alignItems="center"
                rounded="full"
                color="brand.teal6"
                backgroundColor="brand.teal2"
                p={{ base: '0.5rem 0.8rem', md: '0.2rem 1rem' }}
                iconSpacing={{ base: '0.3rem', md: '0.4rem' }}
                leftIcon={<ProjectLink urlName={'url'} />}
                _hover={{
                  backgroundColor: 'brand.teal3',
                }}
                as="a"
                href={project.project_link}
                target="_blank"
              >
                <Box
                  as="p"
                  textStyle={{ base: 'body5', md: 'body4' }}
                  color="brand.teal.6"
                  pb="0.1rem"
                >
                  {getDomain(project.project_link)}
                </Box>
              </Button>
              {socials.length > 2 &&
                socials.map((link: { name: string; url: string }, key: Key) => (
                  <IconButton
                    aria-label={link.name}
                    variant={'unstyled'}
                    fontSize={{ base: 'sm', sm: 'md', md: 'xl' }}
                    display="flex"
                    alignItems={'center'}
                    rounded="full"
                    color="brand.teal6"
                    backgroundColor="brand.teal2"
                    key={key}
                    icon={<ProjectLink urlName={link.name} />}
                    _hover={{
                      backgroundColor: 'brand.teal3',
                    }}
                    as="a"
                    href={link.name}
                    target="_blank"
                  />
                ))}
            </HStack>
          </HStack>
        </VStack>
      </VStack>
      <Stack
        display={{ base: 'flex', md: 'none' }}
        direction={'row'}
        w="full"
        h="fit-content"
      >
        <Button variant="secondary" h="38px" maxW="164px" borderRadius={'8px'}>
          Edit Project
        </Button>
        <Button variant="connect_wallet">Apply For Grant</Button>
      </Stack>
      <Center>
        <ProjectsDetailedDescription
          description={project.long_description}
          maxH="36vh"
        />
      </Center>
    </VStack>
  );
};

const ProjectHeader = ({ project }: { project: ProjectsModel }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const headerSpacing = {
    base: '16px',
    sm: '20px',
    md: '24px',
  };

  return (
    <>
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        px={headerSpacing}
        gap={headerSpacing}
        w="full"
      >
        <Stack
          w="full"
          direction="row"
          gap={{ base: '8px', sm: '12px', md: '16px' }}
        >
          <Center>
            <Avatar
              src={project.logo}
              name={project.name}
              width={{ base: '36px', sm: '48px', md: '52px' }}
              height={{ base: '36px', sm: '48px', md: '52px' }}
            />
          </Center>
          <VStack
            alignItems={'start'}
            align={'center'}
            justify="center"
            spacing={{ base: '2px', sm: '4px', md: '6px' }}
          >
            <Box
              as="p"
              textStyle={{ base: 'title4', sm: 'title3', md: 'title2' }}
              noOfLines={1}
              textAlign="left"
              color="white"
            >
              {project.name}
            </Box>
            <GetFormattedLink link={project.project_link} />
          </VStack>
        </Stack>
        <Center justifyContent={'end'}>
          <Button
            variant={'project_button_secondary'}
            //@ts-ignore
            ref={btnRef}
            onClick={onOpen}
            w="full"
            maxW={{ base: 'full', sm: '8rem', md: '10rem' }}
          >
            View Details
          </Button>
        </Center>
        <Drawer
          w="fit-content"
          maxW="40rem"
          isOpen={isOpen}
          placement="bottom"
          onClose={onClose}
          //@ts-ignore
          finalFocusRef={btnRef}
        >
          <DrawerOverlay
            color="rgba(0, 0, 0, 0.72)"
            backdropFilter="blur(8px)"
          />
          <DrawerContent
            borderTopRadius={'24px'}
            border="1px solid ##1D1F1E"
            background="#080808"
            padding={{ base: '20px', md: '40px' }}
            maxW="80rem !important"
            mx="auto"
          >
            <DrawerCloseButton
              transform={{
                base: 'translate(-1rem, 1rem)',
                md: 'translateY(-3rem)',
              }}
              rounded="full"
              backgroundColor="#141414"
              border="1px solid #ffffff10"
            />
            <DrawerBody p="0">
              <DrawerBodyContent project={project} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Stack>
    </>
  );
};

export default ProjectHeader;
