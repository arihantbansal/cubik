import React from 'react';
import Link from 'next/link';
import { getDomain } from '@/utils/helpers/getDomain';
import { Avatar, Box, Button, Center, Stack, VStack } from '@chakra-ui/react';

import type { ProjectCommonType } from './type';

interface Props {
  project: ProjectCommonType;
}
export const VisitorViewCardHeader = (props: Props) => {
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
          <Avatar
            src={props.project.logo}
            name={props.project.name}
            borderRadius={'8px'}
            width={{ base: '42px', sm: '48px', md: '52px' }}
            height={{ base: '42px', sm: '48px', md: '52px' }}
          />
          <VStack
            alignItems={'start'}
            align={'center'}
            justify="center"
            spacing={{ base: '2px', sm: '4px', md: '6px' }}
          >
            <Box
              as="p"
              textStyle={{ base: 'title4', sm: 'title3', md: 'title2' }}
              noOfLines={1}
              textAlign="left"
              color="white"
            >
              {props.project.name}
            </Box>
            <Center color="neutral.8">
              <Box as="p" textStyle={{ base: 'title6', md: 'title5' }}>
                {getDomain(props?.project.projectLink)}
              </Box>
            </Center>
          </VStack>
        </Stack>
        <Center w="full" justifyContent={'end'}>
          <Link href={'/project/' + props.project.id}>
            <Button
              w="full"
              variant={'cubikOutlined'}
              size={{ base: 'cubikMini', md: 'cubikSmall' }}
            >
              View Details
            </Button>
          </Link>
        </Center>
      </Stack>
    </>
  );
};
