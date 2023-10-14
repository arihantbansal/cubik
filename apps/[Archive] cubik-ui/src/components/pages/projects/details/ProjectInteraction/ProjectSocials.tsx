import { IconButton } from "@chakra-ui/button";
import { Box, VStack, Wrap } from "@chakra-ui/layout";
import { SocialLinks } from "./SocialLinks";
import { ProjectsModel } from "@prisma/client";
import { Skeleton } from "@chakra-ui/skeleton";
import { HackathonTracks } from "@cubik/common-types";
import { Tag } from "@chakra-ui/tag";

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

export const ProjectSocials = ({
  isLoading,
  hideTitle,
  projectDetails,
  tracks,
}: {
  isLoading: boolean;
  hideTitle?: boolean;
  projectDetails: ProjectsModel;
  tracks: {
    label: string;
    value: string;
  }[];
}) => {
  const socials = [
    {
      name: projectDetails?.twitter_handle ? "twitter" : undefined,
      url: projectDetails?.twitter_handle
        ? projectDetails?.twitter_handle
        : undefined,
    },
    {
      name: projectDetails?.discord_link ? "discord" : undefined,
      url: projectDetails?.discord_link
        ? projectDetails?.discord_link
        : undefined,
    },
    {
      name: projectDetails?.telegram_link ? "telegram" : undefined,

      url: projectDetails?.telegram_link
        ? projectDetails?.telegram_link
        : undefined,
    },
    {
      name: projectDetails?.github_link ? "github" : undefined,
      url: projectDetails?.github_link
        ? projectDetails?.github_link
        : undefined,
    },
  ];
  return (
    <VStack gap={{ base: "8px", md: "16px" }} align="start" w="full">
      <Box as="p" textStyle={{ base: "title4", md: "title3" }} color="white">
        Tracks
      </Box>
      <Wrap gap={1} direction={"row"}>
        {tracks.map((track, key) => (
          <Tag>{track.label}</Tag>
        ))}
      </Wrap>

      {!hideTitle && (
        <Box as="p" textStyle={{ base: "title4", md: "title3" }} color="white">
          Socials
        </Box>
      )}
      <Wrap direction={"row"}>
        {isLoading ? (
          <ProjectSocialsSkeleton isLoading={isLoading} />
        ) : (
          socials.map(
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
          )
        )}
      </Wrap>
    </VStack>
  );
};
