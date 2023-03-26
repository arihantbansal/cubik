import { Avatar, Box, Button, Center, HStack, VStack } from '@chakra-ui/react';
import GetFormattedLink from '~/components/HOC/GetLink';
import { UserProject } from '~/types/userProject';

const ProjectHeader = ({ project }: { project: UserProject }) => {
  return (
    <HStack px={{ base: '16px', md: '24px' }} gap="16px" w="full">
      <Center>
        <Avatar
          src={project.logo}
          name={project.project_name}
          width="52px"
          height="52px"
        />
      </Center>
      <VStack alignItems={'start'} align={'center'} justify="center">
        <Box as="p" textStyle="title2" color="white">
          {project.project_name}
        </Box>
        <GetFormattedLink link={project.project_link} />
      </VStack>
      <Center w="full" justifyContent={'end'}>
        <Button variant={'connect_wallet'} maxW="10rem">
          View Project
        </Button>
      </Center>
    </HStack>
  );
};

export default ProjectHeader;
