import {
  Avatar,
  Box,
  Button,
  Center,
  HStack,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { ProjectsModel } from '@prisma/client';
import { useRouter } from 'next/router';
import GetFormattedLink from '~/components/HOC/GetLink';

const ProjectHeader = ({ project }: { project: ProjectsModel }) => {
  const router = useRouter();
  const headerSpacing = {
    base: '16px',
    sm: '20px',
    md: '24px',
  };
  return (
    <Stack
      direction={{ base: 'column', sm: 'row' }}
      px={headerSpacing}
      gap={headerSpacing}
      w="full"
    >
      <HStack gap={{ base: '8px', sm: '12px', md: '16px' }}>
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
            color="white"
          >
            {project.name}
          </Box>
          <GetFormattedLink link={project.project_link} />
        </VStack>
      </HStack>
      <Center w="full" justifyContent={'end'}>
        <Button
          variant={'project_button_secondary'}
          onClick={() => {
            router.push({
              pathname: '/projects/[projectId]',
              query: { projectId: project.id },
            });
          }}
          w="full"
          maxW={{ base: 'full', sm: '8rem', md: '10rem' }}
        >
          View Project
        </Button>
      </Center>
    </Stack>
  );
};

export default ProjectHeader;
