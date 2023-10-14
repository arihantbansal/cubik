import { Box, Button, Center, Flex, HStack, Skeleton } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import { TbLockAccess } from "react-icons/tb";
import { useUserStore } from "~/store/userStore";
const AdminWallet = ["52atj3jAYAq33rdDi4usSNpAozFF1foPTuyw8vkD6mtQ"];

const AdminControls = () => {
  const { user } = useUserStore();
  const { publicKey, connected } = useWallet();

  if (!connected) {
    return null;
  }

  if (!user?.mainWallet || user?.mainWallet !== publicKey?.toBase58()) {
    return null;
  }

  if (!AdminWallet.includes(publicKey?.toBase58() as string)) {
    return null;
  }

  return (
    <Flex
      mb="40px"
      zIndex="9"
      justify={"space-between"}
      flexDirection={{ base: "column", sm: "row" }}
      padding={{ base: "10px 16px", md: "16px 24px" }}
      w="full"
      align={{ base: "start", sm: "center" }}
      gap="8px"
      border="1px solid"
      borderRadius={"8px"}
      borderColor="#A88005"
      backgroundColor={"#231900"}
    >
      <HStack gap="8px">
        <Center color="white">
          <TbLockAccess color="#A88005" size={28} />
        </Center>
        <Box
          as="p"
          noOfLines={{ base: 2, md: 1 }}
          whiteSpace={{ base: "normal", md: "nowrap" }}
          textStyle={{ base: "body4", md: "body2" }}
          color="#A88005"
        >
          You have the access to manage <b>Projects</b>
        </Box>
      </HStack>
      <HStack w="fit-content" p="6px 10px">
        <Button
          as={Link}
          href={`/projects/admin?pubKey=${publicKey?.toBase58()}`}
          variant="connect_wallet"
          background={"surface.blue.4"}
          fontWeight="600"
          outline="none"
          _hover={{
            background: "surface.blue.4",
            textDecor: "none",
            border: "none",
            outline: "none",
          }}
          rounded="8px"
          noOfLines={1}
          whiteSpace={"nowrap"}
          textStyle={{ base: "body6", md: "body5" }}
          color="white"
        >
          Manage Projects
        </Button>{" "}
      </HStack>
    </Flex>
  );
};

type GrantRoundAdminControlsProps = {
  isLoading: boolean;
  roundName?: string;
  roundId?: string;
  roundCreatorId?: string;
};

export const GrantRoundAdminControls = ({
  isLoading,
  roundName,
  roundId,
  roundCreatorId,
}: GrantRoundAdminControlsProps) => {
  const { user } = useUserStore();
  const { publicKey, connected } = useWallet();

  if (!connected) {
    return null;
  }

  if (!user?.id || user?.id !== roundCreatorId) {
    return null;
  }

  return (
    <Skeleton
      w="full"
      isLoaded={!isLoading}
      fadeDuration={2.6}
      opacity={isLoading ? "0.3" : "1"}
    >
      <Flex
        mb="40px"
        zIndex="9"
        justify={"space-between"}
        flexDirection={{ base: "column", sm: "row" }}
        padding={{ base: "10px 16px", md: "16px 24px" }}
        w="full"
        align={{ base: "start", sm: "center" }}
        gap="8px"
        border="1px solid"
        borderRadius={"8px"}
        borderColor="#A88005"
        backgroundColor={"#231900"}
      >
        <HStack gap="8px">
          <Center color="white">
            <TbLockAccess color="#A88005" size={28} />
          </Center>
          <Box
            as="p"
            noOfLines={{ base: 2, md: 1 }}
            whiteSpace={{ base: "normal", md: "nowrap" }}
            textStyle={{ base: "body4", md: "body2" }}
            color="#A88005"
          >
            Manage <b>{roundName}</b>
          </Box>
        </HStack>
        <HStack w="fit-content" p="6px 10px">
          <Button
            as={Link}
            href={`/grants/admin/${roundId}`}
            variant="connect_wallet"
            background={"surface.blue.4"}
            fontWeight="600"
            outline="none"
            _hover={{
              background: "surface.blue.4",
              textDecor: "none",
              border: "none",
              outline: "none",
            }}
            rounded="8px"
            noOfLines={1}
            whiteSpace={"nowrap"}
            textStyle={{ base: "body6", md: "body5" }}
            color="white"
          >
            Open Dashboard
          </Button>{" "}
        </HStack>
      </Flex>
    </Skeleton>
  );
};

export default AdminControls;
