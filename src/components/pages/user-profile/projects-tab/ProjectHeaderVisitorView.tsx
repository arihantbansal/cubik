import {
  Avatar,
  Box,
  Button,
  Center,
  Skeleton,
  SkeletonCircle,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { ProjectsModel } from '@prisma/client';
import Link from 'next/link';
import { useRef } from 'react';
import GetFormattedLink from '~/components/HOC/GetLink';

export const ProjectHeaderVisitorView = ({
  project,
  isLoading,
}: {
  project: ProjectsModel;
  isLoading: boolean;
}) => {
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
          <SkeletonCircle
            isLoaded={!isLoading}
            fadeDuration={2}
            opacity={isLoading ? '0.5' : '1'}
            width={{ base: '42px', sm: '48px', md: '52px' }}
            height={{ base: '42px', sm: '48px', md: '52px' }}
          >
            <Avatar
              src={project?.logo}
              name={project?.name}
              width={{ base: '42px', sm: '48px', md: '52px' }}
              height={{ base: '42px', sm: '48px', md: '52px' }}
            />
          </SkeletonCircle>
          <VStack
            alignItems={'start'}
            align={'center'}
            justify="center"
            spacing={{ base: '2px', sm: '4px', md: '6px' }}
          >
            <Skeleton
              isLoaded={!isLoading}
              fadeDuration={3}
              opacity={isLoading ? '0.5' : '1'}
              w={'8rem'}
            >
              <Box
                as="p"
                textStyle={{ base: 'title4', sm: 'title3', md: 'title2' }}
                noOfLines={1}
                textAlign="left"
                color="white"
              >
                {project?.name}
              </Box>
            </Skeleton>
            {isLoading ? (
              <Skeleton w="8rem" h="1rem" opacity={0.4} />
            ) : (
              <GetFormattedLink
                isLoading={isLoading}
                link={project?.project_link}
              />
            )}
          </VStack>
        </Stack>
        <Center w="full" justifyContent={'end'}>
          <Skeleton
            isLoaded={!isLoading}
            fadeDuration={3}
            opacity={isLoading ? '0.3' : '1'}
            w={{ base: 'full', sm: 'auto' }}
          >
            <Button
              w="full"
              variant={'cubikOutlined'}
              size={{ base: 'cubikMini', md: 'cubikSmall' }}
              as={Link}
              href={'/projects/' + project?.id} // todo: adding round id to this route
            >
              View Details
            </Button>
          </Skeleton>
        </Center>
      </Stack>
    </>
  );
};
export default ProjectHeaderVisitorView;
