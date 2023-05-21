import { sliderAnatomy as parts } from '@chakra-ui/anatomy';
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from '@chakra-ui/styled-system';
import { mode } from '@chakra-ui/theme-tools';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle((props) => ({
  filledTrack: {
    bg: mode('blue.400', 'blue.300')(props),
  },
  thumb: {
    bg: mode('white', 'gray.200')(props),
    _hover: {
      bg: mode('gray.100', 'gray.300')(props),
    },
  },
}));

const sizes = {
  xl: definePartsStyle({
    track: defineStyle({
      h: 10,
    }),
    thumb: defineStyle({
      boxSize: 7,
    }),
  }),
};

const square = definePartsStyle({
  thumb: defineStyle({
    rounded: 'none',
  }),
});

const cubik = definePartsStyle((props) => ({
  filledTrack: {
    bg: '#A8F0E6',
    h: 2,
    rounded: 'full',
    border: '1px solid #A8F0E6',
  },
  track: {
    bg: '#2B3D3D',
    h: 2,
    rounded: 'full',
    border: '1px solid #2B3D3D',
  },
  thumb: {
    bg: '#A8F0E6',
    border: '2px solid #14665B',
    boxSize: 5,
    _active: {
      bg: '#A8F0E6',
      border: '2px so lid #14665B',
    },
    _hover: { bg: '#A8F0E6', border: '2px solid #14665B' },
  },
  mark: {
    textAlign: 'center',
    bg: 'blue.500',
    color: 'white',
    mt: '4',
    ml: '-5',
    w: '12',
  },
}));

export const Slider = defineMultiStyleConfig({
  variants: { cubik },
  sizes,
  defaultProps: {},
});
