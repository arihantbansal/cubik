import {
  Avatar,
  Box,
  Button,
  Card,
  Center,
  Container,
  HStack,
  IconButton,
  SlideFade,
  useToast,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import {
  Contribution,
  ProjectJoinRound,
  ProjectsModel,
  Round,
  UserModel,
} from '@prisma/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import { HiCheck } from 'react-icons/hi';
import { MdRemove } from 'react-icons/md';
import CustomTag from '~/components/common/tags/CustomTag';
import { RemoveToast, SuccessToast } from '~/components/common/toasts/Toasts';
import GetFormattedLink from '~/components/HOC/GetLink';
import useListStore from '~/store/listStore';
import { formatNumberWithK } from '~/utils/formatWithK';
import ProjectsContributorsNumber from './ProjectsContributorsNumber';

type PropsType = {
  projectJoinRound: ProjectJoinRound & {
    project: ProjectsModel;
    fundingRound: Round & {
      Contribution: (Contribution & {
        user: UserModel;
      })[];
    };
  };
};

// In the ProjectsList component
type ProjectsListProps = {
  allProjectsData: (ProjectJoinRound & {
    project: ProjectsModel & {
      owner: UserModel;
    };
    contributors: (Contribution & {
      user: UserModel;
    })[];
    fundingRound: Round;
  })[];
  owner?: UserModel;
};

type ProjectCardProps = {
  projectJoinRound: ProjectJoinRound & {
    project: ProjectsModel & {
      owner: UserModel;
    };
    contributors: (Contribution & {
      user: UserModel;
    })[];
    fundingRound: Round;
  };
};

const ProjectCard = ({ projectJoinRound }: ProjectCardProps) => {
  const toast = useToast();
  const addProject = useListStore((state) => state.addProject);
  const removeProject = useListStore((state) => state.removeProject);
  const projectList = useListStore((state) => state.projectList);

  const [isHovered, setIsHovered] = useState(false);
  const [addedToList, setAddedToList] = useState(
    !!projectList.find((item) => item.id === projectJoinRound.project.id)
  );

  const industry = JSON.parse(projectJoinRound.project?.industry);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleAddOrRemoveProject = () => {
    if (addedToList) {
      removeProject(projectJoinRound.project.id);
      setAddedToList(false);
      RemoveToast({ toast, message: 'Project removed from list' });
    } else {
      addProject(projectJoinRound.project);
      setAddedToList(true);
      SuccessToast({ toast, message: 'Project added to list' });
    }
  };

  useEffect(() => {
    setAddedToList(
      !!projectList.find((item) => item.id === projectJoinRound.projectId)
    );
  }, [projectList]);

  return (
    <Card
      border={addedToList ? '2px solid #659C95' : '2px solid transparent'}
      borderRadius="16px"
      p="0"
      h={{ base: '20rem', md: '23rem' }}
      cursor="pointer"
      w="100%"
      maxW={{
        base: '92vw',
        sm: '87vw',
        md: '44vw',
        lg: '29.5vw',
        xl: '25.5rem',
      }}
      onTouchStart={() => setIsHovered((prevState) => !prevState)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      gap="0"
      background={'#0C0D0D'}
      position={'relative'}
    >
      {/* card outline */}
      {addedToList && (
        <Center
          position={'absolute'}
          w="1.6rem"
          h="1.6rem"
          rounded="full"
          bg="#659C95"
          right="-0.6rem"
          top="-0.6rem"
        >
          <HiCheck size={16} color="#001F1B" />
        </Center>
      )}
      {/* card Header */}
      {
        // if project is participating in a round then make it visible else don't show it
        <Center w="full" bg={`surface.blue.3`} borderTopRadius={'16px'}>
          <HStack
            w="full"
            gap="8px"
            borderColor="red"
            borderBottom={'red'}
            padding={'12px 24px'}
            borderTopRadius={'16px'}
            justifyContent="space-between"
          >
            <Box
              w="full"
              as="p"
              noOfLines={1}
              whiteSpace={'nowrap'}
              color={`surface.red.1`}
              textStyle={'overline4'}
              textTransform="uppercase"
              letterSpacing={'0.2em'}
              fontSize={{ base: '8px', md: '10px' }}
            >
              Participating In
            </Box>
            <Box
              as="p"
              w="fit-content"
              whiteSpace={'nowrap'}
              textStyle={{ base: 'title6', md: 'title5' }}
              color={`surface.red.1`}
            >
              --- Round
            </Box>
          </HStack>
        </Center>
      }
      {/* cards footer */}
      <VStack
        w="full"
        alignItems={'start'}
        justifyContent="space-between"
        h="full"
      >
        <VStack
          p="24px"
          gap={{ base: '12px', md: '16px' }}
          w="full"
          alignItems={'start'}
        >
          <HStack justifyContent={'space-between'}>
            <Avatar
              src={projectJoinRound.project.logo}
              name="anchor"
              borderRadius={'8px'}
              size={{ base: 'md', md: 'lg' }}
            />
          </HStack>
          <VStack gap="0" spacing="0" w="full">
            <HStack align={'end'} w="full" justify="space-between">
              <Box as="p" textStyle={{ base: 'title4', md: 'title3' }}>
                {projectJoinRound.project.name}
              </Box>
              <Box
                as="p"
                color="#A8F0E6"
                textStyle={{ base: 'title4', md: 'title3' }}
              >
                ${formatNumberWithK(0)}
              </Box>
            </HStack>
            <HStack w="full" justify="space-between">
              <Center>
                <GetFormattedLink
                  link={projectJoinRound.project.project_link}
                />
              </Center>
              <Box
                color="neutral8"
                as="p"
                textStyle={{ base: 'body6', md: 'body5' }}
              >
                Raised
              </Box>
            </HStack>
          </VStack>
          <Box
            color="neutral8"
            as="p"
            textStyle={{ base: 'body5', md: 'body4' }}
            sx={{
              noOfLines: '3',
            }}
            alignContent="start"
            alignItems={'start'}
            textAlign={'start'}
          >
            {projectJoinRound.project.short_description}
          </Box>
        </VStack>
        {/* card footer */}
        <VStack
          marginTop={'0px !important'}
          p="8px 24px 24px 24px"
          w="full"
          position={'relative'}
        >
          <HStack
            display={isHovered ? 'none' : 'flex'}
            overflowX="hidden"
            w="full"
            justify="space-between"
          >
            <Box
              w="full"
              flex="4"
              minWidth="0"
              position="relative"
              _after={{
                content: '""',
                position: 'absolute',
                top: '45%',
                right: '0%',
                transform: 'translateY(-50%)',
                height: '2.2rem',
                width: '3rem',
                background: 'linear-gradient(90deg, #0C0D0D00 0%, #0C0D0D 80%)',
              }}
            >
              <HStack
                overflow="clip"
                w="full"
                mt="auto"
                justify="start"
                whiteSpace="nowrap" // Set whiteSpace to nowrap
              >
                {industry.map((tag: any, key: any) => {
                  return (
                    <CustomTag color={tag.label} key={key}>
                      {tag.label}
                    </CustomTag>
                  );
                })}
              </HStack>
            </Box>
            <ProjectsContributorsNumber
              projectId={projectJoinRound.project.id}
              projectJoinRound={projectJoinRound}
            />
          </HStack>
          <SlideFade in={isHovered} offsetY="0px" reverse>
            <HStack
              zIndex={'9'}
              w="full"
              justifyContent="start"
              position="absolute"
              left="0"
              p="8px 24px 24px 24px"
              bottom="0px"
              backgroundColor={'#0C0D0D'}
              borderRadius="36px"
              justify={'space-between'}
            >
              <Button
                as={Link}
                href={`/projects/${projectJoinRound.project.id}/join/${projectJoinRound.id}`}
                background={'#1D1F1E'}
                color="white"
                fontWeight={'700'}
                borderColor="transparent"
                outline="none"
                w="calc(100% - 2.2rem)"
                variant="connect_wallet"
              >
                View Details
              </Button>
              <IconButton
                background={'#1D1F1E'}
                color="white"
                fontWeight={'700'}
                borderColor="transparent"
                outline="none"
                onClick={handleAddOrRemoveProject}
                aria-label="link"
                variant="connect_wallet"
                icon={
                  addedToList ? <MdRemove size={26} /> : <BsPlus size={26} />
                }
              />
            </HStack>
          </SlideFade>
        </VStack>
      </VStack>
    </Card>
  );
};

const ProjectsList = ({ allProjectsData }: ProjectsListProps) => {
  console.log(allProjectsData, ' ----');
  return (
    <Container maxW="7xl" overflow={'visible'} p="0">
      <Wrap
        overflow={'visible'}
        py="8px"
        spacing="1.5rem"
        w="100%"
        margin="0"
        justify={'center'}
        align="center"
        direction={{ base: 'column', sm: 'row', md: 'row' }}
      >
        {allProjectsData.map(
          (projectJoinRound, key: React.Key | null | undefined) => {
            console.log('====================================');
            console.log(projectJoinRound);
            console.log('====================================');
            return (
              <ProjectCard key={key} projectJoinRound={projectJoinRound} />
            );
          }
        )}
      </Wrap>
    </Container>
  );
};

export default ProjectsList;
