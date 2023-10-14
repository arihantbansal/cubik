import { Box, VStack } from "@chakra-ui/layout";
import { ProjectSocials } from "./ProjectSocials";
import { ProjectFundingData } from "./ProjectFundingData";
import { ProjectOwner } from "./ProjectOwner";
import { SimilarProject } from "./SimilarProject";
import { ProjectsModel, Team, UserModel } from "@prisma/client";
import { Alert, AlertDescription, AlertIcon } from "@chakra-ui/alert";
import { CloseButton } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  isLoading: boolean;
  preview?: boolean;
  funding: number;
  contributors: number;
  communityContributions: number;
  project: ProjectsModel;
  tracks: {
    label: string;
    value: string;
  }[];
  team: (Team & {
    user: UserModel;
  })[];
}
export const ProjectCreatorAndLinks = ({
  isLoading,
  preview = true,
  communityContributions,
  contributors,
  funding,
  project,
  team,
  tracks,
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <VStack
      gap={{ base: "24px", md: "64px" }}
      w="full"
      justify={"space-between"}
      direction={"column"}
      justifyContent={"start"}
      display={{ base: "none", lg: "flex" }}
    >
      {/* <VStack>
        <Box mb={2} fontWeight={600} color={'white'} fontSize={'md'}>
          When voting, consider the following guidelines
        </Box>
        <VStack gap={2} fontSize={'sm'} align={'start'}>
          <Box>1. Is the game playable and fun?</Box>
          <Box>2. Does it follow the theme?</Box>
          <Box>3. how deeply is it integrated with Solana? is it fully on-chain?</Box>
          <Box>4. Is the idea original?</Box>
          <Box>5. General feel (art, sound, lore etc)</Box>
        </VStack>
      </VStack> */}

      {isOpen && (
        <Box
          zIndex={10000}
          position="fixed"
          bottom="30px"
          right="30px"
          width="25rem"
        >
          <Alert bg={"teal.700"} variant="solid" px={5} py={10}>
            <AlertDescription>
              <VStack>
                <Box mb={2} fontWeight={600} color={"white"} fontSize={"md"}>
                  When voting, consider the following guidelines
                </Box>
                <VStack gap={2} fontSize={"sm"} align={"start"}>
                  <Box>1. Is the game playable and fun?</Box>
                  <Box>2. Does it follow the theme?</Box>
                  <Box>
                    3. how deeply is it integrated with Solana? is it fully
                    on-chain?
                  </Box>
                  <Box>4. Is the idea original?</Box>
                  <Box>5. General feel (art, sound, lore etc)</Box>
                </VStack>
              </VStack>
            </AlertDescription>
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={() => setIsOpen(false)}
            />
          </Alert>
        </Box>
      )}
      <ProjectSocials
        tracks={tracks}
        isLoading={isLoading}
        projectDetails={project}
      />

      {!preview && (
        <ProjectFundingData
          isLoading={isLoading}
          contributors={contributors}
          communityContributions={communityContributions}
          funding={funding}
        />
      )}
      <ProjectOwner isLoading={isLoading} team={team} />
      <SimilarProject />
    </VStack>
  );
};
