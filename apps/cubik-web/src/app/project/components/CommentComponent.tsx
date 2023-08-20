import { Avatar, Box, HStack, Tag, VStack } from "@chakra-ui/react";
import { Comments, Prisma, User } from "@cubik/database";
import Link from "next/link";

const HighlightedCommentBox = ({ text }: { text: string }) => {
  const hasSpecialChar = text && (text.includes("@") || text.includes("#"));

  // Split text into words
  const words = text.split(" ");

  return (
    <Box as="p" textStyle={{ base: "body4", md: "body3" }} color="neutral.8">
      {words.map((word, index) => {
        // Check if the word starts with '@'
        if (word.startsWith("@")) {
          // Remove '@' and use the rest as the username
          const username = word.slice(1);

          // Return an anchor tag with the username
          return (
            <Box as="span" key={index}>
              <Box
                as={Link}
                href={`/profile/${username}`}
                color="surface.yellow.1"
                backgroundColor={"surface.yellow.3"}
                rounded="full"
                px="8px"
                pb="4px"
                transform={"translateY(-2px)"}
              >
                {word}
              </Box>{" "}
            </Box>
          );
        }
        // If it's not a mention, return the word as is
        return (
          <Box as="span" key={index}>
            {word}{" "}
          </Box>
        );
      })}
    </Box>
  );
};

interface Props {
  ownerName: string;
  el: Prisma.CommentsGetPayload<{
    include: {
      user: true;
    };
  }>;
}

export const CommentComponent = ({ ownerName, el }: Props) => {
  const date = new Date(el?.createdAt);

  return (
    <HStack
      py="12px"
      rounded="8px"
      w="full"
      key={el.id}
      align={"start"}
      spacing={{ base: "12px", md: "16px" }}
    >
      <Link href={`/${el?.user?.username}`}>
        <Avatar
          mt="4px"
          size={{ base: "sm", md: "md" }}
          src={el.user?.profilePicture as string}
        />
      </Link>
      <VStack align={"start"} spacing={{ base: "4px", md: "8px" }}>
        <HStack>
          <Box
            as="p"
            textStyle={{ base: "title5", md: "title4" }}
            color="neutral.11"
          >
            @{el?.user.username}
          </Box>
          {el?.user.username === ownerName && (
            <Tag
              size={{ base: "sm", md: "sm" }}
              px="16px"
              py="6px"
              fontWeight={"700"}
              color={"surface.green.2"}
              background={"surface.green.3"}
              rounded="full"
            >
              Owner
            </Tag>
          )}
          <Box
            as="p"
            textStyle={{ base: "body5", md: "body4" }}
            color="neutral.7"
          >
            {date.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Box>
        </HStack>
        <HighlightedCommentBox text={el?.comment} />
      </VStack>
    </HStack>
  );
};
