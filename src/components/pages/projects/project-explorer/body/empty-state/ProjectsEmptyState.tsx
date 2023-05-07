import React from 'react';
import { Box, Center } from '@chakra-ui/react';

const EmptyProjectsState = () => (
  <Center>
    <Box as="p" textStyle={{ base: 'body6', md: 'body5' }} color="white">
      No projects found in this category.
    </Box>
  </Center>
);

export default EmptyProjectsState;
