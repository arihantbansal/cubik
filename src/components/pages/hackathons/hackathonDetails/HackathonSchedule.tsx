import {
  Box,
  HStack,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  VStack,
  useSteps,
} from '@chakra-ui/react';
import React from 'react';
import { BiCalendar } from 'react-icons/bi';
import { BsCheck, BsCheck2Circle, BsCheckCircle } from 'react-icons/bs';
import { CgTimelapse } from 'react-icons/cg';
import { formateDateInMonths } from '~/utils/formatDates';

const today = new Date();
const steps: { title: string; date: Date }[] = [
  {
    title: 'Registration Starts',
    date: today,
  },
  { title: 'Hackathon', date: today },
  { title: 'Voting', date: today },
  { title: 'Results', date: today },
];

const HackathonSchedule = () => {
  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  return (
    <Stepper
      index={activeStep}
      colorScheme="teal"
      orientation="vertical"
      gap="0"
      w="full"
    >
      {steps.map((step, index) => (
        <Step key={index} style={{ width: '100%' }}>
          <StepIndicator>
            <StepStatus
              complete={
                <Box
                  as={BsCheckCircle}
                  rounded="full"
                  width="12px"
                  height="12px"
                  bg="#A8F0E6"
                />
              }
              incomplete={
                <Box rounded="full" width="12px" height="12px" bg="#3B3D3D" />
              }
              active={<CgTimelapse color="#A8F0E6" />}
            />
          </StepIndicator>
          <VStack
            w="100%"
            mb="32px"
            //border="1px solid"
            // borderColor={'neutral.3'}
            backgroundColor={'neutral.2'}
            padding="24px"
            h="fit-content"
            rounded={'12px'}
            flexShrink="0"
            align={'start'}
            spacing="12px"
          >
            <Box as="p" textStyle={'title2'} color="neutral.11">
              {step.title}
            </Box>
            <HStack gap="12px">
              <HStack bg="neutral.4" rounded="12px" p="12px" spacing="8px">
                <Box
                  as={BiCalendar}
                  color="white"
                  boxSize={{ base: '16px', md: '22px' }}
                />
                <Box as="p" textStyle={'title4'} color="neutral.11">
                  {formateDateInMonths(step.date)}
                </Box>
              </HStack>
              <HStack bg="neutral.4" rounded="12px" p="12px" spacing="8px">
                <Box
                  as={BiCalendar}
                  color="white"
                  boxSize={{ base: '16px', md: '22px' }}
                />
                <Box as="p" textStyle={'title4'} color="neutral.11">
                  {formateDateInMonths(step.date)}
                </Box>
              </HStack>
            </HStack>
          </VStack>
          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
};

export default HackathonSchedule;
