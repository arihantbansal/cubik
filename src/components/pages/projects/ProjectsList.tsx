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
      p="24px"
      h="17.8rem"
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
    >
      <VStack w="full" alignItems={'start'} justifyContent="start">
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
            <Box
              pb="0.3rem"
              as="p"
              textStyle={{ base: 'title4', md: 'title2' }}
            >
              {project.name}
            </Box>
            <Heading as="p" textStyle={{ base: 'title2', md: 'title1' }}>
              ${formatNumberWithK(10)}
            </Heading>
          </HStack>
          <HStack w="full" justify="space-between">
            <Center>
              <GetFormattedLink link={project.project_link} />
            </Center>
            <Box
              color="#B4B0B2"
              as="p"
              textStyle={{ base: 'body5', md: 'body5' }}
            >
              Raised
            </Box>
          </HStack>
        </VStack>
        <Box
          color="#B4B0B2"
          as="p"
          pt="1rem"
          textStyle={{ base: 'body4', md: 'body4' }}
          sx={{
            noOfLines: '2',
          }}
          h="3.2rem"
        >
          {project.short_description}
        </Box>
        <SlideFade in={isHovered} offsetY="0px" reverse>
          <HStack
            w="full"
            justifyContent="start"
            position="absolute"
            bottom="24px"
          >
            <Button
              w="calc(100% - 6rem)"
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
              onClick={handleAddOrRemoveProject}
              aria-label="link"
              variant="connect_wallet"
              icon={addedToList ? <MdRemove size={22} /> : <BsPlus size={22} />}
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
