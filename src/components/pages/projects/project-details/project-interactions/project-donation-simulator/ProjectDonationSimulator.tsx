import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Stack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import * as anchor from '@coral-xyz/anchor';
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import FlipNumbers from 'react-flip-numbers';
import { Controller, useForm } from 'react-hook-form';
import { ControlledSelect } from '~/components/common/select/ControlledSelect';
import { tokens } from '~/components/common/tokens/DonationTokens';
import { DonationFormType } from '~/interfaces/donationForm';
import { tokenGroup } from '~/interfaces/token';
import { ProjectWithCommentsAndRoundsType } from '~/types/IProjectDetails';
import {
  connection,
  contributeSOL,
  contributeSPL,
} from '~/utils/program/contract';
import { trpc } from '~/utils/trpc';
import Graph from './Graph';

type ProjectDonationSimulatorProps = {
  projectDetails: ProjectWithCommentsAndRoundsType;
  height: number;
  width: number;
};

export const token: tokenGroup[] = tokens;

export const ProjectDonationSimulator = ({
  projectDetails,
  height,
  width,
}: ProjectDonationSimulatorProps) => {
  const [donation, setDonation] = useState<number>(50);
  const { data } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const createContributionMutation = trpc.contribution.create.useMutation();
  const anchorWallet = useAnchorWallet();
  const {
    handleSubmit,
    setValue,
    getValues,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<DonationFormType>({
    defaultValues: {
      amount: donation,
      token: token[0].value,
      matchingPoolDonation: 10,
    },
  });

  useEffect(() => {
    // use api to convert this and add this
    const token = getValues('token');
    if (token === 'sol') {
      setValue('amount', donation * 22);
    } else if (token === 'usdc') {
      setValue('amount', donation);
    } else if (token === 'bonk') {
      setValue('amount', donation * 0.00000005);
    } else {
      setValue('amount', 0);
    }
  }, [donation, getValues, setValue]);

  async function onSubmit(_values: any) {
    console.log(donation, '-----------');
    let sig: string | null = null;
    if (String(_values.token.value).toLocaleLowerCase() === 'sol') {
      sig = await donateSOL(
        projectDetails?.ProjectJoinRound.find((e) => e.status === 'APPROVED')
          ?.fundingRound.roundName as string,
        projectDetails?.owner_publickey,
        projectDetails?.projectUserCount,
        _values.matchingPoolDonation,
        donation,
        _values.amount // usd value
      );
    } else {
      sig = await donateSPL(
        projectDetails?.ProjectJoinRound.find((e) => e.status === 'APPROVED')
          ?.fundingRound.roundName as string,
        '',
        projectDetails?.owner_publickey,
        projectDetails?.projectUserCount,
        _values.matchingPoolDonation,
        donation,
        _values.amount // usd value
      );
    }
    if (sig) return; /// tx is stuck in pending
    createContributionMutation.mutate({
      projectId: projectDetails.id,
      roundId: projectDetails?.ProjectJoinRound.find(
        (e) => e.status === 'APPROVED'
      )?.fundingRound.id as string,
      split: _values.matchingPoolDonation,
      token: _values.token.value,
      totalAmount: donation,
      usd: _values.amount,
      tx: sig as string,
      userId: data?.user?.id as string,
    });
    // onOpen();
  }

  const donateSPL = async (
    roundId: string,
    token: string,
    owner: string,
    count: number,
    split: number,
    total: number,
    usd: number
  ): Promise<string | null> => {
    const ix = await contributeSPL(
      anchorWallet as NodeWallet,
      roundId,
      token,
      owner,
      count, // project count
      split, // split
      total, // total
      usd // usd value
    );
    const tx = new anchor.web3.Transaction();
    const { blockhash } = await connection.getLatestBlockhash();
    tx.recentBlockhash = blockhash;
    tx.feePayer = anchorWallet?.publicKey as anchor.web3.PublicKey;
    tx.add(ix!);
    const signed = await anchorWallet?.signTransaction(tx);
    const txid = await connection.sendRawTransaction(signed!.serialize());

    return txid;
  };
  const donateSOL = async (
    roundId: string,
    owner: string,
    count: number,
    split: number,
    total: number,
    usd: number
  ): Promise<string | null> => {
    const ix = await contributeSOL(
      anchorWallet as NodeWallet,
      roundId,
      owner,
      count, // project count
      split,
      total,
      usd
    );
    const tx = new anchor.web3.Transaction();
    const { blockhash } = await connection.getLatestBlockhash();
    tx.recentBlockhash = blockhash;
    tx.feePayer = anchorWallet?.publicKey as anchor.web3.PublicKey;
    tx.add(ix!);
    const signed = await anchorWallet?.signTransaction(tx);
    const txid = await connection.sendRawTransaction(signed!.serialize());

    return txid;
  };

  return (
    <Stack gap="40px" direction={'row'}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: '30rem',
          height: '100%',
          display: 'flex',
          flex: '1',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <VStack w="full" gap="32px">
          <FormControl gap="16px" isInvalid={Boolean(errors.amount)}>
            <FormLabel
              htmlFor="name"
              textStyle={{ base: 'title5', md: 'title4' }}
              color="neutral.11"
            >
              Enter Donation Amount
            </FormLabel>
            <HStack>
              <InputGroup border="1px solid #141414" rounded={'8px'}>
                <Controller
                  name="amount"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, ref } }) => (
                    <Input
                      type="number"
                      step="any"
                      color="white"
                      fontWeight="600"
                      border="1px solid #141414"
                      px="0.7rem"
                      boxShadow={'none'}
                      borderRight={'none'}
                      _hover={{
                        outline: 'none',
                        boxShadow: 'none',
                        border: '1px solid #141414',
                        borderRight: 'none',
                      }}
                      _active={{
                        outline: 'none',
                        boxShadow: 'none',
                        border: '1px solid #141414',
                        borderRight: 'none',
                      }}
                      _focus={{
                        outline: 'none',
                        boxShadow: 'none',
                        border: '1px solid #141414',
                        borderRight: 'none',
                      }}
                      _focusVisible={{
                        outline: 'none',
                        boxShadow: 'none',
                        border: '1px solid #141414',
                        borderRight: 'none',
                      }}
                      _visited={{
                        outline: 'none',
                        boxShadow: 'none',
                        border: '1px solid #141414',
                        borderRight: 'none',
                      }}
                      _placeholder={{
                        fontWeight: '500',
                        color: '#636666',
                      }}
                      id="amount"
                      placeholder="Amount"
                      value={donation} // Here's the change
                      onChange={(e: any) => {
                        onChange(e);
                        setDonation(e.target.value);
                      }}
                      onBlur={({ target: { value } }) => {
                        if (value !== '') {
                          setDonation(parseFloat(value));
                        } else {
                          setDonation(0); // or whatever default value you want when input is empty
                        }
                      }}
                      ref={ref}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') e.preventDefault();
                      }}
                    />
                  )}
                />

                <InputRightAddon
                  textAlign={'end'}
                  justifyContent={'end'}
                  borderLeft={'none'}
                  outline="none"
                  minWidth="1.5rem"
                >
                  $
                  <FlipNumbers
                    height={15}
                    width={10}
                    color="#636666"
                    //background="black"
                    play
                    perspective={700}
                    numbers={String(donation)}
                  />
                </InputRightAddon>
              </InputGroup>
              <ControlledSelect
                control={control}
                name="token"
                id="token"
                options={token}
                label={'Token'}
              />
            </HStack>
            <FormErrorMessage textStyle={{ base: 'body5', md: 'body4' }}>
              <>{errors.amount && errors.amount.message}</>
            </FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel
              textStyle={{ base: 'title6', md: 'title5' }}
              color="neutral.8"
              htmlFor="donation_to_matching_pool"
              pb="12px"
            >
              Donate to Cubik Matching Pool.
            </FormLabel>
            <HStack gap="0.1rem">
              {Array.from([0, 10, 15, 30]).map((percentage, key) => {
                return (
                  <VStack
                    cursor="pointer"
                    key={key}
                    backgroundColor={
                      watch('matchingPoolDonation') === percentage
                        ? '#14665B'
                        : '#242424'
                    }
                    _hover={{ outline: '1px solid #3E3E3E' }}
                    outline={
                      watch('matchingPoolDonation') === percentage
                        ? '1px solid #E0FFFD16'
                        : '1px solid #242424'
                    }
                    rounded="8px"
                    w="full"
                    h="2.5rem"
                    align={'center'}
                    justify="center"
                    onClick={() => {
                      setValue('matchingPoolDonation', percentage);
                    }}
                  >
                    <Box as="p" textStyle={'body4'} color="#E0FFFD">
                      {percentage}%
                    </Box>
                    {percentage === 10 ? (
                      <Box
                        position={'absolute'}
                        bottom="-15%"
                        bg="red"
                        rounded="full"
                        as="p"
                        fontSize="10px"
                        p="2px 8px"
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
              {errors.matchingPoolDonation ? (
                <>{errors.matchingPoolDonation.message}</>
              ) : (
                <></>
              )}
            </FormErrorMessage>
          </FormControl>
        </VStack>
        <VStack w="full" gap="16px">
          <VStack w="full" align="center" gap="8px">
            <HStack w="full" justify={'space-between'}>
              <Box as="p" textStyle={'body4'}>
                Estimated Match
              </Box>
              <Center color="#A8F0E6" fontWeight="700">
                <FlipNumbers
                  height={20}
                  width={13}
                  color="#A8F0E6"
                  play
                  perspective={700}
                  numbers={
                    '$' +
                    String(
                      typeof donation === 'number' && !isNaN(donation)
                        ? donation.toFixed(2)
                        : '0.00'
                    )
                  }
                />
              </Center>
            </HStack>
            <HStack w="full" justify={'space-between'}>
              <Box as="p" textStyle={'body5'} color="neutral.8">
                Matching pool contribution
              </Box>
              <Center color="#ADB8B6">
                <FlipNumbers
                  height={14}
                  width={10}
                  color="#ADB8B6"
                  play
                  perspective={700}
                  numbers={
                    '$' +
                    String(
                      watch('matchingPoolDonation') === 0
                        ? '0.0'
                        : (donation / watch('matchingPoolDonation')).toFixed(1)
                    )
                  }
                />
              </Center>
            </HStack>
          </VStack>
          <Button
            variant={'connect_wallet'}
            w="full"
            height="44px"
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Donate
          </Button>
        </VStack>
      </form>
      <Graph
        width={width}
        height={height}
        maximumDonationValue={1000}
        donationAmount={donation}
        setDonationAmount={setDonation}
      />
    </Stack>
  );
};
