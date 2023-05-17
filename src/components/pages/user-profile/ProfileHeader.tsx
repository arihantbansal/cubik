import {
  Avatar as ChakraAvatar,
  Box,
  Center,
  HStack,
  Skeleton,
  SkeletonCircle,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import { FC, memo } from 'react';
import { GoVerified } from 'react-icons/go';
import { WalletAddress } from '~/components/common/wallet/WalletAdd';
import { UserWithProjectType } from '~/types/user';

type profileHeaderType = {
  user: UserWithProjectType | null | undefined;
  isLoading: boolean;
};

const ProfileHeader: FC<profileHeaderType> = ({
  user,
  isLoading,
}: profileHeaderType) => {
  const iconSize = useBreakpointValue({ base: '15px', md: '16px', lg: '17px' });

  return (
    <HStack
      w="full"
      align={'center'}
      justify="start"
      gap={{ base: '6px', sm: '12px', md: '16px' }}
    >
      <Center
        width={{ base: '56px', sm: '72px', md: '84px' }}
        height={{ base: '56px', sm: '72px', md: '84px' }}
      >
        <SkeletonCircle
          fadeDuration={3}
          isLoaded={!isLoading}
          size={{ base: '56px', sm: '72px', md: '84px' }}
        >
          <ChakraAvatar
            ignoreFallback={true}
            loading="lazy"
            showBorder={true}
            border="3px solid #FFFFFF20"
            src={user?.profilePicture}
            name={user?.username}
            width={{ base: '56px', sm: '72px', md: '84px' }}
            height={{ base: '56px', sm: '72px', md: '84px' }}
          />
        </SkeletonCircle>
      </Center>
      <VStack
        m="0"
        marginInline={'0'}
        p={{ base: '0px', sm: '6px', md: '8px' }}
        gap={{ base: '2px', sm: '6px', md: '8px' }}
        justifyContent={'center'}
        alignItems={'start'}
      >
        <Skeleton
          fadeDuration={4}
          opacity={isLoading ? '0.6' : '1'}
          isLoaded={!isLoading}
        >
          <HStack spacing="10px">
            <Box
              as="p"
              textStyle={{ base: 'title4', sm: 'title2', md: 'title1' }}
              fontWeight="700"
              color={'neutral.11'}
            >
              @{user?.username}
            </Box>
            <Box as={GoVerified} color="#FFD83D" w={iconSize} h={iconSize} />
          </HStack>
        </Skeleton>
        <Center>
          <Skeleton
            fadeDuration={5}
            opacity={isLoading ? '0.4' : '1'}
            isLoaded={!isLoading}
          >
            <WalletAddress walletAddress={user?.mainWallet || ''} size="sm" />
          </Skeleton>
        </Center>
      </VStack>
    </HStack>
  );
};

export default memo(ProfileHeader);
