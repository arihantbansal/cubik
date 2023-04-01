import {
  Avatar,
  Box,
  Button,
  Card,
  Center,
  Container,
  Heading,
  HStack,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import { ProjectsModel } from '@prisma/client';
import { useRouter } from 'next/router';
import React from 'react';
import { BiLink } from 'react-icons/bi';
import CustomTag from '~/components/common/tags/CustomTag';
import GetFormattedLink from '~/components/HOC/GetLink';
import { formatNumberWithK } from '~/utils/formatWithK';
import { getDomain } from '~/utils/getDomain';

type PropsType = {
  project: ProjectsModel;
};

const ProjectCard = ({ project }: PropsType) => {
  const router = useRouter();
  console.log(project);
  const industry = JSON.parse(project.industry);
  return (
    <Card
      onClick={() => {
        router.push({
          pathname: '/projects/[projectId]',
          query: { projectId: project.id },
        });
      }}
      w="100%"
      p="24px"
      cursor="pointer"
      maxW={{
        base: '83vw',
        sm: '83vw',
        md: '42vw',
        lg: '30vw',
        xl: '24rem',
      }}
    >
      <VStack w="full" alignItems={'start'} justifyContent="start">
        <HStack justifyContent={'space-between'}>
          <Avatar
            src={project.logo}
            name="anchor"
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
        >
          {project.short_description}
        </Box>
      </VStack>

      <Wrap w="full" mt="auto" pb="0.4rem">
        {industry.map((tag: any, key: any) => {
          return (
            <CustomTag color={tag.label} key={key}>
              {tag.label}
            </CustomTag>
          );
        })}
      </Wrap>
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
