import {
  Box,
  Center,
  Flex,
  IconButton,
  Tag,
  VStack,
  Wrap,
} from "@/utils/chakra";
import React from "react";
import Twitter from "@/theme/icons/socials/twitter.svg";
import Github from "@/theme/icons/socials/github.svg";
import Discord from "@/theme/icons/socials/discord.svg";
import Youtube from "@/theme/icons/socials/youtube.svg";
import Telegram from "@/theme/icons/socials/telegram.svg";

export const SocialLinks = ({ urlName }: { urlName: string }) => {
  switch (urlName) {
    case "url":
      return (
        <Center width="18px" height="18px">
          <Twitter color="#E0FFFD" />
        </Center>
      );
    case "twitter":
      return (
        <Center width="18px" height="18px">
          <Twitter color="#E0FFFD" />
        </Center>
      );
    case "discord":
      return (
        <Center width="18px" height="18px">
          <Discord color="#E0FFFD" />
        </Center>
      );
    case "telegram":
      return (
        <Center width="18px" height="18px">
          <Telegram color="#E0FFFD" />
        </Center>
      );
    case "youtube":
      return (
        <Center width="18px" height="18px">
          <Youtube color="#E0FFFD" />
        </Center>
      );
    case "github":
      return (
        <Center width="18px" height="18px">
          <Github color="#E0FFFD" />
        </Center>
      );
    default:
      return <></>;
  }
};

interface Props {
  twitter_handle: string;
  discord_link: string;
  telegram_link: string;
  github_link: string;
  tracks: {
    label: string;
    value: string;
  }[];
}
export const ProjectSocials = ({
  discord_link,
  github_link,
  telegram_link,
  twitter_handle,
  tracks,
}: Props) => {
  const socials = [
    {
      name: twitter_handle ? "twitter" : undefined,
      url: twitter_handle ? twitter_handle : undefined,
    },
    {
      name: discord_link ? "discord" : undefined,
      url: discord_link ? discord_link : undefined,
    },
    {
      name: telegram_link ? "telegram" : undefined,
      url: telegram_link ? telegram_link : undefined,
    },
    {
      name: github_link ? "github" : undefined,
      url: github_link ? github_link : undefined,
    },
  ];
  return (
    <>
      <VStack gap={{ base: "8px", md: "16px" }} align="start" w="full">
        <Box as="p" textStyle={{ base: "title4", md: "title3" }} color="white">
          Project Socials
        </Box>
        <Wrap direction={"row"}>
          {socials.map(
            (
              link: { name: string | undefined; url: string | undefined },
              key
            ) =>
              link.name && (
                <IconButton
                  aria-label={link.name}
                  variant={"unstyled"}
                  fontSize={{ base: "lg", md: "xl" }}
                  display="flex"
                  alignItems={"center"}
                  rounded="full"
                  color="brand.teal6"
                  backgroundColor="brand.teal2"
                  key={key}
                  icon={<SocialLinks urlName={link.name} />}
                  _hover={{
                    backgroundColor: "brand.teal3",
                  }}
                  as="a"
                  href={link.url}
                  target="_blank"
                />
              )
          )}
        </Wrap>
      </VStack>
      <VStack gap={{ base: "8px", md: "16px" }} align="start" w="full">
        {tracks.length > 0 && (
          <Box
            as="p"
            textStyle={{ base: "title4", md: "title3" }}
            color="white"
          >
            Event Tracks
          </Box>
        )}
        <Flex
          flexWrap={{ base: "nowrap", md: "wrap" }}
          gap={"4px"}
          direction={"row"}
          w="full"
          overflow={"scroll"}
          sx={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {tracks.map((track, key) => (
            <Center
              minW={"fit-content"}
              rounded="full"
              bg="#222222"
              fontSize={{ base: "12px", md: "13px" }}
              fontWeight={"500"}
              color="#ffffff85"
              h={{ base: "32px", md: "36px" }}
              px={{ base: "16px", md: "18px" }}
            >
              {track.label}
            </Center>
          ))}
        </Flex>
      </VStack>
    </>
  );
};
