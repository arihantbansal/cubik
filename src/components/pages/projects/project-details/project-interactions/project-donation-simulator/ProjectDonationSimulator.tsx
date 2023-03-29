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
import {
  chakraComponents,
  OptionBase,
  Props,
  Select,
} from 'chakra-react-select';
import { useEffect, useState } from 'react';
import { useController, UseControllerProps, useForm } from 'react-hook-form';
import PaymentModal from '../payment-modal/PaymentModal';
import Graph from './Graph';
import { tokens } from './Token';

interface tokenGroup extends OptionBase {
  label: string;
  value: string;
  icon: any;
}
const token: tokenGroup[] = tokens;

interface FormValues {
  cohort: string;
  amount: string;
  token: string;
  donation_to_matching_pool: number;
}
type ControlledSelectProps = UseControllerProps<FormValues> &
  Props & {
    label: string;
  };
const customComponents = {
  Option: ({ children, ...props }: { children: any; props: any }) => (
    // @ts-ignore
    <chakraComponents.Option {...props}>
      {/* @ts-ignore */}
      {props?.data?.icon} {children}
    </chakraComponents.Option>
  ),
};

type ProjectDonationSimulatorProps = {
  cta: string;
  height: number;
  width: number;
};

export const ProjectDonationSimulator = ({
  cta,
  height,
  width,
}: ProjectDonationSimulatorProps) => {
  const [donation, setDonation] = useState(100);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      donation_amount: donation.toFixed(1),
    },
  });

  useEffect(() => {
    // use api to convert this and add this
    setValue('donation_amount', (donation / 0.00000051).toFixed(1));
  }, [donation]);

  function onSubmit(values: any) {
    onOpen();
  }

  const ControlledSelect = ({
    control,
    name,
    rules,
    ...props
  }: ControlledSelectProps) => {
    const {
      field: { onChange, onBlur, value, ref },
      fieldState: { error },
    } = useController<FormValues>({
      name,
      control,
      rules,
    });

    return (
      <Select
        useBasicStyles
        name={name}
        ref={ref}
        defaultValue={token[0].value}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        // @ts-ignore
        components={customComponents}
        placeholder="Token"
        colorScheme="blackAlpha"
        chakraStyles={{
          container: (provided) => ({
            ...provided,
            w: '130px !important',
            paddingEnd: '0 !important',
            backgroundColor: '#001F1B',
            border: '1px solid #E0FFFD16',
            rounded: '8px',
            _placeholder: { fontSize: 'md' },
          }),
          valueContainer: (provided) => ({
            ...provided,
            paddingStart: '10px',
            color: '#fff',
            backgroundColor: 'transparent',
            fontWeight: '600',
            alignItems: 'end',
            textAlign: 'end',
            p: '0',
            w: '100px !important',
          }),
          input: (provided) => ({
            ...provided,
            backgroundColor: 'transparent',
          }),
          indicatorsContainer: (provided) => ({
            ...provided,
            border: 'none',
            outline: 'none',
            boxShadow: 'none',
          }),
          indicatorSeparator: (provided) => ({
            ...provided,
            display: 'none',
          }),
          inputContainer: (provided) => ({
            ...provided,
            backgroundColor: 'transparent',
            display: 'none',
          }),
          dropdownIndicator: (provided) => ({
            ...provided,
            p: 0,
            backgroundColor: 'transparent',
            marginEnd: '0px',
            color: 'white',
            border: 'none',
            outline: 'none',
            w: '30px !important',
          }),
          control: (provided, state) => ({
            ...provided,
            backgroundColor: 'transparent',
            borderBottomLeftRadius: state.menuIsOpen ? 0 : 'md',
            borderBottomRightRadius: state.menuIsOpen ? 0 : 'md',
            transitionDuration: 0,
            width: '100%',
            border: 'none',
            outline: 'none',
            boxShadow: 'none',
            rounded: '8px',
            _hover: {
              border: 'none',
              boxShadow: 'none',
              outline: 'none',
              borderRight: 'none',
            },
            _active: {
              border: 'none',
              boxShadow: 'none',
              outline: 'none',
              borderRight: 'none',
            },
            _focus: {
              border: 'none',
              boxShadow: 'none',
              outline: 'none',
              borderRight: 'none',
            },
          }),
          menu: (provided) => ({
            ...provided,
            my: 0,
            backgroundColor: '#242424',
            fontSize: 'sm',
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            shadow: `0 0 0 1px #242424`,
            borderWidth: '1px',
            borderColor: '#242424',
            borderBottomRadius: '4px',
          }),
          menuList: (provided, state) => ({
            //...provided,
            _selected: { backgroundColor: 'red' },
            backgroundColor: '#242424',
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderWidth: 0,
          }),
        }}
        {...props}
      />
    );
  };

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
                id="donation_amount"
                placeholder="Amount"
                {...register('donation_amount', {
                  required: 'This is required',
                  minLength: {
                    value: 4,
                    message: 'Minimum length should be 4',
                  },
                })}
              />{' '}
              <InputRightAddon
                textAlign={'end'}
                justifyContent={'end'}
                borderLeft={'none'}
                outline="none"
                minWidth="1.5rem"
              >
                ${donation}
              </InputRightAddon>
            </InputGroup>
            <ControlledSelect
              // @ts-ignore
              control={control}
              name="token"
              id="token"
              options={token}
              label="Food Groups"
              rules={{ required: 'Please select a token' }}
            />
          </HStack>
          <FormErrorMessage>
            {errors.donation_amount && errors.donation_amount.message}
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
      <ProjectDonationSimulator cta={'Donate'} height={150} width={150} />
    </Card>
  );
};

export default ProjectDonationSimulatorCard;
