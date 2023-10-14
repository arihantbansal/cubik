import {
  Avatar,
  Box,
  Button,
  CardBody,
  CardFooter,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import React from "react";
import { BiCheck } from "react-icons/bi";
import { FiChevronRight } from "react-icons/fi";
import { WalletAddress } from "~/components/common/wallet/WalletAdd";
import { RxCross1 } from "react-icons/rx";

const CreateProfileStepOne = ({ onNext }: { onNext: () => void }) => {
  const wallet = useWallet();
  return (
    <>
      <CardBody gap="18px">
        <HStack rounded="12px" bg="neutral.3" p="10px" spacing="18px">
          <Avatar src={wallet.wallet?.adapter.icon} size="md" rounded="8px" />
          <VStack align={"start"} justify={"center"}>
            <Box
              as="p"
              textStyle={{ base: "title5", md: "title4" }}
              color="neutral.9"
            >
              {wallet.wallet?.adapter.name}
            </Box>
            <WalletAddress
              size="xs"
              walletAddress={wallet.publicKey?.toBase58() as string}
              copy={true}
            />
          </VStack>
        </HStack>
        <VStack rounded="12px" bg="neutral.3" p="16px" align={"start"} w="full">
          <Box
            as="p"
            textStyle={{ base: "title6", md: "title5" }}
            color="neutral.7"
          >
            App Permissions
          </Box>
          <HStack align="start" justify={"center"}>
            <Box
              as={BiCheck}
              color="neutral.8"
              boxSize={{ base: "14px", md: "18px" }}
            />
            <Box
              as="p"
              textStyle={{ base: "body5", md: "body4" }}
              color="neutral.8"
            >
              View your wallet address
            </Box>
          </HStack>
          <HStack align="start" justify={"center"}>
            <Box
              as={BiCheck}
              boxSize={{ base: "14px", md: "18px" }}
              color="neutral.8"
            />
            <Box
              as="p"
              textStyle={{ base: "body5", md: "body4" }}
              color="neutral.8"
            >
              View your token balances
            </Box>
          </HStack>
          <HStack align="start" justifyContent={"center"}>
            <Box
              as={RxCross1}
              color="neutral.8"
              boxSize={{ base: "12px", md: "14px" }}
            />
            <Box
              as="p"
              textStyle={{ base: "body5", md: "body4" }}
              color="neutral.8"
            >
              Transfer Assets without concent
            </Box>
          </HStack>
        </VStack>
      </CardBody>
      <CardFooter>
        <Button
          size={{ base: "cubikMini", md: "cubikSmall" }}
          variant="cubikFilled"
          loadingText="Submitting"
          ml="auto"
          iconSpacing={"4px"}
          rightIcon={
            <Box as={FiChevronRight} boxSize={["10px", "12px", "16px"]} />
          }
          onClick={() => onNext()}
        >
          Next
        </Button>
      </CardFooter>
    </>
  );
};

export default CreateProfileStepOne;
