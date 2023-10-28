'use client';

import React from 'react';
import {
  Box,
  Center,
  HStack,
  Step,
  StepIndicator,
  Stepper,
  StepSeparator,
  StepStatus,
  useSteps,
  VStack,
} from '@/utils/chakra';
//import { BsCheckCircle } from "react-icons/bs";
//import { BiCalendar } from "react-icons/bi";
import { formateDateInMonths } from '@/utils/helpers/formateDateInMonths';
//import { CgTimelapse } from "react-icons/cg";
import { isFuture, isPast } from 'date-fns';

interface Props {
  slug: string;
  resultDate: Date;
  registrationEndDate: Date;
  registrationStartDate: Date;
  hackathonEndDate: Date;
  hackathonStartDate: Date;
  votingStartDate: Date;
  votingEndDate: Date;
}
export const HackathonSchedule = ({
  hackathonEndDate,
  hackathonStartDate,
  registrationEndDate,
  registrationStartDate,
  resultDate,
  votingEndDate,
  votingStartDate,
}: Props) => {
  const isEventActive = ({
    start,
    end,
  }: {
    index: number;
    title: string;
    start?: Date;
    end?: Date;
  }) => {
    if (start && isPast(new Date(start as Date))) {
      if (end && isFuture(new Date(end as Date))) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  };

  const steps: { title: string; start: Date; endDate?: Date; index: number }[] =
    [
      {
        title: 'Registration',
        start: registrationStartDate,
        endDate: registrationEndDate,
        index: 0,
      },
      {
        title: 'Hackathon',
        start: hackathonStartDate,
        endDate: hackathonEndDate,
        index: 1,
      },
      {
        title: 'Voting Period',
        start: votingStartDate,
        endDate: votingEndDate,
        index: 2,
      },
      {
        title: 'Results',
        start: resultDate,
        index: 3,
      },
    ];
  const { activeStep } = useSteps({
    index: steps.findIndex(isEventActive),
    count: steps.length,
  });
  return (
    <>
      <Stepper
        index={activeStep}
        colorScheme="teal"
        orientation="vertical"
        gap="0"
        w="full"
      >
        {steps.slice(0, 3).map((event) => (
          <Step key={event.index} style={{ width: '100%' }}>
            <StepIndicator
              borderColor={activeStep === event.index ? '#14665B' : '#1D1F1E'}
              bg={activeStep === event.index ? '#14665B' : '#1D1F1E'}
            >
              <StepStatus
                complete={
                  <Center>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    >
                      <path d="M12 8v4.816a.5.5 0 0 0 .232.422L15 15m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </Center>
                }
                incomplete={
                  <Box rounded="full" width="12px" height="12px" bg="#3B3D3D" />
                }
                // active={<CgTimelapse color="#A8F0E6" />}
                active={
                  <Center>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    >
                      <path d="M12 8v4.816a.5.5 0 0 0 .232.422L15 15m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </Center>
                }
              />
            </StepIndicator>
            <VStack
              w="90%"
              ml={'1rem'}
              mb="32px"
              border="1px solid"
              borderColor={'neutral.3'}
              backgroundColor={'neutral.2'}
              padding="24px"
              h="fit-content"
              rounded={'12px'}
              flexShrink="0"
              align={'start'}
              spacing="12px"
            >
              <Box
                textTransform={'capitalize'}
                as="p"
                textStyle={'title2'}
                color="neutral.11"
              >
                {event.title}
              </Box>
              <HStack gap="12px">
                <HStack bg="neutral.4" rounded="12px" p="12px" spacing="8px">
                  {/* <Box // @todo: add icon
                    as={BiCalendar}
                    color="white"
                    boxSize={{ base: "16px", md: "22px" }}
                  /> */}
                  <Box as="p" textStyle={'title4'} color="neutral.11">
                    {formateDateInMonths(event.start)}
                  </Box>
                </HStack>
                {event.endDate && (
                  <HStack bg="neutral.4" rounded="12px" p="12px" spacing="8px">
                    {/* <Box // @todo: add icon
                      as={BiCalendar}
                      color="white"
                      boxSize={{ base: "16px", md: "22px" }}
                    /> */}
                    <Box as="p" textStyle={'title4'} color="neutral.11">
                      {formateDateInMonths(event.endDate)}
                    </Box>
                  </HStack>
                )}
              </HStack>
            </VStack>
            {/* @ts-ignore */}
            <StepSeparator bg="#1D1F1E" />
          </Step>
        ))}
      </Stepper>
    </>
  );
};
