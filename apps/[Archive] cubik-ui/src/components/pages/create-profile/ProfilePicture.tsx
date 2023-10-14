import { Center, Avatar as ChakraAvatar } from "@chakra-ui/react";
import { BiUpArrowAlt } from "react-icons/bi";

const ProfilePicture = ({
  onOpen,
  onClose,
  isOpen,
  pfp,
}: {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
  pfp: string;
}) => {
  return (
    <Center
      cursor={"pointer"}
      w="fit-content"
      transform={{ base: "scale(0.9)", md: "scale(1)" }}
      position="relative"
      onClick={() => {
        if (isOpen) {
          onClose();
        } else {
          onOpen();
        }
      }}
    >
      <Center
        cursor={"pointer"}
        position={"absolute"}
        bottom="-4px"
        right="-4px"
        rounded="full"
        bg="white"
        p="0.1rem"
        zIndex={"10"}
      >
        <BiUpArrowAlt color="black" />
      </Center>
      <ChakraAvatar src={pfp} width="84px" height="84px" borderRadius={"8px"} />
    </Center>
  );
};

export default ProfilePicture;
