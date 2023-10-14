import {
  Box,
  HStack,
  Skeleton,
  Step,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  VStack,
  useSteps,
} from "@chakra-ui/react";
import React from "react";
import { BiCalendar } from "react-icons/bi";
import { BsCheckCircle } from "react-icons/bs";
import { CgTimelapse } from "react-icons/cg";
import { formateDateInMonths } from "~/utils/formatDates";
import { HackathonSchedule } from "~/types/hackathon";
import { isFuture, isPast } from "date-fns";
const steps: { title: string; start: Date; endDate?: Date }[] = [
  {
    title: "Registration Starts",
    start: new Date("2023-06-30T00:00:00+0000"),
  },
  {
    title: "Game Jam",
    start: new Date("2023-07-26T00:00:00+0000"),
    endDate: new Date("2023-07-30T00:00:00+0000"),
  },
  {
    title: "Voting Period",
    start: new Date("2023-08-01T00:00:00+0000"),
    endDate: new Date("2023-08-06T00:00:00+0000"),
  },
  {
    title: "Results",
    start: new Date("2023-08-07T00:00:00+0000"),
  },
];

const isEventActive = ({
  index,
  name,
  start,
  end,
}: {
  index: number;
  name: string;
  start?: Date;
  end?: Date;
}) => {
  console.log(name, isPast(new Date(start as Date)));
  if (start && isPast(new Date(start as Date))) {
    console.log(name, isFuture(new Date(end as Date)));
    if (end && isFuture(new Date(end as Date))) {
      return 1;
    } else {
      return 0;
    }
  } else {
    return 0;
  }
};

const HackathonSchedule = ({
  isLoading,
  timeline,
}: {
  isLoading: boolean;
  timeline: HackathonSchedule;
}) => {
  if (!timeline) return <></>;
  const timelineValues = Object.values(timeline).sort(
    (a, b) => a.index - b.index
  );
  console.log(timelineValues);
  const { activeStep, setActiveStep } = useSteps({
    index: timelineValues.findIndex(isEventActive),
    count: timelineValues.length,
  });

  console.log("acitve step - ", activeStep);

  return (
    <Skeleton w="full" isLoaded={!isLoading}>
      <Stepper
        index={activeStep}
        colorScheme="teal"
        orientation="vertical"
        gap="0"
        w="full"
      >
        {timelineValues.map((event) => (
          <Step key={event.index} style={{ width: "100%" }}>
            <StepIndicator
              borderColor={activeStep === event.index ? "#14665B" : "#1D1F1E"}
              bg={activeStep === event.index ? "#14665B" : "#1D1F1E"}
            >
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
              w="90%"
              ml={"1rem"}
              mb="32px"
              border="1px solid"
              borderColor={"neutral.3"}
              backgroundColor={"neutral.2"}
              padding="24px"
              h="fit-content"
              rounded={"12px"}
              flexShrink="0"
              align={"start"}
              spacing="12px"
            >
              <Box
                textTransform={"capitalize"}
                as="p"
                textStyle={"title2"}
                color="neutral.11"
              >
                {event.name}
              </Box>
              <HStack gap="12px">
                <HStack bg="neutral.4" rounded="12px" p="12px" spacing="8px">
                  <Box
                    as={BiCalendar}
                    color="white"
                    boxSize={{ base: "16px", md: "22px" }}
                  />
                  <Box as="p" textStyle={"title4"} color="neutral.11">
                    {formateDateInMonths(event.start)}
                  </Box>
                </HStack>
                {event.end && (
                  <HStack bg="neutral.4" rounded="12px" p="12px" spacing="8px">
                    <Box
                      as={BiCalendar}
                      color="white"
                      boxSize={{ base: "16px", md: "22px" }}
                    />
                    <Box as="p" textStyle={"title4"} color="neutral.11">
                      {formateDateInMonths(event.end)}
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
    </Skeleton>
  );
};

export default HackathonSchedule;
