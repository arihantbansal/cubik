"use client";
import {
  LinkBox,
  Card,
  Center,
  HStack,
  Box,
  VStack,
  Stack,
  SlideFade,
  Avatar,
  Button,
  Wrap,
  useMediaQuery,
} from "@/utils/chakra";
import Link from "next/link";
import { ProjectJoinRoundStatus } from "@prisma/client";
import { Project } from "../index";
import Contributors from "./contributors";
import CustomTag from "@/app/components/common/tags/CustomTag";
import { useState } from "react";
import Footer from "./footer";
// import { isPast } from "date-fns";

const ProjectCard = ({
  id,
  projectId,
  owner: { username },
  status,
  name,
  logo,
  description,
  amountRaised,
  contributors,
  industry,
}: Project) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  console.log(isHovered);

  return (
    <LinkBox
      as={Link}
      href={`/${username}/${projectId}/${
        status === ProjectJoinRoundStatus.APPROVED && id
      }`}
      w="full"
      maxW={{
        base: "92vw",
        sm: "87vw",
        md: "44vw",
        lg: "29.5vw",
        xl: "25.5rem",
      }}
      position={"relative"}
    >
      <Card
        //  border={addedToList ? '2px solid #659C95' : '2px solid transparent'}
        border="none"
        p="0"
        h={{ base: "fit-content", md: "23rem" }}
        cursor="pointer"
        w="100%"
        maxW={{
          base: "full",
          sm: "full",
          md: "44vw",
          lg: "29.5vw",
          xl: "25.5rem",
        }}
        //  onTouchStart={() => setIsHovered((prevState) => !prevState)}

        // on hover set isHovered to true
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        gap="0"
        background={"#0C0D0D"}
        _hover={{
          border: "none",
          background: "neutral.3",
          //  borderColor: `surface.${props.colorScheme}.3`,
        }}
        _active={{
          // border: '2px solid',
          background: "neutral.3",
          // borderColor: `surface.${props.colorScheme}.3`,
        }}
      >
        {/* card outline */}
        {/* {addedToList && (
          <Center
            position={'absolute'}
            w="1.6rem"
            h="1.6rem"
            rounded="full"
            bg="#659C95"
            right="-0.6rem"
            top="-0.6rem"
          >
            <HiCheck size={16} color="#001F1B" />
          </Center>
        )} */}
        {/* card Header */}
        {/* {isPast(startTime) && !isPast(endTime) && (
          // if project is participating in a round then make it visible else don't show it
          <Center
            display={
              status === ProjectJoinRoundStatus.APPROVED ? "flex" : "none"
            }
            w="full"
            bg={`surface.${colorScheme}.3`}
            borderTopRadius={"16px"}
          >
            <HStack
              w="full"
              gap="8px"
              borderColor="red"
              borderBottom={"red"}
              padding={"12px 24px"}
              borderTopRadius={"16px"}
              justifyContent="space-between"
            >
              <Box
                w="full"
                as="p"
                noOfLines={1}
                whiteSpace={"nowrap"}
                color={`surface.${colorScheme}.1`}
                textStyle={"overline4"}
                textTransform="uppercase"
                letterSpacing={"0.2em"}
                fontSize={{ base: "8px", md: "10px" }}
              >
                Participating In
              </Box>
              <Box
                as="p"
                w="fit-content"
                whiteSpace={"nowrap"}
                textStyle={{ base: "title6", md: "title5" }}
                color={`surface.${colorScheme}.1`}
              >
                {roundName}
              </Box>
            </HStack>
          </Center>
        )} */}
        <VStack
          w="full"
          alignItems={"start"}
          justifyContent="space-between"
          h="full"
        >
          <VStack
            p={{ base: "14px", md: "24px" }}
            gap={{ base: "12px", md: "16px" }}
            w="full"
            alignItems={"start"}
          >
            <Stack
              spacing={{ base: "14px", md: "16px" }}
              direction={{ base: "row", md: "column" }}
              align={{ base: "center", md: "start" }}
              w="full"
              justifyContent={"space-between"}
            >
              <Avatar
                src={logo}
                name={name}
                borderRadius={"8px"}
                width={{ base: "3.4rem", md: "4rem" }}
                height={{ base: "3.4rem", md: "4rem" }}
              />
              <VStack spacing="4px" w="full">
                <HStack
                  w="full"
                  align="start"
                  gap="14px"
                  justify="space-between"
                >
                  <Box
                    as="p"
                    color="neutral.11"
                    textStyle={{ base: "title4", md: "title3" }}
                  >
                    {name}
                  </Box>
                  <Box
                    as="p"
                    color="#A8F0E6"
                    textStyle={{ base: "title4", md: "title3" }}
                  >
                    ${amountRaised}
                  </Box>
                </HStack>
                <HStack
                  w="full"
                  align="start"
                  gap="14px"
                  justify="space-between"
                >
                  <Center>
                    <Box
                      noOfLines={1}
                      textAlign="start"
                      as="p"
                      whiteSpace={"nowrap"}
                      textStyle={{ base: "title6", md: "title5" }}
                      color="neutral.7"
                      textTransform="lowercase"
                      w="full"
                    >
                      by @{username}
                    </Box>
                  </Center>
                  <Box
                    color="neutral.8"
                    as="p"
                    textStyle={{ base: "body6", md: "body5" }}
                  >
                    Est. Match
                  </Box>
                </HStack>
              </VStack>{" "}
            </Stack>
            <Box
              color="neutral.9"
              as="p"
              textStyle={{ base: "body5", md: "body4" }}
              sx={{
                noOfLines: { base: "4", md: "3" },
              }}
              alignContent="start"
              alignItems={"start"}
              textAlign={"start"}
            >
              {description}
            </Box>
          </VStack>

          <Footer
            isHovered={isHovered}
            industry={industry}
            contributors={contributors}
          />
        </VStack>
      </Card>
    </LinkBox>
  );
};

export default ProjectCard;
