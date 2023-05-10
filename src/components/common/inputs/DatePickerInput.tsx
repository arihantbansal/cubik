import {
  Icon,
  Input as ChakraInput,
  InputGroup,
  InputLeftAddon,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';
import React from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa'; // import calendar icon

interface DatePickerInputProps extends ChakraInputProps {
  onClick?: () => void;
  value?: string;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  onClick,
  value,
  ...props
}) => (
  <InputGroup>
    <InputLeftAddon pointerEvents="none">
      <Icon as={FaRegCalendarAlt} color="gray.300" />
    </InputLeftAddon>
    <ChakraInput onClick={onClick} value={value} {...props} />
  </InputGroup>
);

export default DatePickerInput;
