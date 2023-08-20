import { Stack, VStack } from "@/utils/chakra";
import React from "react";
import { ProjectSocials } from "./ProjectSocials";
import { ProjectOwner } from "./ProjectOwner";
import { Team, User } from "@cubik/database";
import { SimilarProject } from "./SimilarProject";
import { ProjectFundingData } from "./ProjectFundingData";

interface Props {
  github_link: string;
  discord_link: string;
  telegram_link: string;
  twitter_handle: string;
  funding: number;
  contributors: number;
  team: {
    user: User;
  }[];
  tracks: {
    label: string;
    value: string;
  }[];
}
export const SideBar = (props: Props) => {
  return (
    <>
      <Stack
        w="full"
        maxW="24rem"
        flex="1"
        gap="48px"
        h={"full"}
        flexDir="column"
        justifyContent="start"
      >
        <VStack
          gap={{ base: "24px", md: "48px" }}
          w="full"
          justify={"space-between"}
          direction={"column"}
          justifyContent={"start"}
          display={{ base: "flex", lg: "flex" }}
        >
          <ProjectSocials {...props} />
          <ProjectOwner team={props.team} />
          <ProjectFundingData
            isHackathon={true}
            communityContributions={0}
            contributors={0}
            funding={0}
            rank={0}
          />
          {/* <SimilarProject /> */}
        </VStack>
      </Stack>
    </>
  );
};
