import { alertAnatomy as parts } from '@chakra-ui/anatomy';
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  container: {
    borderRadius: '12px',
    padding: '12px 12px',
    display: 'flex',
    flexDirection: 'row',
    gap: '12px',
    spacing: '12px',
    alignItems: 'start',
    justifyContent: 'start',
  },
  icon: {
    backgroundColor: 'black',
    margin: '0px',
  },
  title: {
    fontSize: { base: '12px', md: '14px' },
  },
  description: {},
});

const cubik = definePartsStyle((props) => {
  const { status } = props;

  return {
    container: {
      border: '2px solid',
      borderColor:
        status === 'error'
          ? '#FF333D'
          : status === 'warning'
          ? 'yellow.400'
          : status === 'info'
          ? '#1D1F1E'
          : status === 'success'
          ? 'green.400'
          : 'gray.400',
      background: '#0C0D0D',
    },
    icon: {
      mt: '4px',
      width: '14px',
      height: '14px',
      color:
        status === 'error'
          ? '#FF333D'
          : status === 'warning'
          ? 'yellow.400'
          : status === 'info'
          ? '#636666'
          : status === 'success'
          ? 'green.400'
          : 'gray.400',
    },
    title: {
      color:
        status === 'error'
          ? '#FF333D'
          : status === 'warning'
          ? 'yellow.400'
          : status === 'info'
          ? '#636666'
          : status === 'success'
          ? 'green.400'
          : 'gray.400',
    },
    description: {
      color:
        status === 'error'
          ? '#FF333D'
          : status === 'warning'
          ? 'yellow.400'
          : status === 'info'
          ? '#636666'
          : status === 'success'
          ? 'green.400'
          : 'gray.400',
    },
  };
});

const variants = {
  cubik,
};

const size = {
  md: defineStyle({
    w: 5,
    h: 5,
  }),
};

const sizes = {
  md: definePartsStyle({
    icon: size.md,
  }),
};

export const Alert = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    variant: 'cubik',
  },
});
