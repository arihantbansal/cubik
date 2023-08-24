"use client";
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
  Text,
  VStack,
  useToast,
} from "@/utils/chakra";
import { connection, web3 } from "@/utils/contract/sdk";
import { tokenList, tokenListType } from "@/utils/helpers/tokenlist";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useMutation, useQuery } from "@tanstack/react-query";
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
import { EstimateUpdate, checkProofs, updateData } from "./Qf";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

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
  const router = useRouter();
  const pathname = usePathname();
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
      console.log(error);
      setTxnError("Error");
      FailureToast({ toast, message: "Donation Failed" });
    },
    onSuccess: async () => {
      SuccessToast({ toast, message: "Donation Successful" });
      await updateData(eventId as string, "hackathon");
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
      // router.refresh();
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
  const proofCount = useQuery({
    enabled: Boolean(user?.id),
    queryKey: ["proofCount", user?.id],
    queryFn: () => checkProofs(user?.id as string),
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

    if (balance.native) {
      return setTxnError("Insufficient balance SOL");
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
        isIncluded: proofCount.data! > 1 ? true : false,
        token: _values.token.address,
        totalAmount: _values.amount,
        totalUsdAmount: _values.amount,
        tx: sig as string,
        userId: user?.id as string,
        hackathonId: eventId as string,
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
      const txid = await connection.sendRawTransaction(signed!.serialize());
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

  const estimateQuery = useQuery({
    enabled: watch("amount") > 0 && Boolean(user?.id),
    queryKey: ["estimate"],
    queryFn: () =>
      EstimateUpdate({
        amount: watch("amount"),
        eventId: eventId as string,
        projectId: projectId,
        user: user?.id as string,
        eventType: "hackathon",
      }),
  });
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

            <Box>
              {proofCount.data && proofCount.data > 1 ? (
                <></>
              ) : (
                <HStack p="16px" rounded="12px" gap="12px" bg="#33000260">
                  <Center p="8px" bg="#330002" rounded="full">
                    <Center>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M8.17504 0.00189399C7.01107 -0.0234371 5.85561 0.205589 4.78931 0.672984C3.72301 1.14038 2.77157 1.83488 2.00142 2.70799C1.23128 3.58111 0.660983 4.61179 0.330353 5.7281C-0.000276148 6.84441 -0.0832716 8.01942 0.0871616 9.17112C0.257595 10.3228 0.677349 11.4234 1.31712 12.3961C1.95689 13.3688 2.80126 14.1902 3.79127 14.8028C4.78128 15.4155 5.89309 15.8046 7.04905 15.9432C8.20502 16.0817 9.3773 15.9663 10.484 15.6049C10.6731 15.5431 10.8299 15.4087 10.92 15.2313C11.01 15.0539 11.0258 14.848 10.964 14.6589C10.9022 14.4698 10.7679 14.313 10.5904 14.223C10.413 14.133 10.2071 14.1171 10.018 14.1789C8.81534 14.5716 7.52418 14.6048 6.3029 14.2744C5.08162 13.944 3.98331 13.2643 3.14268 12.3188C2.30204 11.3733 1.75562 10.2029 1.57043 8.95139C1.38524 7.69983 1.56933 6.42143 2.10012 5.27297C2.63092 4.12451 3.48534 3.15592 4.5586 2.48599C5.63187 1.81606 6.87731 1.47391 8.1422 1.50151C9.40709 1.5291 10.6364 1.92524 11.6794 2.64134C12.7225 3.35745 13.5338 4.36238 14.014 5.53289C14.0895 5.71695 14.235 5.8635 14.4185 5.9403C14.5093 5.97832 14.6068 5.99808 14.7053 5.99844C14.8038 5.9988 14.9014 5.97976 14.9925 5.94239C15.0837 5.90503 15.1666 5.85009 15.2365 5.78069C15.3064 5.7113 15.3619 5.62882 15.3999 5.53795C15.438 5.44709 15.4577 5.34963 15.4581 5.25113C15.4584 5.15264 15.4394 5.05503 15.402 4.96389C14.8111 3.52319 13.8125 2.28627 12.5287 1.40486C11.245 0.523449 9.73188 0.0358595 8.17504 0.00189399ZM8.75004 3.74989C8.75004 3.55098 8.67102 3.36022 8.53037 3.21956C8.38972 3.07891 8.19895 2.99989 8.00004 2.99989C7.80113 2.99989 7.61036 3.07891 7.46971 3.21956C7.32906 3.36022 7.25004 3.55098 7.25004 3.74989V7.68989L5.21604 9.72289C5.14235 9.79156 5.08325 9.87436 5.04226 9.96636C5.00126 10.0584 4.97922 10.1577 4.97745 10.2584C4.97567 10.3591 4.99419 10.4591 5.03192 10.5525C5.06964 10.6459 5.12578 10.7307 5.197 10.8019C5.26822 10.8732 5.35305 10.9293 5.44644 10.967C5.53983 11.0047 5.63986 11.0233 5.74056 11.0215C5.84126 11.0197 5.94058 10.9977 6.03258 10.9567C6.12457 10.9157 6.20738 10.8566 6.27604 10.7829L8.53004 8.52989L8.75004 8.30989V3.74989ZM15 14.9999C15 15.2651 14.8947 15.5195 14.7071 15.707C14.5196 15.8945 14.2653 15.9999 14 15.9999C13.7348 15.9999 13.4805 15.8945 13.2929 15.707C13.1054 15.5195 13 15.2651 13 14.9999C13 14.7347 13.1054 14.4803 13.2929 14.2928C13.4805 14.1053 13.7348 13.9999 14 13.9999C14.2653 13.9999 14.5196 14.1053 14.7071 14.2928C14.8947 14.4803 15 14.7347 15 14.9999ZM14.75 8.74989C14.75 8.55098 14.671 8.36022 14.5304 8.21956C14.3897 8.07891 14.199 7.99989 14 7.99989C13.8011 7.99989 13.6104 8.07891 13.4697 8.21956C13.3291 8.36022 13.25 8.55098 13.25 8.74989V12.2499C13.25 12.4488 13.3291 12.6396 13.4697 12.7802C13.6104 12.9209 13.8011 12.9999 14 12.9999C14.199 12.9999 14.3897 12.9209 14.5304 12.7802C14.671 12.6396 14.75 12.4488 14.75 12.2499V8.74989Z"
                          fill="#FF333D"
                        />
                      </svg>
                    </Center>
                  </Center>{" "}
                  <Box
                    as={"p"}
                    textStyle={"body5"}
                    color="white"
                    textAlign={"start"}
                  >
                    You Don't have any proof claim and your funds will might not
                    get matched by Cubik Matching Pool{"  "}
                    <Link
                      href={`/${user?.username as string}`}
                      target="_blank"
                      style={{ textDecoration: "underline", marginLeft: "5px" }}
                    >
                      Claim Proofs
                    </Link>
                  </Box>
                </HStack>
              )}
            </Box>

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
                    numbers={
                      estimateQuery.data
                        ? "$" + (estimateQuery.data?.toFixed(2) as string)
                        : "$0"
                    }
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
