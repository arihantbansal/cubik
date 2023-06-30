import { Avatar, Box, Button, Center, Stack, VStack } from '@chakra-ui/react';
import { SkeletonCircle, Skeleton, SkeletonText } from '@chakra-ui/skeleton';
import { useUserStore } from '~/store/userStore';
import { trpc } from '~/utils/trpc';
const HackathonHeader = ({
  isLoading,
  logo,
  name,
  short_description,
  hackathonId,
}: {
  isLoading: boolean;
  logo?: string;
  name?: string;
  short_description?: string;
  hackathonId: string;
}) => {
  const utils = trpc.useContext();
  const registrationMutation = trpc.hackathon.registration.useMutation({
    onSuccess: () => {
      utils.hackathon.haveRegistered.invalidate({
        hackathonId,
      });
      utils.hackathon.participants.invalidate({
        hackathonId,
      });
    },
  });
  const { user } = useUserStore();
  const hasRegistered = trpc.hackathon.haveRegistered.useQuery(
    {
      hackathonId,
    },
    {
      enabled: !!user?.id,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );
  return (
    <VStack w="full" gap="24px" align={'start'}>
      <SkeletonCircle
        isLoaded={!isLoading}
        fadeDuration={1}
        borderRadius={'12px'}
        opacity={isLoading ? '0.6' : '1'}
        width={{ base: '5.5rem', md: '7rem' }}
        height={{ base: '5.5rem', md: '7rem' }}
      >
        <Avatar
          borderRadius="12px"
          backgroundColor={'#1C1C1C'}
          src={logo}
          width={{ base: '5.5rem', md: '7rem' }}
          height={{ base: '5.5rem', md: '7rem' }}
        />
      </SkeletonCircle>
      <Stack
        gap={{ base: '16px', md: '24px', lg: '12vw' }}
        w="full"
        alignItems="end"
        direction={{ base: 'column', lg: 'row' }}
      >
        <VStack flex={3} alignItems="start" w="full" spacing="16px">
          <Skeleton
            isLoaded={!isLoading}
            fadeDuration={1}
            borderRadius={'12px'}
            opacity={isLoading ? '0.6' : '1'}
          >
            <Box
              as="p"
              textStyle={{ base: 'title1', md: 'headline3' }}
              textTransform="capitalize"
              color="neutral.11"
              noOfLines={1}
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
            >
              {name}
            </Box>
          </Skeleton>
          <SkeletonText
            isLoaded={!isLoading}
            w="full"
            fadeDuration={2}
            noOfLines={2}
            opacity={isLoading ? '0.5' : '1'}
            skeletonHeight="12px"
            spacing="4"
          >
            <Box
              as="p"
              textStyle={{ base: 'body4', md: 'body2' }}
              color="neutral.9"
              noOfLines={2}
              textOverflow="ellipsis"
            >
              {short_description}
            </Box>
          </SkeletonText>
        </VStack>
        <Center w="full" alignItems="end" flex={1.5}>
          <Skeleton
            isLoaded={!isLoading}
            fadeDuration={1}
            borderRadius={'12px'}
            opacity={isLoading ? '0.5' : '1'}
            w="full"
          >
            <Button
              variant="cubikFilled"
              size={{ base: 'cubikSmall', md: 'cubikMedium' }}
              w="full"
              isLoading={registrationMutation.isLoading}
              isDisabled={hasRegistered.data ?? true}
              onClick={() => {
                registrationMutation.mutate({
                  hackathonId: hackathonId,
                });
              }}
            >
              {hasRegistered.data ? 'Registered' : 'Register'}
            </Button>
          </Skeleton>
        </Center>
      </Stack>
    </VStack>
  );
};

export default HackathonHeader;
