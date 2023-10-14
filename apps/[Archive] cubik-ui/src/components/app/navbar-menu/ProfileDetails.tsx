import { Avatar, Center, HStack, Skeleton, VStack } from "@chakra-ui/react";
import Username from "~/components/common/username/Username";
import { WalletAddress } from "~/components/common/wallet/WalletAdd";
import { useUserStore } from "~/store/userStore";
import { UserProof } from "~/types/user";

const ProfileDetails = () => {
  const { user } = useUserStore();
  return (
    <HStack p="8px" rounded="8px" gap="12px">
      <Skeleton
        fadeDuration={2}
        isLoaded={!!user?.profilePicture}
        width="40px"
        height="40px"
        borderRadius="8px"
      >
        <Avatar
          width="40px"
          height="40px"
          borderRadius={6}
          name={user?.username}
          src={user?.profilePicture}
        />
      </Skeleton>
      <VStack alignItems={"start"} justify="center" w="full" spacing="6px">
        <Username
          isLoading={!user?.username}
          username={user?.username}
          proofs={(user?.proof as unknown as UserProof[]) ?? []}
          size="sm"
        />
        <Center>
          <WalletAddress
            // @ts-ignore
            walletAddress={user?.mainWallet}
            size="xs"
          />
        </Center>
      </VStack>
    </HStack>
  );
};

export default ProfileDetails;
