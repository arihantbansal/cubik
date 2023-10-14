import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { HStack, Text, VStack } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { useState } from "react";
import { useUserStore } from "~/store/userStore";
interface CommentType {
  id: string;
  name: string;
  avatar: string;
  date: number;
  message: string;
}
const Discussions = () => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [message, setMessage] = useState<string>("");
  const { user } = useUserStore();
  return (
    <>
      <VStack position={"relative"} w={"full"} mt={6}>
        <HStack w="full" align={"top"} gap="18px">
          <Avatar src={user?.profilePicture} width="54px" height="54px" />
          <Textarea
            h={32}
            minH={32}
            p="0.8rem"
            placeholder="Add a comment"
            border={"1px solid #1D1F1E"}
            backgroundColor="transparent"
            _hover={{
              backgroundColor: "transparent",
            }}
            _active={{
              backgroundColor: "transparent",
            }}
            _focus={{
              backgroundColor: "transparent",
              border: "1px solid #1D1F1E",
            }}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
        </HStack>
        <Button
          position={"absolute"}
          top="0"
          right="0"
          variant={"unstyled"}
          backgroundColor={"transparent !important"}
          color="#636666"
          zIndex={"100"}
          _hover={{
            backgroundColor: "#63666630",
          }}
          px={{ base: "1rem", md: "1.6rem" }}
          fontSize={{ base: "sm", md: "md" }}
          fontWeight="700"
        >
          Post
        </Button>
      </VStack>
      <VStack align={"start"} w={"full"}>
        {comments?.map((el) => {
          const date = new Date(el.date);
          return (
            <HStack key={el.id} align={"start"} px={6}>
              <Avatar
                size={"sm"}
                src={
                  "https://solana.ghost.io/content/images/2022/06/solana-network-upgrades.png"
                }
              />

              <VStack align={"start"}>
                <HStack>
                  <Text fontWeight={600}>{el.name}</Text>
                  <Text color={"#94A3B8"} fontWeight={500}>
                    {date.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </HStack>
                <Text mt={"0px !important"}>{el.message}</Text>
              </VStack>
            </HStack>
          );
        })}
      </VStack>
    </>
  );
};

export default Discussions;
