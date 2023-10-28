import { numberInputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(numberInputAnatomy.keys);

const filled = definePartsStyle({
  field: {
    borderRadius: 0,
    borderColor: 'purple.200',
  },
  stepper: {
    color: 'purple.500',
    borderColor: 'purple.200',

    // Let's also provide dark mode alternatives
    _dark: {
      color: 'purple.400',
    },
  },
});

const outline = definePartsStyle({
  field: {
    border: 0,
    _focus: {
      ring: '1px',
      ringColor: 'purple.300',
      ringOffset: '2px',
      ringOffsetColor: 'purple.200',
    },
  },
});

const flushed = definePartsStyle({
  stepper: {
    _active: {
      color: 'green.300',
    },
    _odd: {
      background: 'green.200',
    },
    _even: {
      background: 'red.200',
    },
  },
});

const primary = definePartsStyle({
  field: {
    border: '1px solid',
    borderColor: 'gray.200',
    background: 'gray.50',
    fontWeight: 'bold',

    // Let's also provide dark mode alternatives
    _dark: {
      borderColor: 'gray.600',
      background: 'gray.800',
    },
  },
  stepper: {
    color: 'purple.500',
    background: 'gray.200',
  },
});
const cubik = definePartsStyle({
  root: {
    border: '1px solid',
    borderColor: '#272929',
    rounded: '8px',
    background: '#0F0F0F',
  },
  field: {
    border: 'none',
    rounded: '8px',
    background: 'transparent',
    fontWeight: 'bold',
    textAlign: 'end',
  },
  stepper: {
    width: '30px',
    color: '#636666',
    border: 'none',
    background: 'transparent',
  },
  stepperGroup: {
    border: 'none',
    outline: 'none',
  },
});

export const NumberInput = defineMultiStyleConfig({
  variants: { cubik, primary, filled, outline, flushed },
});
