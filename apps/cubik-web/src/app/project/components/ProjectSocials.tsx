import { Box, IconButton, Tag, VStack, Wrap } from "@/utils/chakra";
import React from "react";

// export const SocialLinks = ({ urlName }: { urlName: string }) => {
//   switch (urlName) {
//     case "url":
//       return <HiLink color="#E0FFFD" size={18} />;
//     case "twitter":
//       return <FaTwitter color="#E0FFFD" size={18} />;
//     case "discord":
//       return <FaDiscord color="#E0FFFD" size={18} />;
//     case "telegram":
//       return <FaTelegramPlane color="#E0FFFD" size={18} />;
//     case "youtube":
//       return <FaYoutube color="#E0FFFD" size={18} />;
//     case "github":
//       return <FaGithub color="#E0FFFD" size={18} />;
//     default:
//       return <></>;
//   }
// };

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
        {tracks.length > 0 && (
          <Box
            as="p"
            textStyle={{ base: "title4", md: "title3" }}
            color="white"
          >
            Tracks
          </Box>
        )}
        <Wrap gap={1} direction={"row"}>
          {tracks.map((track, key) => (
            <Tag>{track.label}</Tag>
          ))}
        </Wrap>

        <Box as="p" textStyle={{ base: "title4", md: "title3" }} color="white">
          Socials
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
                  //   icon={<SocialLinks urlName={link.name} />}
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
    </>
  );
};
