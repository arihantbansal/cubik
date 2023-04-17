import { Box, Button, VStack, Icon, Skeleton } from '@chakra-ui/react';
import { ProjectsModel } from '@prisma/client';
import { MdArrowForward } from 'react-icons/md';
import { IconProps } from '@chakra-ui/react';
import { useState } from 'react';

interface ProjectCTAsProps {
  projectDetails: ProjectsModel;
  isLoading: boolean;
}

const AnimatedArrowIcon = (props: IconProps & { animate: boolean }) => {
  const transition = 'all 0.2s ease-in-out';
  const transform = props.animate ? 'translateX(0.5rem)' : '';

  return (
    <Icon
      as={MdArrowForward}
      w={6}
      h={6}
      transition={transition}
      transform={transform}
      {...props}
    />
  );
};

export const ProjectCTAs = ({
  projectDetails,
  isLoading,
}: ProjectCTAsProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box display={{ base: 'none', md: 'block' }}>
      <VStack
        ml="auto"
        right="20rem"
        w={'full'}
        alignItems={{ base: 'center', md: 'start' }}
      >
        <VStack gap="16px" align={'end'} spacing="0" w="full" pb="0.5rem">
          <Skeleton isLoaded={!isLoading} w="full">
            <Box opacity={isLoading ? '0.6' : '1'}>
              <Button variant="project_button_primary" w="full">
                Donate
              </Button>
            </Box>
          </Skeleton>
          <Skeleton isLoaded={!isLoading} w="full">
            <Box opacity={isLoading ? '0.4' : '1'}>
              <Button
                rightIcon={<AnimatedArrowIcon animate={isHovered} />}
                variant="project_button_secondary"
                w="full"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Visit Project
              </Button>
            </Box>
          </Skeleton>
        </VStack>
      </VStack>
    </Box>
  );
};
