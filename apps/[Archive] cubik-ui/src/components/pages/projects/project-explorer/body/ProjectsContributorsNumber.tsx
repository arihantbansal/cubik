import { Avatar, AvatarGroup } from "@chakra-ui/avatar";
import { Box, Flex } from "@chakra-ui/layout";
import { useEffect, useState } from "react";

export type ContributionType = {
  id: string;
  user: {
    profilePicture: string;
    username: string;
  };
};

const ProjectsContributorsNumber = ({
  contributors,
  contributorsCount,
}: {
  contributors: {
    user: {
      profilePicture: string;
    };
  }[];
  contributorsCount: number;
}) => {
  return (
    <>
      {contributors.length > 0 ? (
        <Flex
          justify="end"
          align={"center"}
          flex="1"
          w={"fit-content"}
          gap="4px"
          position="relative"
          zIndex="1"
        >
          <AvatarGroup size="xs" max={3}>
            {contributors.slice(-3).map((user, id) => (
              <Avatar
                key={id}
                outline="2px solid #0C0D0D"
                src={user.user.profilePicture}
              />
            ))}
          </AvatarGroup>
          {contributorsCount > 0 ? (
            <Box
              noOfLines={1}
              minW={7}
              as="p"
              color="white"
              textStyle={{ base: "body6", md: "body5" }}
            >
              + {contributorsCount}
            </Box>
          ) : (
            "- -"
          )}
        </Flex>
      ) : (
        <Box
          as="p"
          color="white"
          textStyle={{ base: "body6", md: "body5" }}
          fontWeight="600"
        >
          - -
        </Box>
      )}
    </>
  );
};

export default ProjectsContributorsNumber;
