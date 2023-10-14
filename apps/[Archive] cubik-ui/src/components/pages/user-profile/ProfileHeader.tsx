import { Avatar } from "@chakra-ui/avatar";
import { Center, HStack, VStack } from "@chakra-ui/layout";
import { Skeleton, SkeletonCircle } from "@chakra-ui/skeleton";
import { FC, memo } from "react";
import Username from "~/components/common/username/Username";
import { WalletAddress } from "~/components/common/wallet/WalletAdd";
import { UserProof, UserWithProjectType } from "~/types/user";

type profileHeaderType = {
  isLoading: boolean;
  profilePicture: string | undefined;
  username: string | undefined;
  mainWallet: string | undefined;
};

const ProfileHeader: FC<profileHeaderType> = ({
  isLoading,
  mainWallet,
  profilePicture,
  username,
}: profileHeaderType) => {
  return (
    <HStack
      w="full"
      align={"center"}
      justify="start"
      gap={{ base: "12px", sm: "14px", md: "16px" }}
    >
      <Center
        width={{ base: "56px", sm: "72px", md: "84px" }}
        height={{ base: "56px", sm: "72px", md: "84px" }}
      >
        <SkeletonCircle
          fadeDuration={2}
          isLoaded={!isLoading}
          borderRadius="12px"
          size={{ base: "56px", sm: "72px", md: "84px" }}
        >
          <Avatar
            ignoreFallback={true}
            loading="lazy"
            showBorder={true}
            backgroundColor="#FFFFFF30"
            border="2px solid #FFFFFF10"
            name={username}
            src={profilePicture}
            rounded="16%"
            borderRadius="16%"
            width={{ base: "56px", sm: "72px", md: "84px" }}
            height={{ base: "56px", sm: "72px", md: "84px" }}
          />
        </SkeletonCircle>
      </Center>
      <VStack
        m="0"
        marginInlineStart={"0 !important"}
        p={{ base: "0px", sm: "6px", md: "8px" }}
        gap={{ base: "12px", md: "16px" }}
        justifyContent={"center"}
        align={"start"}
      >
        <HStack gap="8px">
          <Username
            username={username}
            isLoading={isLoading}
            // proofs={(user?.proof as unknown as UserProof[]) ?? []}
            size="lg"
          />
        </HStack>
        <Center marginInline={"0 !important"} margin="0 !important">
          <Skeleton
            w="6rem"
            h="18px"
            fadeDuration={3}
            opacity={isLoading ? "0.5" : "1"}
            isLoaded={!isLoading}
          >
            <WalletAddress
              walletAddress={mainWallet as string}
              size="sm"
              copy={true}
            />
          </Skeleton>
        </Center>
      </VStack>
    </HStack>
  );
};

export default ProfileHeader;
