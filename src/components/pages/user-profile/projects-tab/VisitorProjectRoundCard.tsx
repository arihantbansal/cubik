import { Box, Card, CardBody, HStack, Skeleton, Stack } from '@chakra-ui/react';
import {
  ProjectJoinRound,
  ProjectJoinRoundStatus,
  Round,
} from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiClock } from 'react-icons/fi';
import { HiBan } from 'react-icons/hi';
import { ImCheckboxChecked } from 'react-icons/im';
import RoundStatus from '~/components/common/dates/Status';

const FundingRoundStatus = ({ status }: { status: string }) => {
  if (status === ProjectJoinRoundStatus.PENDING) {
    return (
      <HStack
        w="fit-content"
        rounded="full"
        bg="#470E47"
        p={{ base: '4px 8px', md: '6px 10px' }}
        spacing={{ base: '6px', md: '8px' }}
      >
        <Box
          as={FiClock}
          color="#FFCCFF"
          boxSize={['10px', '12px', '13px', '14px']}
        />
        <Box
          as="p"
          noOfLines={1}
          whiteSpace={'nowrap'}
          textStyle={{ base: 'body6', md: 'body5' }}
          color="#FFCCFF"
        >
          Approval Pending
        </Box>
      </HStack>
    );
  } else if (status === ProjectJoinRoundStatus.APPROVED) {
    return (
      <HStack
        w="fit-content"
        rounded="full"
        bg="#6D28D9"
        p={{ base: '4px 8px', md: '6px 10px' }}
        spacing={{ base: '6px', md: '8px' }}
      >
        <Box
          as={ImCheckboxChecked}
          color="#E6D6FF"
          boxSize={['10px', '12px', '13px', '14px']}
        />
        <Box
          as="p"
          noOfLines={1}
          whiteSpace={'nowrap'}
          textStyle={{ base: 'body6', md: 'body5' }}
          color="#E6D6FF"
        >
          Selected
        </Box>
      </HStack>
    );
  } else if (status === ProjectJoinRoundStatus.REJECTED) {
    return (
      <HStack
        w="fit-content"
        rounded="full"
        bg="#EB7626"
        p={{ base: '4px 8px', md: '6px 10px' }}
        spacing={{ base: '6px', md: '8px' }}
      >
        <Box
          as={HiBan}
          color="#FFE3CC"
          boxSize={['10px', '12px', '13px', '14px']}
        />
        <Box
          as="p"
          noOfLines={1}
          whiteSpace={'nowrap'}
          textStyle={{ base: 'body6', md: 'body5' }}
          color="#FFE3CC"
        >
          Not Selected
        </Box>
      </HStack>
    );
  } else {
    return (
      <HStack>
        <Box>Approval Pending</Box>
      </HStack>
    );
  }
};

const VisitorProjectRoundCard = ({
  round,
  isLoading,
}: {
  round:
    | (ProjectJoinRound & {
        fundingRound: Round;
      })
    | null
    | undefined;
  isLoading: boolean;
}) => {
  const router = useRouter();
  const username = router.pathname.split('/')[1];

  return (
    <Skeleton
      isLoaded={!isLoading}
      fadeDuration={3}
      opacity={isLoading ? '0.5' : '1'}
      w="full"
    >
      <Card
        as={Link}
        href={{
          pathname: `/${username}/${round?.projectId}`,
          query: { round: round?.id },
        }}
        p="16px"
        backgroundColor={'neutral.2'}
        _hover={{
          backgroundColor: 'neutral.3',
        }}
        w="full"
        outline="none"
        border="none"
      >
        <CardBody borderRadius="12px" w="full">
          <HStack justify={'space-between'} w="full">
            <Stack
              direction={{ base: 'row', md: 'row' }}
              justify={'space-between'}
              w="full"
            >
              <HStack gap="8px">
                <FundingRoundStatus status={round?.status as string} />
                <Box
                  as="p"
                  textStyle={{ base: 'title6', sm: 'title5', md: 'title4' }}
                  color="neutral.11"
                >
                  {round?.fundingRound.roundName} Grant Round
                </Box>
              </HStack>
              <RoundStatus
                startDate={round?.fundingRound.startTime}
                endDate={round?.fundingRound.endTime}
              />
            </Stack>
          </HStack>
        </CardBody>
      </Card>
    </Skeleton>
  );
};

export default VisitorProjectRoundCard;
