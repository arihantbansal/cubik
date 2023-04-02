import {
  Avatar as ChakraAvatar,
  Box,
  Center,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { FC, memo } from 'react';
import { WalletAddress } from '~/components/common/wallet/WalletAdd';
import { UserWithProjectType } from '~/types/user';

type profileHeaderType = {
  user: UserWithProjectType;
};

const ProfileHeader: FC<profileHeaderType> = ({ user }: profileHeaderType) => {
  return (
    <HStack
      w="full"
      align={'center'}
      justify="start"
      gap={{ base: '6px', sm: '12px', md: '16px' }}
    >
      <Center>
        <ChakraAvatar
          border="3px solid #FFFFFF20"
          src={user.profilePicture}
          name={user.username}
          width={{ base: '56px', sm: '72px', md: '84px' }}
          height={{ base: '56px', sm: '72px', md: '84px' }}
        />
      </Center>
      <VStack
        p={{ base: 'px', sm: '6px', md: '8px' }}
        gap={{ base: '2px', sm: '6px', md: '8px' }}
        justifyContent={'center'}
        alignItems={'start'}
      >
        <Box
          as="p"
          textStyle={{ base: 'title4', sm: 'title2', md: 'title1' }}
          fontWeight="700"
          color={'neutral.11'}
        >
          @{user.username}
        </Box>
        <Center>
          <WalletAddress
            walletAddress={user.mainWallet}
            size="sm"
            copy={true}
          />
        </Center>
      </VStack>
    </HStack>
  );
};

export default memo(ProfileHeader);
