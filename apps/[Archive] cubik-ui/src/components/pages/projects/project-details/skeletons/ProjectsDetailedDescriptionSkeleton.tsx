import { Skeleton, SkeletonText, VStack } from "@chakra-ui/react";

const ProjectsDetailedDescriptionSkeleton = () => {
  return (
    <VStack w="full" align="start" gap="18px">
      <Skeleton opacity={"0.4"} width="16rem" height="0.5rem" />
      <SkeletonText
        w={"full"}
        noOfLines={3}
        height="auto"
        opacity={"0.4"}
        spacing="4"
      />
      <SkeletonText
        w={"full"}
        noOfLines={5}
        height="auto"
        opacity={"0.2"}
        spacing="4"
      />
    </VStack>
  );
};

export default ProjectsDetailedDescriptionSkeleton;
