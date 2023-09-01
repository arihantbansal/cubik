import { popoverAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle(() => ({
  content: {
    backgroundColor: 'neutral.2',
    border: '1px solid',
    borderColor: 'neutral.4',
    _dark: {
      backgroundColor: 'neutral.2',
    },
  },
  body: {
    border: 'none',
    outline: 'none',
    p: '0px',
  },
  header: {
    padding: '0px',
  },
}));

const cubik = definePartsStyle({
  content: {
    outline: 'none',
    rounded: '12px',
    p: '16px',
    gap: '12px',
  },
  header: {
    maxW: 'full',
    border: 'none',
  },
  body: {
    fontSize: { base: '9px', md: '11px' },
    fontWeight: '400',
  },
  arrow: {},
  closeButton: {
    border: 'none',
  },
});

const variants = {
  cubik,
};

export const Popover = defineMultiStyleConfig({
  baseStyle,
  variants,
});
