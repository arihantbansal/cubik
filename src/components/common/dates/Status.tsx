import { Box, Center, HStack, chakra, keyframes } from '@chakra-ui/react';
import { differenceInDays, isFuture, isPast } from 'date-fns';
import { AiTwotoneCalendar } from 'react-icons/ai';
import { BiInfoCircle } from 'react-icons/bi';

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

const RoundStatus = ({
  startDate,
  endDate,
}: {
  startDate: Date | undefined | null;
  endDate: Date | undefined | null;
}) => {
  if (!startDate || !endDate) return null;
  const now = new Date();

  const daysToStart = differenceInDays(startDate, now);
  const daysToEnd = differenceInDays(endDate, now);
  const daysSinceEnd = differenceInDays(now, endDate);

  if (isFuture(startDate)) {
    return (
      <HStack
        rounded="full"
        backgroundColor="#1D1F1E"
        p="0px 12px"
        spacing="8px"
        mx={1}
      >
        <Box
          as={AiTwotoneCalendar}
          color="white"
          boxSize={['12px', '14px', '18px']}
        />
        <Box
          p="8px 12px"
          ps="0px"
          as="p"
          whiteSpace="pre"
          color="neutral.11"
          textStyle={{ base: 'body6', md: 'body5' }}
        >
          {daysToStart === 0
            ? `Round starts in a day`
            : `Round starts in ${daysToStart} days`}
        </Box>
      </HStack>
    );
  } else if (isFuture(endDate)) {
    return (
      <HStack
        rounded={'full'}
        backgroundColor="#071A0F"
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
          display={{ base: 'none', md: 'block' }}
        >
          Live - ends in {daysToEnd} days
        </Box>
      </HStack>
    );
  } else if (isPast(endDate)) {
    return (
      <HStack
        rounded="full"
        backgroundColor="#1D1F1E"
        p="8px 12px"
        spacing="8px"
        mx={1}
      >
        <BiInfoCircle color="white" size={18} />
        <Box
          as="p"
          whiteSpace="pre"
          color="neutral.11"
          textStyle={{ base: 'body6', md: 'body5' }}
          display={{ base: 'none', md: 'block' }}
        >
          Round ended {daysSinceEnd} days ago
        </Box>
      </HStack>
    );
  }

  return <></>;
};

export default RoundStatus;
