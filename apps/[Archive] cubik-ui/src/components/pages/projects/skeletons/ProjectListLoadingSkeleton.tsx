import {
  Card,
  HStack,
  Skeleton,
  SkeletonText,
  VStack,
  Wrap,
} from "@chakra-ui/react";

const ProjectCardSkeleton = () => {
  return (
    <Card
      w="100%"
      p="24px"
      h="22rem"
      cursor="pointer"
      maxW={{
        base: "92vw",
        sm: "87vw",
        md: "44vw",
        lg: "29.5vw",
        xl: "25.5rem",
      }}
      background={"#0C0D0D"}
      border="none"
    >
      <Skeleton
        w={{ base: "full", md: "full" }}
        h={{ base: "2.5rem", md: "3.3rem" }}
      />
      <VStack gap="18px" w="full" alignItems={"start"} justifyContent="start">
        <HStack justifyContent={"space-between"}>
          <Skeleton
            w={{ base: "3rem", md: "4rem" }}
            h={{ base: "3rem", md: "4rem" }}
          />
        </HStack>
        <VStack gap="0.8rem" spacing="0" w="full">
          <HStack align={"end"} w="full" justify="space-between">
            <Skeleton w="10rem" h="1.3rem" opacity={"0.6"} />
            <Skeleton w="4rem" h="2rem" opacity={"0.6"} />
          </HStack>
          <HStack w="full" justify="space-between">
            <Skeleton w="4rem" h="0.5rem" opacity={"0.6"} />
            <Skeleton w="4rem" h="0.5rem" opacity={"0.6"} />
          </HStack>{" "}
        </VStack>{" "}
        <VStack gap="8px" w="full" align={"start"}>
          <SkeletonText
            w={"full"}
            noOfLines={2}
            height="28px"
            opacity={"0.6"}
          />
          <Skeleton w="10rem" h="1.5rem" opacity={"0.4"} />
        </VStack>
      </VStack>
    </Card>
  );
};

const ProjectListLoadingSkeleton = () => {
  return (
    <Wrap
      spacing="1.5rem"
      w="100%"
      margin="0"
      p="0"
      justify={"center"}
      align="center"
      direction={{ base: "column", sm: "row", md: "row" }}
    >
      <ProjectCardSkeleton />
      <ProjectCardSkeleton />
      <ProjectCardSkeleton />
      <ProjectCardSkeleton />
      <ProjectCardSkeleton />
      <ProjectCardSkeleton />
    </Wrap>
  );
};

export default ProjectListLoadingSkeleton;
