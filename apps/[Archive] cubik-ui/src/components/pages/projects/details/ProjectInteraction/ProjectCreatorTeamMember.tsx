import { Avatar } from "@chakra-ui/avatar";
import { Box, HStack } from "@chakra-ui/layout";
import { Team, UserModel } from "@prisma/client";
import Link from "next/link";
import { WalletAddress } from "~/components/common/wallet/WalletAdd";

export const ProjectCreatorTeamMember = ({
  teamMember,
}: {
  teamMember: Team & {
    user: UserModel;
  };
}) => {
  return (
    <HStack
      as={Link}
      cursor="pointer"
      href={`/${teamMember.user.username}`}
      w="full"
      justify="space-between"
      px="16px"
    >
      <HStack gap="0.6rem">
        <Avatar
          borderRadius={"8px"}
          width={{ base: "32px", md: "38px" }}
          height={{ base: "32px", md: "38px" }}
          src={teamMember.user.profilePicture}
        />
        <Box color={"white"} as="p" textStyle={{ base: "body4", md: "body3" }}>
          @{teamMember.user.username}
        </Box>
      </HStack>
      <Box color="#B4B0B2" as="p" textStyle={{ base: "body5", md: "body4" }}>
        <WalletAddress walletAddress={teamMember.user.mainWallet} size="xs" />
      </Box>
    </HStack>
  );
};
