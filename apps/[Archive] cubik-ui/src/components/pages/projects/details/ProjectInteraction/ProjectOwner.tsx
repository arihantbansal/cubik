import { Box, HStack, VStack } from "@chakra-ui/layout";
import { Team, UserModel } from "@prisma/client";
import { ProjectCreatorTeamType } from "~/types/IProjectDetails";
import { ProjectCreatorTeamMember } from "./ProjectCreatorTeamMember";
import { Skeleton, SkeletonText } from "@chakra-ui/skeleton";

export const ProjectCreatorSkeleton = ({
  isLoading,
}: {
  isLoading: boolean;
}) => {
  return (
    <HStack
      border="1px solid"
      borderColor={"#ffffff05"}
      rounded="16px"
      backgroundColor={"surface.green.0"}
      w="full"
      p={{ base: "12px 16px", md: "16px" }}
      overflow={"hidden"}
      position={"relative"}
      gap="4rem"
      align={"center"}
    >
      <HStack gap="0.6rem" w="full">
        <Skeleton
          isLoaded={!isLoading}
          fadeDuration={3}
          width={{ base: "1rem", md: "10" }}
          height={{ base: "1rem", md: "8" }}
          opacity="0.4"
        />
        <SkeletonText
          isLoaded={!isLoading}
          fadeDuration={2.6}
          spacing="3"
          w={"full"}
          noOfLines={2}
          height="28px"
          opacity={"0.4"}
        />
      </HStack>
      <SkeletonText
        isLoaded={!isLoading}
        fadeDuration={7}
        spacing="3"
        w={"2.8rem"}
        noOfLines={1}
        height="28px"
        opacity={"0.4"}
      />
    </HStack>
  );
};

export const ProjectOwner = ({
  team,
  isLoading,
}: {
  team:
    | (Team & {
        user: UserModel;
      })[]
    | undefined;
  isLoading: boolean;
}) => {
  return (
    <VStack gap="16px" align={"start"} w="full">
      <Box as="p" textStyle={{ base: "title4", md: "title3" }} color="white">
        Creators
      </Box>
      {isLoading ? (
        <ProjectCreatorSkeleton isLoading={isLoading} />
      ) : (
        team?.map((teamMember: ProjectCreatorTeamType, key) => (
          <ProjectCreatorTeamMember teamMember={teamMember} key={key} />
        ))
      )}
    </VStack>
  );
};
