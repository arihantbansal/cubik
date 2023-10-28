'use client';

import React from 'react';
import { Box, CardHeader, HStack } from '@/utils/chakra';

import CustomStepper from './CustomStepper';

interface Props {
  step: number;
}
export const Cardheader = ({ step }: Props) => {
  return (
    <>
      <CardHeader maxW={{ base: '28rem', md: '36rem' }} mx="auto">
        <Box
          as="h1"
          color="neutral.11"
          textStyle={{ base: 'title2', md: 'title1' }}
        >
          Create New Project
        </Box>
        <Box
          as="p"
          textStyle={{ base: 'body5', md: 'body4' }}
          color="neutral.9"
        >
          Bring your vision to life! Create a project, receive grants through
          public donations, and make an impact.
        </Box>{' '}
        <HStack
          pt="18px"
          w="full"
          align="center"
          justify="center"
          spacing={{ base: '0px', md: '8px' }}
          // justify={{ base: "center", md: "space-between" }}
        >
          <CustomStepper
            steps={[
              { index: 1, name: 'Basic Information' },
              { index: 2, name: 'Project Links' },
              { index: 3, name: 'Detailed Info' },
            ]}
            currentStep={step}
          />
        </HStack>
      </CardHeader>
    </>
  );
};
