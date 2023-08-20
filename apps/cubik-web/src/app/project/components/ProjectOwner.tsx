import { WalletAddress } from "@/app/components/common/wallet";
import { Avatar, Box, HStack, VStack } from "@/utils/chakra";
import { User } from "@cubik/database";
import Link from "next/link";
import React from "react";

export const ProjectCreatorTeam = ({
  team,
}: {
  team: {
    user: User;
  };
}) => {
  return (
    <>
      <Link style={{ width: "100%" }} href={`/${team.user.username}`}>
        <HStack cursor="pointer" w="full" justify="space-between" px="16px">
          <HStack gap="0.6rem">
            <Avatar
              //borderRadius={"8px"}
              width={{ base: "34px", md: "38px" }}
              height={{ base: "34px", md: "38px" }}
              src={team.user.profilePicture as string}
            />
            <Box
              color={"white"}
              as="p"
              textStyle={{ base: "title5", md: "title4" }}
            >
              @{team.user.username}
            </Box>
          </HStack>
          <Box
            color="#B4B0B2"
            as="p"
            textStyle={{ base: "body5", md: "body4" }}
          >
            <WalletAddress walletAddress={team.user.mainWallet} size="xs" />
          </Box>
        </HStack>
      </Link>
    </>
  );
};

interface Props {
  team: {
    user: User;
  }[];
}
export const ProjectOwner = ({ team }: Props) => {
  return (
    <VStack gap="16px" align={"start"} w="full">
      <Box as="p" textStyle={{ base: "title4", md: "title3" }} color="white">
        Project Creators
      </Box>
      {team?.map((teamMember, key) => (
        <ProjectCreatorTeam team={teamMember} key={key} />
      ))}
    </VStack>
  );
};
