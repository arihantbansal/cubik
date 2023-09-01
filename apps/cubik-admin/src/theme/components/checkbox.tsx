/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { checkboxAnatomy as parts } from '@chakra-ui/anatomy';
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const cubik = definePartsStyle({
  control: defineStyle({
    borderRadius: 'md',
    color: 'red.500',
    borderColor: 'red.500',
    _checked: {
      bg: 'red.500',
      borderColor: 'red.500',
      color: 'white',
      _hover: {
        bg: 'red.600',
        borderColor: 'red.600',
      },
    },
  }),
  container: defineStyle({
    _hover: {},
  }),
  icon: defineStyle({
    color: 'red',
    border: '1px solid gree',
  }),
  label: defineStyle({}),
});

const variants = {
  cubik: cubik,
};

const sizes = {
  xl: definePartsStyle({
    control: defineStyle({
      boxSize: 14,
    }),
    label: defineStyle({
      fontSize: '2xl',
      marginLeft: 6,
    }),
  }),
};

export const Checkbox = defineMultiStyleConfig({});
