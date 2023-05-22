import { Box, Center, HStack, chakra, keyframes } from '@chakra-ui/react';
import { differenceInDays, isFuture, isPast } from 'date-fns';
import { AiTwotoneCalendar } from 'react-icons/ai';
import { BiInfoCircle } from 'react-icons/bi';

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
    width: '1em',
    height: '1em',
    rounded: 'full',
    animation: `${ripple} 1.5s linear infinite`,
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
      <HStack rounded="full" backgroundColor="#1D1F1E" spacing="8px" mx={1}>
        <AiTwotoneCalendar color="white" size={18} />
        <Box
          p="8px 12px"
          as="p"
          whiteSpace="pre"
          color="neutral.11"
          textStyle={{ base: 'body6', md: 'body5' }}
        >
          Round starts in {daysToStart} days
        </Box>
      </HStack>
    );
  } else if (isFuture(endDate)) {
    return (
      <HStack
        rounded="full"
        backgroundColor="#071A0F"
        mx={1}
        spacing="0"
        overflow={'hidden'}
      >
        <Center rounded="full" p="8px">
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
        >
          Ongoing - ends in {daysToEnd} days
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
        >
          Round ended {daysSinceEnd} days ago
        </Box>
      </HStack>
    );
  }

  return <></>;
};

export default RoundStatus;
