import { Stack, VStack } from "@/utils/chakra";
import React from "react";
import { ProjectSocials } from "./ProjectSocials";
import { ProjectOwner } from "./ProjectOwner";
import { Team, User } from "@cubik/database";
import { SimilarProject } from "./SimilarProject";

interface Props {
  github_link: string;
  discord_link: string;
  telegram_link: string;
  twitter_handle: string;
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
        maxW="26rem"
        flex="1"
        gap="48px"
        h={"full"}
        flexDir="column"
        justifyContent="start"
        border={"1px solid red"}
      >
        <VStack
          gap={{ base: "24px", md: "64px" }}
          w="full"
          justify={"space-between"}
          direction={"column"}
          justifyContent={"start"}
          display={{ base: "none", lg: "flex" }}
        >
          <ProjectSocials {...props} />
          <ProjectOwner team={props.team} />
          {/* <SimilarProject /> */}
        </VStack>
      </Stack>
    </>
  );
};
