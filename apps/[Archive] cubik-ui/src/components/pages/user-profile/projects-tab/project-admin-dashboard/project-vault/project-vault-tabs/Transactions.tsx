import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  HStack,
  Skeleton,
  Stack,
  VStack,
} from "@chakra-ui/react";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { TransactionAccount } from "@sqds/sdk";
import { HiArrowNarrowUp } from "react-icons/hi";
import NoInformation from "~/components/common/empty-state/NoInformation";
import { SOL, USDC } from "~/components/common/tokens/token";
import { TruncatedAddr } from "~/components/common/wallet/WalletAdd";
import { useErrorBoundary } from "~/hooks/useErrorBoundary";
import { formatNumberWithK } from "~/utils/formatWithK";
import { VaultTx, approveTxVault, exceuteTxVault } from "~/utils/vault";
import * as anchor from "@coral-xyz/anchor";
import { connection } from "~/utils/program/contract";
import { Dispatch, SetStateAction, useState } from "react";
import {
  decodeInstruction,
  decodeSyncNativeInstruction,
  decodeTransferInstruction,
} from "@solana/spl-token";
import { Message, SystemProgram, VersionedMessage } from "@solana/web3.js";
{
  /* <NoInformation /> */
}

interface Props {
  tx: VaultTx;
  wallet: string;
  ms: string;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  usdcAmount: string | number;
}
const MultisigTransactions = (props: Props) => {
  const { ErrorBoundaryWrapper } = useErrorBoundary();
  const isLoading = false;
  const [loading, setLoading] = useState<boolean>(false);
  const anchorWallet = useAnchorWallet();

  const handleConfirm = async () => {
    try {
      setLoading(true);
      if (props.tx.tx.status.active) {
        await approveTxVault(
          anchorWallet as NodeWallet,
          new anchor.web3.PublicKey(props.ms),
          props.tx.tx.transactionIndex
        );
      } else if (props.tx.tx.status.executeReady) {
        await exceuteTxVault(anchorWallet as NodeWallet, props.tx.tx.publicKey);
      } else {
        return;
      }
      props.setUpdate((prev) => !prev);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Accordion
      w="full"
      display={"flex"}
      flexDir={"column"}
      gap={{ base: "16px", md: "24px" }}
      allowMultiple
      allowToggle
      variant={"unstyled"}
    >
      <ErrorBoundaryWrapper>
        <Skeleton
          isLoaded={!isLoading}
          fadeDuration={2.5}
          opacity={isLoading ? 0.5 : 1}
          w="full"
        >
          <AccordionItem
            overflow={"scroll"}
            w="full"
            outline="none"
            border="none"
          >
            <AccordionButton
              borderRadius="12px"
              backgroundColor={"neutral.2"}
              p="18px"
              _expanded={{
                backgroundColor: "neutral.3",
                borderBottomLeftRadius: "0px",
                borderBottomRightRadius: "0px",
              }}
              _hover={{
                backgroundColor: "neutral.3",
              }}
              w="full"
            >
              <HStack w="full" justify={"space-between"}>
                <HStack spacing="16px">
                  <Button
                    size={{ base: "cubikMini", md: "cubikSmall" }}
                    variant={"cubikAccept"}
                    isDisabled
                    iconSpacing={{ base: "2px", md: "2px" }}
                    //onClick={onOpen}
                    rightIcon={
                      <Box
                        as={HiArrowNarrowUp}
                        boxSize={{ base: "14px", md: "18px" }}
                        color="#31F579"
                      />
                    }
                  />
                  <VStack align="start" justify="center" spacing="4px">
                    <Box
                      as="p"
                      textStyle={{ base: "title5", md: "title4" }}
                      color="neutral.11"
                    >
                      Send
                    </Box>
                    <Box
                      as="p"
                      textStyle={{ base: "body6", md: "body5" }}
                      color="neutral.7"
                    >
                      Type
                    </Box>
                  </VStack>
                </HStack>
                <HStack gap="8px" align={"center"}>
                  <VStack align="start" justify="center" spacing="4px">
                    <HStack align={"baseline"} color="white">
                      {/* <Box
                        as="p"
                        textStyle={{ base: 'title5', md: 'title4' }}
                        color="neutral.11"
                      >
                        {typeof props.usdcAmount === 'string'
                          ? props.usdcAmount
                          : formatNumberWithK(props.usdcAmount)}
                      </Box>*/}
                      <Box
                        as="p"
                        textStyle={{ base: "title5", md: "title4" }}
                        color="neutral.11"
                      >
                        2
                      </Box>
                    </HStack>
                    <Box
                      as="p"
                      textStyle={{ base: "body4", md: "body5" }}
                      color="neutral.7"
                    >
                      Assets
                    </Box>
                  </VStack>
                </HStack>
                <VStack align="start" justify="center" spacing="4px">
                  <Box
                    as="p"
                    textStyle={{ base: "title5", md: "title4" }}
                    color="neutral.11"
                  >
                    {TruncatedAddr({
                      walletAddress:
                        anchorWallet?.publicKey.toBase58() as string,
                    })}
                  </Box>
                  <Box
                    as="p"
                    textStyle={{ base: "body4", md: "body5" }}
                    color="neutral.7"
                  >
                    Recipient Address
                  </Box>
                </VStack>
                <HStack
                  w="full"
                  maxW="12rem"
                  align="end"
                  justify="end"
                  spacing="16px"
                >
                  <VStack align="end" justify="center" spacing="4px">
                    {props.tx.tx.status.rejected && (
                      <>
                        <Box
                          as="p"
                          textStyle={{ base: "title5", md: "title4" }}
                          color="surface.red.2"
                        >
                          Rejected
                        </Box>
                      </>
                    )}
                    {props.tx.tx.status.executed && (
                      <>
                        <Box
                          as="p"
                          textStyle={{ base: "title5", md: "title4" }}
                          color="surface.green.2"
                        >
                          Executed
                        </Box>
                      </>
                    )}
                    {props.tx.tx.status.active && (
                      <>
                        <Box
                          as="p"
                          textStyle={{ base: "title5", md: "title4" }}
                          color="surface.teal.2"
                        >
                          Active
                        </Box>
                      </>
                    )}
                    {props.tx.tx.status.executeReady && (
                      <>
                        <Box
                          as="p"
                          textStyle={{ base: "title5", md: "title4" }}
                          color="surface.yellow.2"
                        >
                          Ready
                        </Box>
                      </>
                    )}

                    <Box
                      as="p"
                      textStyle={{ base: "body4", md: "body5" }}
                      color="neutral.7"
                    >
                      Status
                    </Box>
                  </VStack>
                  <Center p="8px">
                    <AccordionIcon display={{ base: "none", md: "block" }} />
                  </Center>
                </HStack>
              </HStack>
            </AccordionButton>
            <AccordionPanel
              backgroundColor={"neutral.3"}
              borderBottomRightRadius={"12px"}
              borderBottomLeftRadius={"12px"}
            >
              <Stack
                gap={{ base: "64px", sm: "72px", md: "32px" }}
                padding={{
                  base: "0px",
                  sm: "4px",
                  md: "16px",
                }}
                direction={{ base: "column", lg: "row" }}
              >
                <VStack
                  border="1px solid "
                  borderColor="neutral.5"
                  p="32px"
                  rounded="12px"
                  flex={"50%"}
                  align={"start"}
                  width="full"
                  spacing={{ base: "12px", sm: "16px", md: "18px" }}
                >
                  <Box
                    as="p"
                    textStyle={{ base: "body4", md: "body3" }}
                    color={"neutral.11"}
                  >
                    Info
                  </Box>
                  <VStack w="full">
                    <HStack justify={"space-between"} w="full">
                      <Box
                        as="p"
                        textStyle={{ base: "body5", md: "body4" }}
                        color={"neutral.8"}
                      >
                        Author
                      </Box>
                      <Box
                        as="p"
                        textStyle={{ base: "title5", md: "title4" }}
                        color="neutral.11"
                      >
                        {TruncatedAddr({
                          walletAddress: props.tx.tx.creator.toBase58(),
                        })}
                      </Box>
                    </HStack>
                    <HStack justify={"space-between"} w="full">
                      <Box
                        as="p"
                        textStyle={{ base: "body5", md: "body4" }}
                        color={"neutral.8"}
                      >
                        Created on
                      </Box>
                      <Box
                        as="p"
                        textStyle={{ base: "title5", md: "title4" }}
                        color="neutral.11"
                      >
                        Jul2, 2023, 10:02 PM
                      </Box>
                    </HStack>
                    <HStack justify={"space-between"} w="full">
                      <Box
                        as="p"
                        textStyle={{ base: "body5", md: "body4" }}
                        color={"neutral.8"}
                      >
                        Executed on
                      </Box>
                      <Box
                        as="p"
                        textStyle={{ base: "title5", md: "title4" }}
                        color="neutral.11"
                      >
                        n/a
                      </Box>
                    </HStack>
                    <HStack justify={"space-between"} w="full">
                      <Box
                        as="p"
                        textStyle={{ base: "body5", md: "body4" }}
                        color={"neutral.8"}
                      >
                        Transaction Link
                      </Box>
                      <Box
                        as="p"
                        textStyle={{ base: "title5", md: "title4" }}
                        color="neutral.11"
                      >
                        n/a
                      </Box>
                    </HStack>
                  </VStack>
                </VStack>
                <VStack
                  border="1px solid "
                  borderColor="neutral.5"
                  p="32px"
                  rounded="12px"
                  flex={"50%"}
                  align={"start"}
                  width="full"
                  justify={"space-between"}
                  spacing={{ base: "12px", sm: "16px", md: "18px" }}
                >
                  <Box
                    as="p"
                    textStyle={{ base: "body4", md: "body3" }}
                    color={"neutral.11"}
                  >
                    Results
                  </Box>
                  <HStack justify={"space-around"} spacing="32px" w="full">
                    <VStack justify={"space-between"} align="end">
                      <Box
                        as="p"
                        textStyle={{ base: "body5", md: "body4" }}
                        color={"neutral.8"}
                      >
                        Confirmed
                      </Box>
                      <Box
                        as="p"
                        textStyle={{ base: "title3", md: "title2" }}
                        color="surface.green.2"
                      >
                        {props.tx.tx.approved.length || 0}
                      </Box>
                    </VStack>
                    <VStack justify={"space-between"} align="end">
                      <Box
                        as="p"
                        textStyle={{ base: "body5", md: "body4" }}
                        color={"neutral.8"}
                      >
                        Rejected
                      </Box>
                      <Box
                        as="p"
                        textStyle={{ base: "title3", md: "title2" }}
                        color="surface.red.2"
                      >
                        {props.tx.tx.rejected.length || 0}
                      </Box>
                    </VStack>
                    <VStack justify={"space-between"} align="end">
                      <Box
                        as="p"
                        textStyle={{ base: "body5", md: "body4" }}
                        color={"neutral.8"}
                      >
                        Threshold
                      </Box>
                      <Box
                        as="p"
                        textStyle={{ base: "title3", md: "title2" }}
                        color="neutral.11"
                      >
                        2/2
                      </Box>
                    </VStack>
                  </HStack>
                  {props.tx.tx.status.executed && (
                    <>
                      <HStack justify={"space-between"} w="full">
                        <Button
                          w="full"
                          variant={"cubikFilled"}
                          isDisabled
                          disabled={true}
                        >
                          Executed
                        </Button>
                      </HStack>
                    </>
                  )}
                  {props.tx.tx.status.executeReady && (
                    <HStack justify={"space-between"} w="full">
                      <Button
                        isDisabled
                        disabled
                        w="full"
                        variant="cubikOutlined"
                      >
                        Reject
                      </Button>
                      <Button
                        onClick={handleConfirm}
                        w="full"
                        variant={"cubikFilled"}
                        isLoading={loading}
                      >
                        {props.tx.tx.status.active && "Confirm"}
                        {props.tx.tx.status.executeReady && "Execute"}
                      </Button>
                    </HStack>
                  )}
                  {props.tx.tx.status.active ? (
                    <>
                      <HStack justify={"space-between"} w="full">
                        <Button
                          isDisabled
                          disabled
                          w="full"
                          variant="cubikOutlined"
                        >
                          Reject
                        </Button>
                        <Button
                          onClick={handleConfirm}
                          w="full"
                          variant={"cubikFilled"}
                          isLoading={
                            props.tx.tx.approved.find(
                              (e) =>
                                e.toBase58() ===
                                anchorWallet?.publicKey.toBase58()
                            )
                              ? true
                              : loading
                          }
                          loadingText={"Waiting to confirm"}
                        >
                          {props.tx.tx.status.active && "Confirm"}
                          {props.tx.tx.status.executeReady && "Execute"}
                        </Button>
                      </HStack>
                    </>
                  ) : (
                    <></>
                  )}
                </VStack>
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        </Skeleton>
      </ErrorBoundaryWrapper>
    </Accordion>
  );
};

export default MultisigTransactions;
