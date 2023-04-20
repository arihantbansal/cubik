import {
  Avatar,
  Box,
  Button,
  Card,
  Center,
  Container,
  Heading,
  HStack,
  IconButton,
  SlideFade,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import { ProjectsModel } from '@prisma/client';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import { MdRemove } from 'react-icons/md';
import CustomTag from '~/components/common/tags/CustomTag';
import GetFormattedLink from '~/components/HOC/GetLink';
import useListStore from '~/store/listStore';
import { formatNumberWithK } from '~/utils/formatWithK';

type PropsType = {
  project: ProjectsModel;
};

const ProjectCard = ({ project }: PropsType) => {
  const router = useRouter();
  const addProject = useListStore((state) => state.addProject);
  const removeProject = useListStore((state) => state.removeProject);
  const projectList = useListStore((state) => state.projectList);

  const [isHovered, setIsHovered] = useState(false);
  const [addedToList, setAddedToList] = useState(
    !!projectList.find((item) => item.id === project.id)
  );

  const industry = JSON.parse(project.industry);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleAddOrRemoveProject = () => {
    if (addedToList) {
      removeProject(project.id);
      setAddedToList(false);
    } else {
      addProject(project);
      setAddedToList(true);
    }
  };

  useEffect(() => {
    setAddedToList(!!projectList.find((item) => item.id === project.id));
  }, [projectList]);

  return (
    <Card
      onClick={() => setIsHovered(true)}
      p="0"
      h="23rem"
      cursor="pointer"
      w="100%"
      maxW={{
        base: '85vw',
        sm: '87vw',
        md: '44vw',
        lg: '29.5vw',
        xl: '25.5rem',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      gap="0"
      background={'#0C0D0D'}
      border="none"
    >
      <Center w="full" bg="#001F1B" borderTopRadius={'16px'}>
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
            color="#ADB8B6"
            textStyle={'overline4'}
            textTransform="uppercase"
            letterSpacing={'0.2em'}
            fontSize={{ base: '8px', md: '10px' }}
          >
            Participating In
          </Box>
          <Box
            display={{ base: 'none', md: 'block' }}
            as="p"
            w="fit-content"
            whiteSpace={'nowrap'}
            textStyle={'title5'}
            color="#A8F0E6"
          >
            Alpha Grant Round
          </Box>
        </HStack>
      </Center>
      <VStack
        w="full"
        alignItems={'start'}
        justifyContent="space-between"
        h="full"
        gap="0"
      >
        <VStack p="24px" gap="16px" w="full" alignItems={'start'}>
          <HStack justifyContent={'space-between'}>
            <Avatar
              src={project.logo}
              name="anchor"
              borderRadius={'8px'}
              size={{ base: 'md', md: 'lg' }}
            />
          </HStack>
          <VStack gap="0" spacing="0" w="full">
            <HStack align={'end'} w="full" justify="space-between">
              <Box as="p" textStyle={{ base: 'title4', md: 'title3' }}>
                {project.name}
              </Box>
              <Box
                as="p"
                color="#A8F0E6"
                textStyle={{ base: 'title4', md: 'title3' }}
              >
                ${formatNumberWithK(10)}
              </Box>
            </HStack>
            <HStack w="full" justify="space-between">
              <Center>
                <GetFormattedLink link={project.project_link} />
              </Center>
              <Box
                color="neutral8"
                as="p"
                textStyle={{ base: 'body5', md: 'body5' }}
              >
                Raised
              </Box>
            </HStack>
          </VStack>
          <Box
            color="neutral8"
            as="p"
            textStyle={{ base: 'body4', md: 'body4' }}
            sx={{
              noOfLines: '2',
            }}
            alignContent="start"
            alignItems={'start'}
            textAlign={'start'}
          >
            {project.short_description}
          </Box>
        </VStack>
        <VStack
          marginTop={'0px !important'}
          p="8px 24px 24px 24px"
          w="full"
          position={'relative'}
        >
          <SlideFade in={isHovered} offsetY="0px" reverse>
            <HStack
              w="full"
              justifyContent="start"
              position="absolute"
              left="0"
              p="8px 24px 24px 24px"
              bottom="0px"
              justify={'space-between'}
            >
              <Button
                background={'#1D1F1E'}
                color="white"
                fontWeight={'700'}
                borderColor="transparent"
                outline="none"
                w="calc(100% - 2.2rem)"
                variant="connect_wallet"
                onClick={() => {
                  router.push({
                    pathname: '/projects/[id]',
                    query: { id: project.id },
                  });
                }}
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
          <Wrap
            w="full"
            mt="auto"
            align={'center'}
            justify="start"
            //  pb="0.4rem"
          >
            {industry.map((tag: any, key: any) => {
              return (
                <CustomTag color={tag.label} key={key}>
                  {tag.label}
                </CustomTag>
              );
            })}
          </Wrap>
        </VStack>
      </VStack>
    </Card>
  );
};

const ProjectsList = ({
  allProjectsData,
}: {
  allProjectsData: ProjectsModel[];
}) => {
  console.log('project data - ', allProjectsData);
  return (
    <Container maxW="7xl" overflow={'visible'} p="0">
      <Wrap
        spacing="1.5rem"
        w="100%"
        margin="0"
        justify={'center'}
        align="center"
        direction={{ base: 'column', sm: 'row', md: 'row' }}
      >
        {allProjectsData.map(
          (project: ProjectsModel, key: React.Key | null | undefined) => {
            return <ProjectCard project={project} key={key} />;
          }
        )}
      </Wrap>
    </Container>
  );
};

export default ProjectsList;
