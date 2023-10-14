import { Avatar, AvatarGroup } from "@chakra-ui/avatar";
import { Box, Center, Flex, HStack, VStack } from "@chakra-ui/layout";
import { Skeleton, SkeletonCircle } from "@chakra-ui/skeleton";
import { Contribution, UserModel } from "@cubik/database";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SOL } from "~/components/common/tokens/token";
import { formatNumberWithK } from "~/utils/formatWithK";

const transition = {
  type: "spring",
  stiffness: 30,
  damping: 10,
  duration: 2,
};
const yTransition = { ...transition, y: { duration: 2 } };

const variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const MotionCenter = motion(Center);

const displayedItemsCount = 3; // number of items to display at once

export const RecentContributions = ({
  projectId,
  roundId,
  isLoading,
}: {
  projectId: string;
  roundId: string;
  isLoading?: boolean;
}) => {
  // const {
  //   data: contributorsData,
  //   isLoading: loadingContributors,
  //   isError,
  //   error,
  // } = trpc.contribution.getProjectContributors.useQuery({ projectId, roundId });
  const contributorsData: any[] = [];
  const [visibleContributors, setVisibleContributors] = useState<
    (Contribution & {
      user: UserModel;
    })[]
  >([]);

  useEffect(() => {
    if (contributorsData) {
      const itemsToDisplay = contributorsData.slice(0, displayedItemsCount);
      setVisibleContributors(itemsToDisplay);
    }
  }, [contributorsData]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (contributorsData && visibleContributors.length > 0) {
        const nextContributorIndex =
          (contributorsData.indexOf(
            visibleContributors[visibleContributors.length - 1]
          ) +
            1) %
          contributorsData.length; // loop back to the start
        setVisibleContributors((prevVisibleContributors) => [
          ...prevVisibleContributors.slice(1),
          contributorsData[nextContributorIndex],
        ]);
      }
    }, 2000); // Update every second
    return () => clearInterval(intervalId); // Clean up on unmount
  }, [contributorsData, visibleContributors]);

  return (
    <VStack gap="16px" align={"start"} w={{ base: "full", lg: "full" }}>
      <HStack w="full" justify={"space-between"}>
        <Box as="p" textStyle={{ base: "title4", md: "title3" }} color="white">
          Recent Contributors
        </Box>
        {/* <Button
            display={{ base: 'none', md: 'block' }}
            size="cubikMini"
            variant="cubikText"
            h="fit-content"
            p="0"
            px="0"
            rightIcon={<Box as={BiChevronRight} />}
          >
            View All
          </Button> */}
      </HStack>
      <VStack
        display={{ base: "none", md: "flex" }}
        align={"start"}
        w="full"
        spacing="2px"
        color="#CBCBCB"
      >
        {isLoading && (
          <VStack spacing="10px" w="full">
            <Skeleton opacity={0.4} height="2.5rem" width="full" />
            <Skeleton opacity={0.3} height="2.5rem" width="full" />
            <Skeleton opacity={0.2} height="2.5rem" width="full" />
          </VStack>
        )}
        {visibleContributors.length > 0 ? (
          visibleContributors?.map((contributor, i) => (
            <motion.div
              key={contributor.id}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={i === 0 ? yTransition : transition} // only apply y-transition for the first item
              style={{
                width: "100%",
              }}
            >
              <HStack
                // border="none"
                py="8px"
                w="full"
                direction={"row"}
                gap="12px"
                align={"center"}
                justify={"center"}
              >
                <Avatar
                  alignSelf={"center"}
                  size="sm"
                  name={contributor.user.username}
                  src={contributor.user.profilePicture}
                />
                <VStack
                  w="full"
                  alignItems={"start"}
                  textAlign="start"
                  spacing="4px"
                >
                  <Box
                    as="p"
                    textStyle={{ sm: "title6", md: "title5" }}
                    color="white"
                  >
                    @{contributor.user.username}
                  </Box>
                  <Box
                    as="p"
                    color="#B4B0B2"
                    textStyle={{ base: "body6", md: "body5" }}
                  >
                    {"asd..asdf"}
                  </Box>
                </VStack>
                <HStack gap="8px" align={"center"}>
                  <Center>
                    <SOL size={"22px"} />
                  </Center>
                  <HStack align={"baseline"} color="white">
                    <Box as="p" textStyle={{ base: "title5", md: "title4" }}>
                      {formatNumberWithK(contributor.currentusdTotal)}
                    </Box>
                    <Box as="p" textStyle={{ base: "title6", md: "title7" }}>
                      SOL
                    </Box>
                  </HStack>
                </HStack>
              </HStack>
            </motion.div>
          ))
        ) : (
          <MotionCenter
            display={isLoading ? "none" : "flex"}
            maxW={"7xl"}
            mx="auto"
            w="full"
            py={{ base: "16px", sm: "24px" }}
            border="1px dashed"
            borderColor={"#1D1F1E"}
            rounded="12px"
            initial={isLoading ? "hidden" : "show"}
            animate={isLoading ? "hidden" : "show"}
            transition={{ duration: 3 }}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1 },
            }}
          >
            <Box as="p" textStyle={{ base: "body4" }} color="neutral.6">
              No Contributors yet
            </Box>
          </MotionCenter>
        )}
      </VStack>
      <Flex
        display={{ base: "flex", md: "none" }}
        justify="start"
        align={"end"}
        flex="1"
        w={"full"}
        gap="4px"
        position="relative"
        zIndex="1"
      >
        <AvatarGroup size="sm" max={5} gap={"0.3rem"}>
          {isLoading && (
            <HStack spacing="-10px">
              <Center
                rounded="full"
                border="3px solid black"
                bgColor={"black"}
                zIndex={"4"}
              >
                <SkeletonCircle
                  fadeDuration={1.5}
                  opacity={0.4}
                  height="2rem"
                  width="2rem"
                />
              </Center>
              <Center
                rounded="full"
                border="3px solid black"
                bgColor={"black"}
                zIndex={"3"}
              >
                <SkeletonCircle
                  fadeDuration={1.5}
                  opacity={0.4}
                  height="2rem"
                  width="2rem"
                />
              </Center>
              <Center
                rounded="full"
                border="3px solid black"
                bgColor={"black"}
                zIndex={"2"}
              >
                <SkeletonCircle
                  fadeDuration={1.5}
                  opacity={0.4}
                  height="2rem"
                  width="2rem"
                />
              </Center>
              <Center
                rounded="full"
                border="3px solid black"
                bgColor={"black"}
                zIndex={"1"}
              >
                <SkeletonCircle
                  fadeDuration={1.5}
                  opacity={0.4}
                  height="2rem"
                  width="2rem"
                />
              </Center>
            </HStack>
          )}
          {contributorsData?.slice(-5).map((contribution) => (
            <Avatar
              key={contribution.id}
              outline="2px solid #0C0D0D"
              name={contribution.user.username}
              src={contribution.user.profilePicture}
            />
          ))}
        </AvatarGroup>
        <Box as="p" color="white" textStyle={{ base: "body4", md: "body3" }}>
          {contributorsData &&
            (contributorsData?.length === 0
              ? "- -"
              : contributorsData?.length > 5
              ? "+" + (contributorsData?.length - 5) + " more"
              : "")}
        </Box>
      </Flex>
    </VStack>
  );
};
