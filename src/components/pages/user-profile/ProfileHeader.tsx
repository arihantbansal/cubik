import {
  Avatar as ChakraAvatar,
  Box,
  Center,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { WalletAddress } from '~/components/common/wallet/WalletAdd';
import { User } from '~/types/user';

const ProfileHeader = ({ user }: { user: User }) => {
  return (
    <HStack w="full" align={'center'} justify="start" gap={'16px'}>
      <Center>
        <ChakraAvatar
          border="3px solid #FFFFFF20"
          src={user.icon}
          name={user.username}
          width="80px"
          height="80px"
        />
      </Center>
      <VStack p="8px" gap="8px" justifyContent={'center'} alignItems={'start'}>
        <Box as="p" textStyle={'title1'}>
          @ {user.username}
        </Box>
        <WalletAddress walletAddress={user.mainwallet} size="sm" copy={true} />
      </VStack>
    </HStack>
  );
};

export default ProfileHeader;
