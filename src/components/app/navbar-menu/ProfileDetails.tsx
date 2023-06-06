import { Avatar, Box, Center, HStack, VStack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import Username from '~/components/common/username/Username';
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
        <Username
          isLoading={false}
          username={session?.user.username}
          proofs={session?.user.proof}
          size="sm"
        />
        <Center>
          <WalletAddress
            // @ts-ignore
            walletAddress={session.user.mainWallet}
            size="xs"
          />
        </Center>
      </VStack>
    </HStack>
  );
};

export default ProfileDetails;
