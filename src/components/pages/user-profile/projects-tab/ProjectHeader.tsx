import { Avatar, Box, Button, Center, HStack, VStack } from '@chakra-ui/react';
import { ProjectsModel } from '@prisma/client';
import { useRouter } from 'next/router';
import GetFormattedLink from '~/components/HOC/GetLink';

const ProjectHeader = ({ project }: { project: ProjectsModel }) => {
  const router = useRouter();
  return (
    <HStack px={{ base: '16px', md: '24px' }} gap="16px" w="full">
      <Center>
        <Avatar
          src={project.logo}
          name={project.name}
          width="52px"
          height="52px"
        />
      </Center>
      <VStack alignItems={'start'} align={'center'} justify="center">
        <Box as="p" textStyle="title2" color="white">
          {project.name}
        </Box>
        <GetFormattedLink link={project.project_link} />
      </VStack>
      <Center w="full" justifyContent={'end'}>
        <Button
          variant={'connect_wallet'}
          onClick={() => {
            router.push({
              pathname: '/projects/[projectId]',
              query: { projectId: project.id },
            });
          }}
          maxW="10rem"
        >
          View Project
        </Button>
      </Center>
    </HStack>
  );
};

export default ProjectHeader;
