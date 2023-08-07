import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Flex,
  HStack,
  SlideFade,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import { Project } from "..";
import Link from "next/link";
import Image from "next/image";

const Contributors = ({ count, images }: Project["contributors"]) => {
  return (
    <div>
      <Flex
        justify="end"
        align={"center"}
        flex="1"
        w={"fit-content"}
        gap="4px"
        position="relative"
        zIndex="1"
      >
        <AvatarGroup size="xs" max={3}>
          {images.map((image, key) => (
            <Avatar
              key={key}
              outline="2px solid #0C0D0D"
              name={"hi"}
              src={image}
              
            />

            // <Image src={image} height={20} width={20} alt="profile picture" />
          ))}
        </AvatarGroup>
        {count > 3 && (
          <Box as="p" color="white" textStyle={{ base: "body6", md: "body5" }}>
            +{count - 3}
          </Box>
        )}
      </Flex>
    </div>
  );
};

export default Contributors;
