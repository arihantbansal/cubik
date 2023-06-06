import {
  Avatar as ChakraAvatar,
  Center,
  HStack,
  Skeleton,
  SkeletonCircle,
  VStack,
} from '@chakra-ui/react';
import { FC, memo } from 'react';
import Username from '~/components/common/username/Username';
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
  return (
    <HStack
      w="full"
      align={'center'}
      justify="start"
      gap={{ base: '12px', sm: '14px', md: '16px' }}
    >
      <Center
        width={{ base: '56px', sm: '72px', md: '84px' }}
        height={{ base: '56px', sm: '72px', md: '84px' }}
      >
        <SkeletonCircle
          fadeDuration={3}
          isLoaded={!isLoading}
          borderRadius="12px"
          size={{ base: '56px', sm: '72px', md: '84px' }}
        >
          <ChakraAvatar
            ignoreFallback={true}
            loading="lazy"
            showBorder={true}
            backgroundColor="#FFFFFF30"
            border="2px solid #FFFFFF10"
            src={user?.profilePicture}
            name={user?.username}
            rounded="16%"
            borderRadius="16%"
            width={{ base: '56px', sm: '72px', md: '84px' }}
            height={{ base: '56px', sm: '72px', md: '84px' }}
          />
        </SkeletonCircle>
      </Center>
      <VStack
        m="0"
        marginInlineStart={'0 !important'}
        p={{ base: '0px', sm: '6px', md: '8px' }}
        gap={{ base: '12px', md: '16px' }}
        justifyContent={'center'}
        align={'start'}
      >
        <Username
          username={user?.username}
          isLoading={isLoading}
          proofs={[]}
          size="lg"
        />
        <Center marginInline={'0 !important'} margin="0 !important">
          <Skeleton
            fadeDuration={5}
            opacity={isLoading ? '0.5' : '1'}
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
