import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { Box, HStack, Stack, VStack } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/skeleton";
import React from "react";
import { BiChevronDown } from "react-icons/bi";
import {
  FaDiscord,
  FaGithub,
  FaTelegramPlane,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { HiLink } from "react-icons/hi";
import { MdReportGmailerrorred } from "react-icons/md";
import CustomTag from "~/components/common/tags/CustomTag";

export const ProjectLink = ({ urlName }: { urlName: string }) => {
  switch (urlName) {
    case "url":
      return <HiLink color="#E0FFFD" size={18} />;
    case "twitter":
      return <FaTwitter color="#E0FFFD" size={18} />;
    case "discord":
      return <FaDiscord color="#E0FFFD" size={18} />;
    case "telegram":
      return <FaTelegramPlane color="#E0FFFD" size={18} />;
    case "youtube":
      return <FaYoutube color="#E0FFFD" size={18} />;
    case "github":
      return <FaGithub color="#E0FFFD" size={18} />;
    default:
      return <></>;
  }
};

const ProjectDetailsHeader = ({
  isLoading,
  name,
  logo,
  industry,
  short_description,
}: {
  isLoading: boolean;
  name: string;
  logo: string;
  industry: string;
  short_description: string;
}) => {
  return (
    <Stack
      direction={{ base: "row", md: "row" }}
      gap={{ base: "8px", md: "24px" }}
      width={"full"}
      alignItems={"center"}
    >
      <SkeletonCircle
        isLoaded={!isLoading}
        fadeDuration={1.5}
        opacity={isLoading ? "0.6" : "1"}
        width={{ base: "4.4rem", md: "6.2rem" }}
        height={{ base: "4.4rem", md: "6.2rem" }}
      >
        <Avatar
          backgroundColor={"#1C1C1C"}
          src={logo}
          width={{ base: "4.4rem", md: "6.2rem" }}
          height={{ base: "4.4rem", md: "6.2rem" }}
        />
      </SkeletonCircle>
      <VStack
        justify={"center"}
        gap={{ base: "2px", md: "14px" }}
        alignItems={"start"}
        justifyContent="center"
        w="full"
      >
        <Stack direction={"row"} justify={"center"}>
          <Skeleton
            isLoaded={!isLoading}
            fadeDuration={1.5}
            opacity={isLoading ? "0.6" : "1"}
            minW={isLoading ? "10rem" : "auto"}
          >
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
                  rightIcon={<BiChevronDown size={26} color="white" />}
                />
                <MenuList p="0" outline="0" border="0">
                  <MenuItem
                    p="8px 16px"
                    color="surface.yellow.2"
                    rounded="4px"
                    icon={
                      <MdReportGmailerrorred
                        color="surface.yellow.2"
                        size={22}
                      />
                    }
                  >
                    Report
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Skeleton>
          <Skeleton
            isLoaded={!isLoading}
            fadeDuration={2}
            opacity={isLoading ? "0.4" : "1"}
          >
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
          </Skeleton>
        </Stack>
        <SkeletonText
          isLoaded={!isLoading}
          w="full"
          fadeDuration={2.5}
          noOfLines={2}
          opacity={isLoading ? "0.5" : "1"}
          skeletonHeight="16px"
          spacing="4"
        >
          <Box
            as="p"
            textStyle={{ base: "body4", md: "body2" }}
            color="neutral.9"
            noOfLines={2}
            textOverflow="ellipsis"
          >
            {short_description}
          </Box>
        </SkeletonText>
        {/* <HStack>
          <Button
            variant="unstyled"
            display={'flex'}
            alignItems="center"
            rounded="full"
            color="brand.teal6"
            backgroundColor="brand.teal2"
            p={{ base: '0.5rem 0.8rem', md: '0.2rem 1rem' }}
            iconSpacing={{ base: '0.3rem', md: '0.4rem' }}
            leftIcon={<ProjectLink urlName={'url'} />}
            _hover={{
              backgroundColor: 'brand.teal3',
            }}
            as="a"
            href={projectDetails?.project_link}
            target="_blank"
          >
            <Box
              as="p"
              textStyle={{ base: 'body5', md: 'body4' }}
              color="brand.teal.6"
              pb="0.1rem"
            >
              {getDomain(projectDetails?.project_link)}
            </Box>
          </Button>

          {socials.map((link: { name: string; url: string }, key: Key) => (
            <IconButton
              aria-label={link.name}
              variant={'unstyled'}
              fontSize={{ base: 'sm', sm: 'md', md: 'xl' }}
              display="flex"
              alignItems={'center'}
              rounded="full"
              color="brand.teal6"
              backgroundColor="brand.teal2"
              key={key}
              icon={<ProjectLink urlName={link.name} />}
              _hover={{
                backgroundColor: 'brand.teal3',
              }}
              as="a"
              href={link.name}
              target="_blank"
            />
          ))}
        </HStack> */}
      </VStack>
    </Stack>
  );
};

export default ProjectDetailsHeader;
