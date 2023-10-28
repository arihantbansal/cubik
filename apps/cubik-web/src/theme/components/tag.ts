import { tagAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tagAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  container: {
    bg: '#222222',
    color: '#ffffff85',
    h: '32px',
    px: '12px',
    rounded: 'full',
  },
  label: {
    fontSize: { base: '10px', md: '13px' },
  },
});
const colorful = definePartsStyle({
  // define the part you're going to style
  container: {
    bg: '#5CFF8710',
    color: '#5CFF87',
    rounded: '8px',
    padding: '0.4rem',
    minH: { base: '1.4rem', md: '1.75rem' },
    minW: { base: '1.4rem', md: '1.75rem' },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: { base: '9px', md: '10px' },
  },
});

export const Tag = defineMultiStyleConfig({
  baseStyle,
  variants: { colorful: colorful },
});
