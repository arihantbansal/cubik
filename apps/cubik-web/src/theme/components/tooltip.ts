import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

// define custom sizes
const sizes = {
  sm: defineStyle({
    fontSize: '8px',
    py: '1',
    px: '2',
    maxW: '200px',
  }),
  md: defineStyle({
    fontSize: '10px',
    py: '2',
    px: '3',
    maxW: '300px',
  }),
  lg: defineStyle({
    fontSize: '12px',
    py: '2',
    px: '4',
    maxW: '350px',
  }),
};

// define styles for custom variant
const cubik = defineStyle(() => {
  return {
    bg: `#1D1F1E`,
    borderColor: `#1D1F1E`,
    rounded: '4px',
    color: `#626665`,
    _light: {
      bg: `#1D1F1E`,
      borderColor: `#1D1F1E`,
      color: `#626665`,
    },
    _dark: {
      bg: `#1D1F1E`,
      borderColor: `#1D1F1E`,
      color: `#626665`,
    },
  };
});

// define custom variants
const variants = {
  cubik: cubik,
};

// define which sizes, variants, and color schemes are applied by default

// export the component theme
export const Tooltip = defineStyleConfig({
  sizes,
  variants,
});
