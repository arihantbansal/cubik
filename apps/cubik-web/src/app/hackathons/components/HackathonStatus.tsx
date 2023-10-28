'use client';

import { Box, Center, chakra, HStack, keyframes } from '@chakra-ui/react';
import { isFuture, isPast } from 'date-fns';

//import { AiTwotoneCalendar } from "react-icons/ai";

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
  resultDate: Date;
  registrationEndDate: Date;
  registrationStartDate: Date;
  hackathonEndDate: Date;
  hackathonStartDate: Date;
  votingStartDate: Date;
  votingEndDate: Date;
};

export const HackathonStatus = ({
  show,
  hackathonEndDate,
  hackathonStartDate,
  registrationEndDate,
  registrationStartDate,
  resultDate,
  votingEndDate,
  votingStartDate,
}: HackathonStatusProps) => {
  // check registration start date

  if (registrationStartDate && isFuture(registrationStartDate)) {
    return (
      <HStack
        rounded="full"
        backgroundColor="#1D1F1E"
        p="0px 12px"
        spacing="8px"
        minH={'22px'}
        mx={1}
      >
        {/* @todo <Box
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
  } else if (registrationEndDate && isFuture(registrationEndDate)) {
    return (
      <HStack
        rounded="full"
        backgroundColor="#1D1F1E"
        p="0px 12px"
        spacing="8px"
        minH={'22px'}
        mx={1}
      >
        {/* @todo <Box
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
  } else if (isPast(hackathonStartDate) && isFuture(hackathonEndDate)) {
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
  } else if (isPast(votingStartDate) && isFuture(votingEndDate)) {
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

  if (isFuture(resultDate)) {
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
        Results Announced
      </Box>
    </HStack>;
  }

  return <></>;
};
