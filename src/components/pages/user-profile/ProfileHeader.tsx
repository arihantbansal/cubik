import {
  Avatar as ChakraAvatar,
  Box,
  Center,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { WalletAddress } from '~/components/common/wallet/WalletAdd';
import Avatar from 'boring-avatars';
import { UserWithProjectType } from '~/types/user';

type profileHeaderType = {
  user: UserWithProjectType;
};

const ProfileHeader = ({ user }: profileHeaderType) => {
  return (
    <HStack w="full" align={'center'} justify="start" gap={'16px'}>
      <Center>
        {user.profilePicture ? (
          <ChakraAvatar
            border="3px solid #FFFFFF20"
            src={user.profilePicture}
            name={user.username}
            width="80px"
            height="80px"
          />
        ) : (
          <Avatar
            size={84}
            name={user.mainWallet as string}
            variant="marble"
            colors={[
              '#05299E',
              '#5E4AE3',
              '#947BD3',
              '#F0A7A0',
              '#F26CA7',
              '#FFFFFF',
              '#CAF0F8',
              '#CCA43B',
            ]}
          />
        )}
      </Center>
      <VStack p="8px" gap="8px" justifyContent={'center'} alignItems={'start'}>
        <Box as="p" textStyle={'title1'} color={'neutral.11'}>
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

export default ProfileHeader;
