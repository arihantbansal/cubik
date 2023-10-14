/* eslint-disable no-undef */
import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box, HStack, Stack, VStack } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Skeleton } from "@chakra-ui/skeleton";
import { Tooltip } from "@chakra-ui/tooltip";
import {
  HiArrowNarrowDown,
  HiArrowNarrowUp,
  HiExternalLink,
} from "react-icons/hi";
import { WalletAddress } from "~/components/common/wallet/WalletAdd";

import WithdrawFundsTransactionModal from "./WithdrawFundsTransactionModal";

const VaultHeader = ({
  isLoading,
  multiSigAddress,
  balance,
}: {
  isLoading: boolean;
  balance: string | number;
  multiSigAddress: string | null | undefined;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  let squadsURL: string = "";

  squadsURL = `https://v3.squads.so/dashboard`;

  return (
    <Stack
      key={multiSigAddress}
      direction={{ base: "column", sm: "row" }}
      gap={{ base: "16px", sm: "20px", md: "24px" }}
      w="full"
      justify={"space-between"}
    >
      <VStack alignItems={"start"}>
        {multiSigAddress && (
          <Button
            as="a"
            href={squadsURL}
            p="0 !important"
            color={"neutral.8"}
            size={{ base: "cubikMini", md: "cubikSmall" }}
            variant={"cubikText"}
            iconSpacing={{ base: "0px", md: "4px" }}
            _hover={{
              bg: "transparent",
            }}
            rightIcon={
              <Box as={HiExternalLink} boxSize={{ base: "14px", md: "16px" }} />
            }
          >
            Project Vault
          </Button>
        )}
        <HStack gap="6px" align={{ base: "center", md: "center" }}>
          <Skeleton fadeDuration={2.5} isLoaded={!isLoading}>
            <Box
              as="p"
              textStyle={{ base: "title3", sm: "title2", md: "title1" }}
              color="neutral.11"
            >
              ${balance}
            </Box>
          </Skeleton>
          <Skeleton fadeDuration={2.5} isLoaded={!isLoading}>
            <WalletAddress
              walletAddress={multiSigAddress as string}
              size={"sm"}
              copy={true}
            >
              <Tooltip
                label="Squads Multisig"
                aria-label="A tooltip"
                variant={"cubik"}
              >
                <svg
                  width="33"
                  height="33"
                  viewBox="0 0 33 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24.1693 0.83739C24.1024 0.770398 24.0323 0.707214 23.96 0.647835C23.4505 0.22956 22.8119 0.000641506 22.1528 0L10.8472 0C10.1875 8.31143e-07 9.54813 0.22867 9.03802 0.647074C8.96568 0.706909 8.89646 0.770432 8.83065 0.83739L0.83739 8.83065C0.302056 9.36532 0.000868037 10.0906 0 10.8472L0 22.1528C0.000229989 22.5277 0.0742994 22.8988 0.217979 23.2451C0.361659 23.5914 0.572135 23.9059 0.83739 24.1709L8.83065 32.1641C8.89712 32.2309 8.967 32.2942 9.04 32.3537C9.55008 32.7717 10.1893 33.0001 10.8488 33H22.1528C22.8117 32.9998 23.4503 32.7714 23.96 32.3537C24.0323 32.2943 24.1024 32.2311 24.1693 32.1641L32.1626 24.1709C32.4279 23.9059 32.6383 23.5914 32.782 23.2451C32.9257 22.8988 32.9998 22.5277 33 22.1528V10.8472C32.9998 10.4723 32.9257 10.1012 32.782 9.7549C32.6383 9.40863 32.4279 9.09406 32.1626 8.82913L24.1693 0.83739ZM28.638 16.5004V25.9812C28.6381 26.3301 28.5694 26.6756 28.4359 26.998C28.3024 27.3204 28.1067 27.6133 27.86 27.86C27.6133 28.1067 27.3204 28.3024 26.998 28.4359C26.6756 28.5694 26.3301 28.6381 25.9812 28.638H7.01656C6.6677 28.638 6.32226 28.5692 5.99996 28.4357C5.67767 28.3022 5.38483 28.1065 5.13818 27.8598C4.89154 27.613 4.69591 27.3201 4.56248 26.9978C4.42904 26.6755 4.36042 26.33 4.36052 25.9812V7.01656C4.36052 6.31214 4.64035 5.63656 5.13845 5.13845C5.63656 4.64035 6.31214 4.36052 7.01656 4.36052H25.9812C26.33 4.36042 26.6755 4.42904 26.9978 4.56248C27.3201 4.69591 27.613 4.89154 27.8598 5.13818C28.1065 5.38483 28.3022 5.67767 28.4357 5.99996C28.5692 6.32226 28.638 6.6677 28.638 7.01656V16.5004Z"
                    fill="#A6A6A6"
                  />
                </svg>
              </Tooltip>
            </WalletAddress>
          </Skeleton>
        </HStack>
      </VStack>
      <HStack
        justifyContent={{ base: "flex-start", sm: "end" }}
        alignItems={{ base: "start", sm: "center" }}
        w={{ base: "full", md: "fit-content" }}
      >
        <Tooltip
          openDelay={500}
          variant="cubik"
          label="Deposit Funds"
          fontSize="sm"
        >
          <Button
            size={{ base: "cubikMini", md: "cubikSmall" }}
            variant={"cubikReject"}
            isDisabled
            iconSpacing={{ base: "2px", md: "2px" }}
            rightIcon={
              <Box
                as={HiArrowNarrowDown}
                boxSize={{ base: "14px", md: "18px" }}
                color="#ADB8B6"
              />
            }
          />
        </Tooltip>
        <Tooltip
          openDelay={500}
          variant="cubik"
          label="Withdraw Funds"
          fontSize="sm"
        >
          <Button
            size={{ base: "cubikMini", md: "cubikSmall" }}
            variant={"cubikAccept"}
            isDisabled
            iconSpacing={{ base: "2px", md: "2px" }}
            onClick={onOpen}
            rightIcon={
              <Box
                as={HiArrowNarrowUp}
                boxSize={{ base: "14px", md: "18px" }}
                color="#31F579"
              />
            }
          />
        </Tooltip>
      </HStack>
      <Modal variant={"cubik"} size="md" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack>
              <Box
                as="p"
                textStyle={{ base: "title3", md: "title2" }}
                color="neutral.11"
              >
                Create Transaction
              </Box>
            </HStack>
          </ModalHeader>
          <ModalBody>
            <VStack pt="12px" align={"start"} gap="16px">
              <WithdrawFundsTransactionModal />
              {/* {transactionError && (
                    <Alert status="error" variant="cubik">
                      <AlertIcon />
                      <AlertDescription
                        fontSize={{ base: '10px', md: '11px', xl: '12px' }}
                        lineHeight={{ base: '14px', md: '14px', xl: '16px' }}
                      >
                        {transactionError}
                      </AlertDescription>
                    </Alert>
                  )} */}
            </VStack>
          </ModalBody>
          <ModalFooter display="flex" justifyContent="space-between">
            <Button w="8rem" variant="close_modal" onClick={onClose}>
              Cancel
            </Button>
            <Button
              px="32px"
              variant="apply_for_grant"
              onClick={() => {
                // hello
              }}
              //isLoading={signTransactionLoading}
              loadingText="Confirming"
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default VaultHeader;
