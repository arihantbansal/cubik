import { Box, HStack, Stack, VStack, Wrap } from "@chakra-ui/layout";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/skeleton";

export const ProjectSocialsSkeleton = ({
  isLoading,
}: {
  isLoading: boolean;
}) => {
  return (
    <Wrap w="full" spacing={{ base: "8px", md: "16px" }}>
      {[3, 4, 5, 6].map((item) => (
        <Skeleton
          key={item}
          opacity="0.3"
          fadeDuration={item}
          isLoaded={!isLoading}
          rounded="full"
          width={{ base: "2.8rem", md: "3.4rem" }}
          height={{ base: "2.8rem", md: "3.4rem" }}
        />
      ))}
    </Wrap>
  );
};

export const ProjectFundingSkeleton = () => {
  return (
    <VStack gap="16px" align={"start"} w="full">
      <Box as="p" textStyle={{ base: "title4", md: "title3" }} color="white">
        Funding
      </Box>
      <VStack
        border="1px solid"
        borderColor={"#ffffff05"}
        rounded="16px"
        backgroundColor={"surface.green.0"}
        w="full"
        p="24px 32px"
        overflow={"hidden"}
        position={"relative"}
      >
        <HStack w="full" align={"start"}>
          <VStack w="full" align={"start"} gap="8px">
            <Skeleton w="8rem" height="1.8rem" opacity={"0.4"} />
            <SkeletonText
              spacing="3"
              w={"full"}
              noOfLines={2}
              height="28px"
              opacity={"0.4"}
            />
          </VStack>
        </HStack>
      </VStack>
      <VStack
        border="1px solid"
        borderColor={"#ffffff05"}
        rounded="16px"
        backgroundColor={"surface.green.0"}
        w="full"
        p="24px 32px"
        overflow={"hidden"}
        position={"relative"}
      >
        <HStack w="full" align={"start"}>
          <VStack w="full" align={"start"} gap="8px">
            <Skeleton w="8rem" height="1.8rem" opacity={"0.4"} />
            <SkeletonText
              spacing="3"
              w={"full"}
              noOfLines={2}
              height="28px"
              opacity={"0.4"}
            />
          </VStack>
        </HStack>
      </VStack>
    </VStack>
  );
};

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

export const SimilarProjectsSkeleton = () => {
  return (
    <VStack gap="16px" align={"start"} w="full">
      <Box as="p" textStyle={{ base: "title4", md: "title3" }} color="white">
        Creators
      </Box>
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
          <SkeletonCircle
            width={{ base: "1rem", md: "10" }}
            height={{ base: "1rem", md: "8" }}
            opacity="0.4"
          />
          <SkeletonText
            spacing="3"
            w={"full"}
            noOfLines={2}
            height="28px"
            opacity={"0.4"}
          />
        </HStack>
        <SkeletonText
          spacing="3"
          w={"2.8rem"}
          noOfLines={1}
          height="28px"
          opacity={"0.4"}
        />
      </HStack>
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
          <SkeletonCircle
            width={{ base: "1rem", md: "10" }}
            height={{ base: "1rem", md: "8" }}
            opacity="0.4"
          />
          <SkeletonText
            spacing="3"
            w={"full"}
            noOfLines={2}
            height="28px"
            opacity={"0.4"}
          />
        </HStack>
        <SkeletonText
          spacing="3"
          w={"2.8rem"}
          noOfLines={1}
          height="28px"
          opacity={"0.4"}
        />
      </HStack>
    </VStack>
  );
};

export const ProjectDetailSkeleton = () => {
  return (
    <Stack
      direction={{ base: "row", lg: "row" }}
      gap={{ base: "16px", md: "24px" }}
      width={"100%"}
    >
      <SkeletonCircle
        width={{ base: "5.8rem", md: "7.4rem" }}
        height={{ base: "4.1rem", md: "6.2rem" }}
      />
      <VStack
        justify={"center"}
        gap={{ base: "8px", md: "14px" }}
        alignItems={"start"}
        justifyContent="center"
        w="full"
      >
        <Stack gap="1rem" direction={"row"}>
          <Skeleton
            w={{ base: "10rem", md: "14rem" }}
            height={{ base: "24px", md: "32px" }}
            opacity={"0.6"}
          />
        </Stack>
        <SkeletonText
          spacing="3"
          w={"full"}
          noOfLines={2}
          height="28px"
          opacity={"0.4"}
        />
      </VStack>
    </Stack>
  );
};
