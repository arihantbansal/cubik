'use client';

import React from 'react';
import { Box, Center, HStack } from '@/utils/chakra';
import { motion } from 'framer-motion';

//import { MdCheck } from "react-icons/md";

const MotionHStack = motion(HStack);
const MotionBox = motion(Box);

type StepType = {
  index: number;
  name: string;
};

type CustomStepperProps = {
  steps: StepType[];
  currentStep: number;
};

const CustomStepper = ({ steps, currentStep }: CustomStepperProps) => {
  return (
    <>
      {steps.map((step) => {
        const status =
          step.index < currentStep
            ? 'complete'
            : step.index === currentStep
            ? 'active'
            : 'inactive';

        return (
          <Box
            maxW="fit-content"
            key={step.index}
            w={{ base: 'fit-content', sm: 'full' }}
            rounded="full"
            outline="1px solid #FFFFFF10"
            border="1px solid #FFFFFF10"
            borderRadius="full"
            py={{ base: '0.4rem', sm: '0.5rem' }}
            px={{ base: '0.6rem', sm: '0.8rem' }}
            bgGradient={
              status === 'inactive'
                ? 'linear(to-r, Transparent, Transparent)'
                : status === 'active'
                ? 'linear(to-r, #010F0D, #010F0D)'
                : 'linear(to-r, #14665B, #001F1A)'
            }
          >
            <MotionHStack
              initial={false}
              animate={status}
              backgroundColor="none"
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              variants={{
                inactive: { opacity: 1 },
                active: { opacity: 1 },
                complete: { opacity: 1 },
              }}
            >
              <Center
                background={'#E0FFFD'}
                w={{ base: '0.7rem', sm: '1.1rem' }}
                height={{ base: '0.8rem', sm: '1.1rem' }}
                rounded="full"
                as="p"
                backgroundColor={
                  status === 'complete'
                    ? 'white'
                    : status === 'active'
                    ? 'white'
                    : 'neutral.6'
                }
                color={'black'}
                textStyle={{ base: 'body7', sm: 'body6' }}
                position="relative"
              >
                <MotionBox
                  initial={{ opacity: 1 }}
                  animate={
                    status === 'complete'
                      ? { opacity: 0 }
                      : status === 'active'
                      ? { opacity: 1 }
                      : { opacity: 1 }
                  }
                  transition={{ duration: 0.1 }}
                >
                  {step.index}
                </MotionBox>
                {status === 'complete' ? (
                  //   <Box
                  // // @todo: as={MdCheck}
                  //     position="absolute"
                  //     boxSize={{ base: "12px", md: "14px" }}
                  //     style={{ color: "black" }}
                  //   />
                  <></>
                ) : (
                  <></>
                )}
              </Center>
              <Box
                as="p"
                whiteSpace="pre"
                display={{ base: 'block', sm: 'block' }}
                textStyle={{ base: 'body7', sm: 'body5' }}
                color={status === 'inactive' ? 'neutral.7' : '#E0FFFD'}
              >
                {step.name}
              </Box>
            </MotionHStack>
          </Box>
        );
      })}
    </>
  );
};

export default CustomStepper;
