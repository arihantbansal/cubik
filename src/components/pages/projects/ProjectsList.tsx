import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Heading,
  HStack,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { BiLink } from 'react-icons/bi';
import CustomTag from '~/components/common/tags/CustomTag';
import { projectType } from '~/types/project';
import { formatNumberWithK } from '~/utils/formatWithK';
import { getDomain } from '~/utils/getDomain';

type PropsType = {
  project: projectType;
};

const ProjectCard = ({ project }: PropsType) => {
  const router = useRouter();
  console.log(project);
  return (
    <Center
      onClick={() => {
        router.push({
          pathname: '/projects/[projectId]',
          query: { projectId: project.id },
        });
      }}
      w="100%"
      flexDirection="column"
      h={{ base: '', md: '20rem' }}
      backgroundColor="#070914"
      rounded="6px"
      cursor="pointer"
      p={{ base: '1.5rem', xl: '1rem 1.8rem' }}
      maxW={{
        base: '83vw',
        sm: '83vw',
        md: '42vw',
        lg: '30vw',
        xl: '24rem',
      }}
      _hover={{
        backgroundColor: '#060714',
      }}
    >
      <VStack w="full" alignItems={'start'} justifyContent="start">
        <HStack
          py={{ base: '0.5rem', md: '1rem' }}
          justifyContent={'space-between'}
        >
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
              {project.project_name}
            </Box>
            <Heading as="p" textStyle={{ base: 'title2', md: 'title1' }}>
              ${formatNumberWithK(project.total)}
            </Heading>
          </HStack>
          <HStack w="full" justify="space-between">
            <Button
              as="a"
              href={project.project_link}
              target="_blank"
              h="fit-content"
              leftIcon={<BiLink />}
              variant={'unstyled'}
              fontSize={{ base: 'xs', md: 'sm' }}
              color="#FF85D6"
              fontWeight={'600'}
              display="flex"
              alignItems={'center'}
              justifyContent="start"
              gap="0px"
              iconSpacing={'3px'}
              _hover={{
                textDecoration: 'underline',
              }}
            >
              {getDomain(project.project_link)}
            </Button>
            <Box
              color="#B4B0B2"
              as="p"
              textStyle={{ base: 'body5', md: 'body5' }}
            >
              Raised
            </Box>
          </HStack>
        </VStack>
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
      <Wrap w="full" mt="auto" pb="0.4rem">
        {project.industry.map((tag, key) => {
          return (
            <CustomTag color={tag.label} key={key}>
              {tag.label}
            </CustomTag>
          );
        })}
      </Wrap>
    </Center>
  );
};
const ProjectsList = ({ allProjectsData }: any) => {
  console.log('project data - ', allProjectsData);
  return (
    <Container maxW="7xl" overflow={'visible'} p="0">
      <Wrap
        spacing="1.5rem"
        w="100%"
        padding="2rem 0px"
        margin="0"
        justify={'center'}
        align="center"
        direction={{ base: 'column', sm: 'row', md: 'row' }}
      >
        {allProjectsData.map(
          (project: projectType, key: React.Key | null | undefined) => {
            return <ProjectCard project={project} key={key} />;
          }
        )}
      </Wrap>
    </Container>
  );
};

export default ProjectsList;
