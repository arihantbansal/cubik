import {
  Button,
  Card,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  useDisclosure,
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
  cta: string;
  height: number;
  width: number;
};

export const token: tokenGroup[] = tokens;

export const ProjectDonationSimulator = ({
  cta,
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
    formState: { errors, isSubmitting },
  } = useForm<DonationFormType>({
    defaultValues: {
      amount: donation,
      token: token[0].value,
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
    <>
      <Graph
        width={width}
        height={height}
        maximumDonationValue={1000}
        donationAmount={donation}
        setDonationAmount={setDonation}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          paddingTop={{ base: '3.5rem', md: '1.5rem' }}
          //@ts-ignore
          isInvalid={errors.donation_amount}
        >
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
        <Button
          variant={'connect_wallet'}
          w="full"
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          {cta}
        </Button>
      </form>
      <PaymentModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
};

const ProjectDonationSimulatorCard = () => {
  return (
    <Card height={'full'} p="16px" h="fit-content">
      <ProjectDonationSimulator cta={'Donate'} height={130} width={150} />
    </Card>
  );
};

export default ProjectDonationSimulatorCard;
