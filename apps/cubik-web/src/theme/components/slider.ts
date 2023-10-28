import { sliderAnatomy as parts } from '@chakra-ui/anatomy';
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

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

const cubik = definePartsStyle(() => ({
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
