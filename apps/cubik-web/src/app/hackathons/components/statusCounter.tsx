'use client';

//import { AiTwotoneCalendar } from "react-icons/ai";
import type { HackathonSchedule } from '@/types/hackathon';
import { Box, Center, chakra, HStack, keyframes } from '@/utils/chakra';
import { isFuture, isPast } from 'date-fns';

const random = () => Math.floor(Math.random() * 10);

const ripple = keyframes`
  0% {
    box-shadow: 0 0 0em 0 rgba(49, 245, 121,0.4),
                0 0 0em 0em rgba(49, 245, 121,0.3),
                0 0 0em 0em rgba(49, 245, 121,0.1),
                0 0 0em 0em rgba(49, 245, 121, 0.05);
  }
  100% {
    box-shadow: 0 0 1em 2em rgba(7, 26, 15, 0),
                0 0 2em 4em rgba(7, 26, 15, 0),
                0 0 3em 8em rgba(7, 26, 15, 0),
                0 0 4em 10em rgba(7, 26, 15, 0);
  }
`;

const CircleRipple = chakra(Box, {
  baseStyle: {
    backgroundColor: '#31F579',
    width: { base: '0.8em', md: '1em' },
    height: { base: '0.8em', md: '1em' },
    rounded: 'full',
    animation: `${ripple} 1.${random()}s linear infinite`,
  },
});

type HackathonStatusProps = {
  show?: boolean;
  timeline: HackathonSchedule;
};

const HackathonStatus = ({ show, timeline }: HackathonStatusProps) => {
  console.log(timeline);
  // check registration start date
  if (!timeline) return <></>;

  const registration = timeline.find(
    (element) => element.name === 'Registration',
  );
  const hackathon = timeline.find((element) => element.name === 'Game Jam');
  const voting = timeline.find((element) => element.name === 'Voting');

  if (registration && isFuture(new Date(hackathon?.start ?? 0))) {
    return (
      <HStack
        rounded="full"
        backgroundColor="#1D1F1E"
        p="0px 12px"
        spacing="8px"
        minH={'22px'}
        mx={1}
      >
        {/* @todo */}
        {/* <Box
          as={AiTwotoneCalendar}
          color="white"
          boxSize={["12px", "14px", "18px"]}
        /> */}
        <Box
          p="8px 12px"
          ps="0px"
          as="p"
          whiteSpace="pre"
          color="neutral.11"
          textStyle={{ base: 'body6', md: 'body5' }}
        >
          Coming Soon
        </Box>
      </HStack>
    );
    // @todo check the condition
  } else if (!registration && isFuture(new Date(hackathon?.start ?? 0))) {
    return (
      <HStack
        rounded="full"
        backgroundColor="#1D1F1E"
        p="0px 12px"
        spacing="8px"
        minH={'22px'}
        mx={1}
      >
        {/* @todo */}
        {/* <Box
          as={AiTwotoneCalendar}
          color="white"
          boxSize={["12px", "14px", "18px"]}
        /> */}
        <Box
          p="8px 12px"
          ps="0px"
          as="p"
          whiteSpace="pre"
          color="neutral.11"
          textStyle={{ base: 'body6', md: 'body5' }}
        >
          Registration Open
        </Box>
      </HStack>
    );
  } else if (
    hackathon &&
    isPast(new Date(hackathon?.start ?? 0)) &&
    isFuture(new Date(hackathon.end ?? 0))
  ) {
    return (
      <HStack
        rounded={'full'}
        backgroundColor="#071A0F50"
        //blur
        backdropFilter={'blur(px)'}
        mx={1}
        spacing="0"
        overflow={'hidden'}
        w={'fit-content'}
      >
        <Center rounded="full" p={{ base: '6px', md: '8px' }}>
          <CircleRipple />
        </Center>
        <Box
          p="8px"
          ps="0px"
          pe="12px"
          as="p"
          whiteSpace="pre"
          color="#31F579"
          textStyle={{ base: 'body6', md: 'overline3' }}
          display={{ base: show ? 'block' : 'none', md: 'block' }}
        >
          Live
        </Box>
      </HStack>
    );
  } else if (
    voting &&
    isPast(new Date(voting?.start ?? 0)) &&
    isFuture(new Date(voting?.end ?? 0))
  ) {
    return (
      <HStack
        rounded={'full'}
        backgroundColor="#071A0F50"
        //blur
        backdropFilter={'blur(px)'}
        mx={1}
        spacing="0"
        overflow={'hidden'}
        w={'fit-content'}
      >
        <Center rounded="full" p={{ base: '6px', md: '8px' }}>
          <CircleRipple />
        </Center>
        <Box
          p="8px"
          ps="0px"
          pe="12px"
          as="p"
          whiteSpace="pre"
          color="neutral.11"
          textStyle={{ base: 'body6', md: 'overline3' }}
          display={{ base: show ? 'block' : 'none', md: 'block' }}
        >
          Voting Live
        </Box>
      </HStack>
    );
  }

  //   if (isFuture(startDate)) {
  //     return (
  //       <HStack
  //         rounded="full"
  //         backgroundColor="#1D1F1E"
  //         p="0px 12px"
  //         spacing="8px"
  //         minH={'22px'}
  //         mx={1}
  //       >
  //         <Box as={AiTwotoneCalendar} color="white" boxSize={['12px', '14px', '18px']} />
  //         <Box
  //           p="8px 12px"
  //           ps="0px"
  //           as="p"
  //           whiteSpace="pre"
  //           color="neutral.11"
  //           textStyle={{ base: 'body6', md: 'body5' }}
  //         >
  //           {daysToStart === 0 ? `Round starts in a day` : `Round starts in ${daysToStart} days`}
  //         </Box>
  //       </HStack>
  //     );
  //   } else if (isFuture(endDate)) {
  //     return (
  //       <HStack
  //         rounded={'full'}
  //         backgroundColor="#071A0F"
  //         mx={1}
  //         spacing="0"
  //         overflow={'hidden'}
  //         w={'fit-content'}
  //       >
  //         <Center rounded="full" p={{ base: '6px', md: '8px' }}>
  //           <CircleRipple />
  //         </Center>
  //         <Box
  //           p="8px"
  //           ps="0px"
  //           pe="12px"
  //           as="p"
  //           whiteSpace="pre"
  //           color="neutral.11"
  //           textStyle={{ base: 'body6', md: 'overline3' }}
  //           display={{ base: show ? 'block' : 'none', md: 'block' }}
  //         >
  //           {daysToEnd > 1 ? `Live - ends in ${daysToEnd} days` : 'Live - ending in a day'}
  //         </Box>
  //       </HStack>
  //     );
  //   } else if (isPast(endDate)) {
  //     return (
  //       <HStack
  //         rounded="full"
  //         backgroundColor="#1D1F1E"
  //         p={{ base: '7px', md: '8px 12px' }}
  //         spacing="8px"
  //         mx={1}
  //       >
  //         <Box as={BiInfoCircle} color="white" boxSize={['12px', '14px', '18px']} />
  //         <Box
  //           as="p"
  //           whiteSpace="pre"
  //           color="neutral.11"
  //           textStyle={{ base: 'body6', md: 'body5' }}
  //           display={{ base: show ? 'block' : 'none', md: 'block' }}
  //         >
  //           {daysSinceEnd > 1 ? `Round ended ${daysSinceEnd} days ago` : 'Round ended'}
  //         </Box>
  //       </HStack>
  //     );
  //   }
  return <></>;
};

export default HackathonStatus;
