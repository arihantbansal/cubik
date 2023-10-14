import { VStack, Skeleton } from "@chakra-ui/react";
import React from "react";

const ProjectsLoadingState = (isLoading: { isLoading: boolean }) => {
  return (
    <VStack w="full" gap="16px">
      <Skeleton
        w="full"
        h="6rem"
        rounded="12px"
        opacity={"0.5"}
        isLoaded={!isLoading}
      />
      <Skeleton
        w="full"
        h="6rem"
        rounded="12px"
        opacity={"0.3"}
        isLoaded={!isLoading}
      />
      <Skeleton
        w="full"
        h="6rem"
        rounded="12px"
        opacity={"0.1"}
        isLoaded={!isLoading}
      />
    </VStack>
  );
};

export default ProjectsLoadingState;
