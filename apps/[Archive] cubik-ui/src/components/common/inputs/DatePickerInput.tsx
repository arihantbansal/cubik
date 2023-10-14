import {
  Icon,
  Input as ChakraInput,
  InputGroup,
  InputLeftAddon,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { format, parseISO, isValid } from "date-fns";

interface DatePickerInputProps {
  onClick?: () => void;
  value?: Date | string;
  updatedValue?: Date | string;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  onClick,
  value,
  updatedValue,
  ...props
}) => {
  const [dateValue, setDateValue] = useState(() => {
    if (value instanceof Date && isValid(value)) {
      return format(value, "dd MMMM yyyy");
    } else if (typeof value === "string" && isValid(parseISO(value))) {
      return format(parseISO(value), "dd MMMM yyyy");
    } else {
      return "";
    }
  });

  useEffect(() => {
    if (updatedValue instanceof Date && isValid(updatedValue)) {
      setDateValue(format(updatedValue, "dd MMMM yyyy"));
    } else if (
      typeof updatedValue === "string" &&
      isValid(parseISO(updatedValue))
    ) {
      setDateValue(format(parseISO(updatedValue), "dd MMMM yyyy"));
    }
  }, [updatedValue]);

  return (
    <InputGroup>
      <InputLeftAddon pointerEvents="none">
        <Icon as={FaRegCalendarAlt} color="gray.300" />
      </InputLeftAddon>
      <ChakraInput
        onClick={onClick}
        value={dateValue}
        placeholder="Select date"
        {...props}
      />
    </InputGroup>
  );
};

export default DatePickerInput;
