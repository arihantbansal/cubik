"use client";
import { TokenInfo } from "@/types/token";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Stack,
  VStack,
  useToast,
} from "@/utils/chakra";
import { createContributorIx } from "@/utils/contract";
import { connection, web3 } from "@/utils/contract/sdk";
import { tokenList, tokenListType } from "@/utils/helpers/tokenlist";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { createContribution } from "./createContribution";
import { useUser } from "@/app/context/user";
import { AmountInput } from "./AmountInput";
import { env } from "@/env.mjs";
import FlipNumbers from "react-flip-numbers";
import { AmountReceivedPopover } from "./AmountReceivedPopover";
import { createContributionV2 } from "@/utils/contract/program";
import { FailureToast, SuccessToast } from "@/app/components/toasts/Toasts";

export interface DonationFormType {
  amount: number;
  token: tokenListType;
  matchingPoolDonation: number;
  percentage: number;
}
interface Props {
  name: string;
  projectId: string;
  logo: string;
  eventId?: string;
  eventType: "hackathon" | "round" | "preview";
  projectLink: string;
  ownerPublicKey: string;
  userCount: number;
  setDonationSuccessful: Dispatch<SetStateAction<boolean>>;
  multiSig?: string;
}
export const ProjectDonationSimulator = ({
  eventType,
  logo,
  name,
  projectLink,
  eventId,
  ownerPublicKey,
  setDonationSuccessful,
  projectId,
  userCount,
  multiSig,
}: Props) => {
  const [txnError, setTxnError] = useState<string | null>(null);
  const { user } = useUser();
  const toast = useToast();
  const getBalances = async (address: string) => {
    const { data } = await axios.get(
      `https://api.helius.xyz/v0/addresses/${address}/balances?api-key=${env.NEXT_PUBLIC_HELIUS_API_KEY}`
    );
    return data;
  };

  const createContributionMutation = useMutation({
    mutationFn: createContribution,
    mutationKey: ["createContribution"],
    onError: (error) => {
      setTxnError("Trpc returned an error");
      FailureToast({ toast, message: "Donation Failed" });
    },
    onSuccess: () => {
      SuccessToast({ toast, message: "Donation Successful" });
      // updateProjectRaise.mutate({
      //   projectId: projectDetails.id,
      //   projectJoinRoundId: projectJoinRoundId,
      //   roundId: roundId,
      // });
      // utils.project.findOneHackthon.invalidate({
      //   id: projectDetails.id,
      // });
      // utils.contribution.getProjectContributors.invalidate({
      //   projectId: projectDetails.id, // check once if the value is right or not for project Id
      // });
      setDonationSuccessful(true);
    },
  });
  const anchorWallet = useAnchorWallet();
  const {
    handleSubmit,
    setValue,
    getValues,
    control,
    watch,
    register,
    formState: { errors, isSubmitting },
  } = useForm<DonationFormType>({
    defaultValues: {
      amount: 1,
      token: tokenList[0],
      matchingPoolDonation: 10,
    },
  });

  async function onSubmit(_values: any) {
    let sig: string | null = null;
    const balance = await getBalances(
      anchorWallet?.publicKey?.toBase58() as string
    );

    console.log(_values);
    if (
      balance.tokens.find(
        (token: any) =>
          token.mint === "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
      ) &&
      balance.tokens.find(
        (token: any) =>
          token.mint === "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
      ).amount <
        _values.amount * 1000000
    ) {
      return setTxnError("Insufficient balance");
    }
    if (String(_values.token.value).includes("sol")) {
      return;
      // sig = await donateSOL(
      //   name as string,
      //   projectDetails?.owner_publickey,
      //   projectDetails?.projectUserCount,
      //   _values.matchingPoolDonation,
      //   _values.amount,
      //   _values.amount * priceSol, // multiply by 100 because of 2 decimal places
      // );
      // if (!sig) return;
      // createContributionMutation.mutate({
      //   projectId: projectDetails.id,
      //   token: _values.token.value,
      //   totalAmount: _values.amount,
      //   tx: sig as string,
      //   usd: _values.amount * priceSol,
      //   hackathonId: roundId,
      // });
    } else {
      sig = await donateSPL(userCount, _values.amount);
      if (!sig) return;
      createContributionMutation.mutate({
        projectId: projectId,
        isIncluded: true,
        token: _values.token.address,
        totalAmount: _values.amount,
        totalUsdAmount: _values.amount,
        tx: sig as string,
        userId: user?.id as string,
        projectJoinHackathonId: eventId as string,
      });
      //   createContributionMutation.mutate({
      //     projectId: projectDetails.id,
      //     token: _values.token.value,
      //     totalAmount: _values.amount,
      //     tx: sig as string,
      //     usd: _values.amount,
      //     hackathonId: roundId,
      //   });
    }

    // createContributionMutation.mutate({
    //   projectId: projectDetails.id,
    //   roundId: roundId,
    //   split: _values.matchingPoolDonation,
    //   token: _values.token.value,
    //   totalAmount: _values.amount,
    //   usd: _values.amount * priceSol,
    //   tx: sig as string,
    //   userId: user?.id as string,
    //   projectJoinRoundId: projectJoinRoundId,
    // });

    // onOpen();
  }

  const donateSPL = async (
    count: number,
    total: number
  ): Promise<string | null> => {
    try {
      console.log(
        anchorWallet as NodeWallet,
        total * 1000000,
        0,
        eventId || "asdf",
        count,
        "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        ownerPublicKey,
        multiSig
      );
      const [ix, ix2, ix3] = await createContributionV2(
        anchorWallet as NodeWallet,
        total * 1000000,
        0,
        ownerPublicKey,
        "asd" || "asdf",
        count,
        "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
      );
      const tx = new web3.Transaction();
      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      tx.feePayer = anchorWallet?.publicKey as web3.PublicKey;

      if (ix2) {
        tx.add(ix2!);
      }
      if (ix3) {
        tx.add(ix3!);
      }

      tx.add(ix!);

      const signed = await anchorWallet?.signTransaction(tx);
      const txid = await connection.sendRawTransaction(signed!.serialize(), {
        skipPreflight: true,
      });
      console.log(txid);
      return txid;
    } catch (error: any) {
      setTxnError(error.message || "There was some error");
      return null;
    }
  };
  const selectedToken = watch("token");

  const setDonationAndAmount = (donation: number) => {
    if (selectedToken.name === "Solana") {
      setValue("amount", donation * 22);
    } else if (selectedToken.name === "USDC") {
      setValue("amount", donation);
    } else {
      setValue("amount", 0);
    }
  };

  return (
    <>
      <Stack
        w={{ base: "22rem", sm: "22rem", md: "26rem" }}
        gap="40px"
        h="full"
        direction={"row"}
        overflow={"hidden"}
        maxW="98vw"
        mx="auto"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            width: "full",
            height: "100%",
            display: "flex",
            gap: "80px",
            flex: "1",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <VStack w="full" gap="32px">
            <FormControl isInvalid={Boolean(errors.amount)}>
              <FormLabel
                pb="12px"
                htmlFor="name"
                textStyle={{ base: "body6", md: "title4" }}
                color="neutral.11"
              >
                Enter Donation Amount
              </FormLabel>
              <HStack>
                <AmountInput
                  seletedToken={selectedToken.name}
                  value={watch("amount")}
                  setValue={setDonationAndAmount}
                  register={register}
                  errors={errors}
                  token={tokenList}
                  control={control}
                />
              </HStack>
              <FormErrorMessage textStyle={{ base: "body5", md: "body4" }}>
                <>{errors.amount && errors.amount.message}</>
              </FormErrorMessage>
              {/* <WalletBalanceError selectedToken={selectedToken} data={data} /> */}
            </FormControl>
            {/* <FormControl>
            <HStack pb="10px" spacing="0" align={'top'} justify="start">
              <FormLabel
                textStyle={{ base: 'body6', md: 'title4' }}
                color="neutral.11"
                htmlFor="donation_to_matching_pool"
                mr="8px"
              >
                Donate to Cubik Matching Pool
              </FormLabel>
              <Center h="fit-content">
                <CubikMatchingPoolDonationPopover />
              </Center>
            </HStack>
            <HStack gap="0.1rem">
              {Array.from([0, 10, 15, 30]).map((percentage, key) => {
                return (
                  <VStack
                    cursor="pointer"
                    key={key}
                    backgroundColor={
                      watch('matchingPoolDonation') === percentage ? '#14665B' : '#242424'
                    }
                    _hover={{ outline: '1px solid #3E3E3E' }}
                    outline={
                      watch('matchingPoolDonation') === percentage
                        ? '1px solid #E0FFFD16'
                        : '1px solid #242424'
                    }
                    rounded="8px"
                    w="full"
                    h={{ base: '2.2rem', md: '2.5rem' }}
                    align={'center'}
                    justify="center"
                    onClick={() => {
                      setValue('matchingPoolDonation', percentage);
                    }}
                  >
                    <Box as="p" textStyle={{ base: 'body5', md: 'body4' }} color="#E0FFFD">
                      {percentage}%
                    </Box>
                    {percentage === 10 ? (
                      <Box
                        position={'absolute'}
                        bottom="-15%"
                        bg="red"
                        rounded="full"
                        as="p"
                        fontSize={{ base: '8px', md: '10px' }}
                        p={{ base: '2px 6px', md: '2px 8px' }}
                        fontWeight={'500'}
                        color="#14665B"
                        background="#E0FFFD"
                        textTransform={'uppercase'}
                      >
                        Popular
                      </Box>
                    ) : (
                      ''
                    )}
                  </VStack>
                );
              })}
            </HStack>
            <FormErrorMessage>
              {errors.matchingPoolDonation ? <>{errors.matchingPoolDonation.message}</> : <></>}
            </FormErrorMessage>
          </FormControl> */}
          </VStack>
          <VStack w="full" gap="16px">
            <VStack w="full" align="center" gap="8px">
              <HStack w="full" justify={"space-between"}>
                <HStack>
                  <Box as="p" textStyle={"body4"}>
                    Final Amount Received
                  </Box>
                  <AmountReceivedPopover />
                </HStack>
                <Center color="#A8F0E6" fontWeight="700">
                  <FlipNumbers
                    height={20}
                    width={13}
                    color="#A8F0E6"
                    play
                    perspective={700}
                    numbers={"$0"}
                  />
                </Center>
              </HStack>
            </VStack>
            {txnError && (
              <Alert status="error" variant="cubik">
                <AlertIcon />
                <AlertDescription
                  fontSize={{ base: "10px", md: "11px", xl: "12px" }}
                  lineHeight={{ base: "14px", md: "14px", xl: "16px" }}
                >
                  {txnError}
                </AlertDescription>
              </Alert>
            )}
            <Button
              variant={"cubikFilled"}
              w="full"
              height="44px"
              mt={4}
              colorScheme="teal"
              isLoading={isSubmitting || createContributionMutation.isLoading}
              loadingText="Confirming Transaction"
              type="submit"
            >
              Donate with wallet
            </Button>
          </VStack>
        </form>
        {/* <Graph
        width={width}
        height={height}
        maximumDonationValue={1000}
        donationAmount={donation}
        setValue={setValue}
        projectId={projectDetails.id}
      /> */}
      </Stack>
    </>
  );
};
