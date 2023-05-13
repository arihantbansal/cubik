import { Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import FlipNumbers from 'react-flip-numbers';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { ControlledSelect } from '~/components/common/select/ControlledSelect';
import { DonationFormType } from '~/interfaces/donationForm';
import { tokenGroup } from '~/interfaces/token';

type AmountInputProps = {
  donation: number;
  setDonation: (value: number) => void;
  register: UseFormRegister<DonationFormType>;
  errors: FieldErrors<DonationFormType>;
  token: tokenGroup[];
  control: Control<DonationFormType, any>;
};

export const AmountInput = ({
  donation,
  setDonation,
  register,
  errors,
  token,
  control,
}: AmountInputProps) => {
  console.log('input rerendered');

  return (
    <>
      <InputGroup border="1px solid #141414" rounded={'8px'}>
        {/* <Controller
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
                console.log('on change');
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
        /> */}
        <Input
          {...register('amount', { required: true })}
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
          // onChange={(e: any) => {
          //   console.log('on change');
          //   setDonation(e.target.value);
          // }}
          // onBlur={({ target: { value } }) => {
          //   if (value !== '') {
          //     setDonation(parseFloat(value));
          //   } else {
          //     setDonation(0); // or whatever default value you want when input is empty
          //   }
          // }}
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
    </>
  );
};
