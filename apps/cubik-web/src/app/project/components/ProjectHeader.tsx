import CustomTag from "@/app/components/common/tags/CustomTag";
import {
  Avatar,
  Box,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  VStack,
} from "@/utils/chakra";
import React from "react";

interface Props {
  name: string;
  logo: string;
  industry: string;
  shortDescription: string;
  type: "preview" | "round" | "hackathon";
  eventId?: string;
  projectLink: string;
}
export const ProjectHeader = ({
  industry,
  logo,
  name,
  shortDescription,
  type = "preview",
  projectLink,
}: Props) => {
  return (
    <Stack
      direction={{ base: "row", md: "row" }}
      gap={{ base: "8px", md: "24px" }}
      width={"full"}
      alignItems={"center"}
    >
      <Avatar
        backgroundColor={"#1C1C1C"}
        src={logo}
        width={{ base: "4.4rem", md: "6.2rem" }}
        height={{ base: "4.4rem", md: "6.2rem" }}
      />
      <VStack
        justify={"center"}
        gap={{ base: "2px", md: "14px" }}
        alignItems={"start"}
        justifyContent="center"
        w="full"
      >
        <Stack direction={"row"} justify={"center"}>
          <HStack align="center" spacing="1px">
            <Box
              as="p"
              textStyle={{ base: "title2", sm: "title1", md: "headline3" }}
              textTransform="capitalize"
              color="neutral.11"
              noOfLines={1}
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
            >
              {name}
            </Box>
            <Menu>
              <MenuButton
                w={{ base: "4px !important", md: "8px !important" }}
                display="flex"
                marginInline={"0px"}
                alignContent={"center"}
                justifyContent={"center"}
                m="0 !important"
                as={Button}
                iconSpacing={"0px"}
                variant="cubikText"
                maxH="1rem"
                // rightIcon={<BiChevronDown size={26} color="white" />}
              />
              <MenuList p="0" outline="0" border="0">
                <MenuItem
                  p="8px 16px"
                  color="surface.yellow.2"
                  rounded="4px"
                  //   icon={
                  //     <MdReportGmailerrorred color="surface.yellow.2" size={22} />
                  //   }
                >
                  Report
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>

          <HStack
            overflow={"hidden"}
            alignItems="center"
            justifyContent={"center"}
            spacing="0.4rem"
            h="full"
            display={{ base: "none", md: "flex" }}
          >
            {industry &&
              JSON.parse(industry)?.map((tag: any, key: React.Key) => {
                return (
                  <CustomTag color={tag?.label} key={key}>
                    {tag?.label}
                  </CustomTag>
                );
              })}
          </HStack>
        </Stack>

        <Box
          as="p"
          textStyle={{ base: "body4", md: "body2" }}
          color="neutral.9"
          noOfLines={2}
          textOverflow="ellipsis"
        >
          {shortDescription}
        </Box>
      </VStack>
      <Box maxW="26rem" w={"full"} display={{ base: "none", lg: "block" }}>
        <VStack
          ml="auto"
          right="20rem"
          w={"full"}
          alignItems={{ base: "center", lg: "start" }}
        >
          <VStack gap="16px" align={"end"} spacing="0" w="full" pb="0.5rem">
            <Button
              // rightIcon={
              //   <AnimatedArrowIcon
              //     animate={isHovered}
              //     width={18}
              //     height={18}
              //   />
              // }
              variant="cubikOutlined"
              w="full"
              as="a"
              href={projectLink}
              target="_blank"
            >
              Visit
            </Button>
          </VStack>
        </VStack>
      </Box>
    </Stack>
  );
};
