import { Box, Card, CardBody, HStack, Skeleton, Stack } from '@chakra-ui/react';
import {
  ProjectJoinRound,
  ProjectJoinRoundStatus,
  Round,
} from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import RoundStatus from '~/components/common/dates/Status';
import { FundingRoundStatus } from './AdminProjectRoundCard';

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
                <FundingRoundStatus
                  status={round?.status as string}
                  startTime={round?.fundingRound.startTime}
                  endTime={round?.fundingRound.endTime}
                />
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
