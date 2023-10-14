import { Input, InputGroup, InputRightAddon } from "@chakra-ui/react";
import FlipNumbers from "react-flip-numbers";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { ControlledSelect } from "~/components/common/select/ControlledSelect";
import { DonationFormType } from "~/interfaces/donationForm";
import { tokenGroup } from "~/interfaces/token";
import useCurrentTokenPrice from "~/hooks/useCurrentTokenPrice";

type AmountInputProps = {
  value: number;
  setValue: (value: number) => void;
  register: UseFormRegister<DonationFormType | any>;
  errors: FieldErrors<DonationFormType>;
  token: tokenGroup[];
  seletedToken: string;
  control: Control<DonationFormType | any>;
};

export const AmountInput = ({
  value,
  setValue,
  register,
  errors,
  token,
  control,
  seletedToken,
}: AmountInputProps) => {
  const { data: price, isLoading, error } = useCurrentTokenPrice(["solana"]);
  const handlePrice = (): number => {
    if (seletedToken.includes("SOL")) {
      return price ? price[0].price * value : 0;
    } else {
      return value;
    }
  };
  return (
    <>
      <InputGroup border="1px solid #141414" rounded={"8px"}>
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
          {...register("amount", { required: true, valueAsNumber: true })}
          type="number"
          step="any"
          color="white"
          fontWeight="600"
          border="1px solid #141414"
          px="0.7rem"
          boxShadow={"none"}
          borderRight={"none"}
          _hover={{
            outline: "none",
            boxShadow: "none",
            border: "1px solid #141414",
            borderRight: "none",
          }}
          _active={{
            outline: "none",
            boxShadow: "none",
            border: "1px solid #141414",
            borderRight: "none",
          }}
          _focus={{
            outline: "none",
            boxShadow: "none",
            border: "1px solid #141414",
            borderRight: "none",
          }}
          _focusVisible={{
            outline: "none",
            boxShadow: "none",
            border: "1px solid #141414",
            borderRight: "none",
          }}
          _visited={{
            outline: "none",
            boxShadow: "none",
            border: "1px solid #141414",
            borderRight: "none",
          }}
          _placeholder={{
            fontWeight: "500",
            color: "#636666",
          }}
          id="amount"
          placeholder="Amount"
          value={value} // Here's the change
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
        {isLoading ? (
          <>...</>
        ) : price ? (
          <InputRightAddon
            textAlign={"end"}
            justifyContent={"end"}
            borderLeft={"none"}
            outline="none"
            minWidth="1.5rem"
          >
            $
            <FlipNumbers
              height={15}
              width={10}
              color="#636666"
              play
              perspective={700}
              numbers={handlePrice().toString()}
            />
          </InputRightAddon>
        ) : (
          <>e</>
        )}
      </InputGroup>
      <ControlledSelect
        control={control}
        name="token"
        id="token"
        options={token}
        label={"Token"}
      />
    </>
  );
};
