"use client";
import { WalletAddress } from "@/app/components/common/wallet";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  CardBody,
  CardFooter,
  Center,
  Collapse,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  VStack,
  useDisclosure,
} from "@/utils/chakra";
import { Controller, useForm } from "react-hook-form";
import { HiCheck } from "react-icons/hi";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema } from "@/utils/schema/user";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import ProfilePicture from "./ProfilePicture";
import FramerCarousel from "./FramerCarousel";
import { prisma } from "@cubik/database";
import { createUserIx } from "@/utils/contract";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { connection, web3 } from "@/utils/contract/sdk";
import { TransactionModel } from "./TransactionModel";
import { NFTProfile } from "@/types/NFTProfile";
export const Form = () => {
  const [userNameIsAvailable, setUserNameIsAvailable] =
    useState<boolean>(false);

  const [loadingUserName, setLoadingUserName] = useState<boolean>(false);
  const [transactionError, setTransactionError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profileCreated, setProfileCreated] = useState(false);
  const [profileNFT, setProfileNFT] = useState<NFTProfile | undefined>(
    undefined
  );
  // const [signingTransaction, setSigningTransaction] = useState(false);
  const { publicKey } = useWallet();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { setVisible } = useWalletModal();
  const anchorWallet = useAnchorWallet();
  const [pfp, setPFP] = useState<string>(
    `https://source.boringavatars.com/marble/120/${publicKey?.toBase58()}?square&?colors=05299E,5E4AE3,947BD3,F0A7A0,F26CA7,FFFFFF,CAF0F8,CCA43B`
  );
  const {
    handleSubmit,
    trigger,
    control,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createUserSchema),
  });
  const {
    isOpen: transactionIsOpen,
    onClose: transactionOnClose,
    onOpen: transactionOnOpen,
  } = useDisclosure();

  const handleTx = async (): Promise<string | null> => {
    try {
      const ix = await createUserIx(
        anchorWallet as NodeWallet,
        getValues("username")
      );

      const tx = new web3.Transaction();
      const { blockhash } = await connection.getLatestBlockhash();
      tx.add(ix);
      tx.recentBlockhash = blockhash;
      tx.feePayer = publicKey as web3.PublicKey;

      const signed = await anchorWallet?.signTransaction(tx);

      const txid = await connection.sendRawTransaction(signed?.serialize()!);
      setIsLoading(false);
      return txid;
    } catch (error) {
      const e = error as Error;
      setTransactionError(e.message);
      console.log(error);
      return null;
    }
  };
  const onSubmit = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const txId = await handleTx();
      if (!txId) return;
      await prisma.user.update({
        where: {
          mainWallet: publicKey?.toBase58(),
        },
        data: {
          username: getValues("username"),
          profilePicture: pfp,
          profileNft: profileNFT,
          tx: txId,
        },
      });
      setProfileCreated(true);
      setIsLoading(false);

      return;
    } catch (error) {
      console.log(error);
      setProfileCreated(false);
      setIsLoading(false);

      return;
    }
  };
  return (
    <>
      {transactionIsOpen && (
        <TransactionModel
          isTransactionModalOpen={transactionIsOpen}
          onTransactionModalClose={transactionOnClose}
          pfp={pfp}
          setIsLoading={setIsLoading}
          profileCreated={profileCreated}
          setTransactionError={setTransactionError}
          signingTransaction={isLoading}
          transactionError={transactionError}
          userName={getValues("username")}
          handleTx={onSubmit}
        />
      )}

      <CardBody>
        <form
          style={{
            gap: "32px",
            display: "flex",
            flexDirection: "column",
          }}
          onSubmit={handleSubmit(() => transactionOnOpen())}
        >
          <FormControl w="full" variant={"outline"} colorScheme={"pink"}>
            <FormLabel
              fontSize={{ base: "xs", md: "sm" }}
              htmlFor="profilePicture"
            >
              Profile Picture
            </FormLabel>
            <ProfilePicture
              onOpen={onOpen}
              onClose={onClose}
              isOpen={isOpen}
              pfp={pfp}
            />
          </FormControl>
          <Collapse in={isOpen} animateOpacity>
            <FramerCarousel
              setNFTProfile={setProfileNFT}
              onClose={onClose}
              setPFP={setPFP}
              PFP={pfp}
            />
          </Collapse>
          <FormControl
            variant={"outline"}
            colorScheme={"pink"}
            isInvalid={!!errors.username}
            isRequired
          >
            <FormLabel fontSize={{ base: "xs", md: "sm" }} htmlFor="username">
              Username
            </FormLabel>

            <InputGroup>
              <Controller
                name="username"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, ...field } }: { field: any }) => (
                  <Input
                    {...field}
                    autoComplete="false"
                    placeholder="@username"
                    aria-autocomplete="none"
                    onChange={({ target: { value } }) => {
                      setUserNameIsAvailable(false);
                      onChange(value);
                      if (value.length > 3)
                        trigger("username")
                          .then((res: boolean) => {
                            if (res) {
                              setUserNameIsAvailable(true);
                            }
                          })
                          .catch(
                            (e: any) =>
                              new Error(e.message || "there was an error")
                          );
                    }}
                  />
                )}
              />
              {
                <InputRightElement fontSize="18px">
                  {loadingUserName && <Spinner size={"xs"} thickness="1px" />}
                  {!errors.username && userNameIsAvailable && (
                    <HiCheck color={"#A8F0E6"} />
                  )}
                </InputRightElement>
              }
            </InputGroup>
            {errors.username ? (
              <FormErrorMessage textAlign={"start"}>
                {errors.username && <>{errors.username.message}</>}
              </FormErrorMessage>
            ) : (
              <FormHelperText
                fontSize={{ base: "12px", md: "14px" }}
                color="neutral.6"
              >
                Username can&apos;t be changed.
              </FormHelperText>
            )}
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize={{ base: "xs", md: "sm" }} htmlFor="publickey">
              Wallet Address
            </FormLabel>
            <HStack>
              <Center
                rounded="4px"
                backgroundColor="#0F0F0F"
                height="2.5rem"
                px="1.3rem"
                outline="1px solid #141414"
                w="full"
                m="0"
              >
                <WalletAddress
                  walletAddress={publicKey?.toBase58() as string}
                  size="xs"
                />
              </Center>
              <Button
                variant={"unstyled"}
                border="1px solid #A8F0E630"
                w="10rem"
                lineHeight={{ base: "14px", md: "16px" }}
                fontSize={"14px"}
                fontWeight="400"
                background="#A8F0E610"
                color="#A8F0E6"
                height="2.5rem"
                _hover={{
                  background: "#A8F0E630",
                }}
                onClick={() => {
                  setVisible(true);
                }}
              >
                Change
              </Button>
            </HStack>
            <FormErrorMessage>
              {errors.publickey ? <>{errors.publickey.message}</> : <></>}
            </FormErrorMessage>
          </FormControl>
          <VStack
            p="0"
            pt={{ base: "24px", md: "56px" }}
            w="full"
            align={"start"}
            justify="start"
            gap={{ base: "8px", md: "18px" }}
          >
            {" "}
            <CardFooter>
              <Button
                w="full"
                size={{ base: "cubikMini", md: "cubikSmall" }}
                variant="cubikFilled"
                loadingText="Submitting"
                type="submit"
                isDisabled={!userNameIsAvailable}
              >
                Submit Profile
              </Button>
            </CardFooter>
            <Alert status="info" variant="cubik">
              <AlertIcon />
              <AlertDescription
                fontSize={{ base: "10px", md: "11px", xl: "12px" }}
                lineHeight={{ base: "14px", md: "14px", xl: "16px" }}
              >
                By clicking submit, you&apos;ll initiate a profile creation
                transaction from connected wallet. Ensure you have enough SOL to
                sign the transaction.
              </AlertDescription>
            </Alert>
          </VStack>
        </form>
      </CardBody>
    </>
  );
};
