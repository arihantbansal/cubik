import { Avatar, Box, Center, HStack, VStack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { WalletAddress } from '~/components/common/wallet/WalletAdd';

const ProfileDetails = () => {
  const { data: session } = useSession();
  return (
    <HStack p="8px" rounded="8px" gap="12px">
      <Avatar
        width="40px"
        height="40px"
        borderRadius={6}
        name={session?.user.username}
        src={session?.user.profilePicture}
      />
      <VStack alignItems={'start'} justify="center" w="full" spacing="6px">
        <Box as="p" textStyle={'title5'} color={'neutral.11'}>
          @{session?.user.username}
        </Box>
        <Center>
          <WalletAddress
            // @ts-ignore
            walletAddress={session.user.mainWallet}
            size="xs"
            copy={true}
          />
        </Center>
      </VStack>
    </HStack>
  );
};

export default ProfileDetails;
