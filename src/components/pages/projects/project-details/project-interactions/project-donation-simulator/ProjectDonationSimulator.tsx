import {
  Box,
  Button,
  Card,
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
import { useEffect, useState } from 'react';
import FlipNumbers from 'react-flip-numbers';
import { Controller, useForm } from 'react-hook-form';
import { DonationFormType } from '~/interfaces/donationForm';
import { tokenGroup } from '~/interfaces/token';
import PaymentModal from '../../../../../common/payment-modal/PaymentModal';
import { ControlledSelect } from '../../../../../common/select/ControlledSelect';
import { tokens } from '../../../../../common/tokens/DonationTokens';
import Graph from './Graph';

type ProjectDonationSimulatorProps = {
  height: number;
  width: number;
};

export const token: tokenGroup[] = tokens;

export const ProjectDonationSimulator = ({
  height,
  width,
}: ProjectDonationSimulatorProps) => {
  const [donation, setDonation] = useState(200);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      matchingPoolDonation: 15,
    },
  });

  useEffect(() => {
    // use api to convert this and add this
    const token = getValues('token');
    console.log('selected token - ', token, 'donation - ', donation);
    if (token === 'sol') {
      setValue('amount', donation * 22);
    } else if (token === 'usdc') {
      setValue('amount', donation);
    } else if (token === 'bonk') {
      setValue('amount', donation * 0.0000005);
    } else {
      setValue('amount', 0);
    }
  }, [donation, getValues, setValue]);

  function onSubmit(_values: any) {
    onOpen();
  }

  return (
    <Stack gap="64px" direction={'row'}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: '40rem',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <VStack w="full" gap="16px">
          <FormControl
            gap="16px"
            paddingTop={{ base: '3.5rem', md: '1.5rem' }}
            //@ts-ignore
            isInvalid={errors.donation_amount}
          >
            <FormLabel htmlFor="name" textStyle={'title4'} color="neutral.11">
              Donation Amount
            </FormLabel>
            <HStack>
              <InputGroup border="1px solid #141414" rounded={'8px'}>
                <Controller
                  name="amount"
                  control={control}
                  defaultValue={donation}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, ...field } }) => (
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
                      onChange={onChange}
                      onBlur={({ target: { value } }) => {
                        setDonation(parseInt(value));
                      }}
                      {...field}
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
            <FormErrorMessage>
              {errors.amount && errors.amount.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl pb="1.5rem">
            <FormLabel
              textStyle={'body5'}
              color="neutral.8"
              htmlFor="donation_to_matching_pool"
            >
              Donate to Cubik Matching pool.
            </FormLabel>
            <HStack gap="0.1rem">
              {Array.from([0, 5, 10, 25, 30]).map((percentage, key) => {
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
                    w="3.5rem"
                    h="2.5rem"
                    align={'center'}
                    justify="center"
                    onClick={() => {
                      setValue('matchingPoolDonation', percentage);
                    }}
                  >
                    <Box
                      as="p"
                      fontSize="sm"
                      fontWeight={'500'}
                      color="#E0FFFD"
                    >
                      {percentage}%
                    </Box>
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
          <HStack w="full" justify={'space-between'}>
            <Box as="p" textStyle={'body5'}>
              Matching pool contribution
            </Box>
            <Box as="p" textStyle={'title5'}>
              $250.50
            </Box>
          </HStack>
          <Button
            variant={'connect_wallet'}
            w="full"
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
