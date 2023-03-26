import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle((props) => {
  const { colorScheme: c } = props;
  return {
    dialog: {
      borderRadius: 'md',
      bg: `${c}.100`,
      _dark: {
        bg: `${c}.600`,
        color: 'white',
      },
    },
  };
});

const cubik = definePartsStyle({
  overlay: {
    bg: 'rgba(0, 0, 0, 0.72)',
    backdropFilter: 'blur(10px)',
  },
  dialog: {
    mt: '18vh',
    borderRadius: '20px',
    border: '1px solid #141414',
    bg: `surface.card`,
    boxShadow: '0px 2px 120px #000000',
    backdropFilter: 'blur(10px)',
    padding: '32px 0px',
    gap: '24px',
    width: '416px',
  },
  dialogContainer: {
    outline: '1px dashed red',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0px 32px',
    fontSize: '20px',
    fontWeight: 'bold',
    lineHeight: '28px',
    letterSpacing: '0.02em',
    color: 'white',
  },
  closeButton: {
    backgroundColor: '#1D1F1E',
    color: 'white',
    rounded: 'full',
    top: '32px',
    right: '32px',
    height: '30px',
    width: '30px',
    padding: '4px',
  },
  body: {
    padding: '0px 32px',
  },
  footer: {
    padding: '24px 32px 0px 32px',
    borderTop: '1px solid',
    borderColor: 'neutral.3',
  },
});

const xl = defineStyle({
  px: '6',
  py: '0',
  fontSize: 'xl',
});

const sm = defineStyle({
  fontSize: 'sm',
  py: '2',
  pt: '8',
});

const sizes = {
  xl: definePartsStyle({ header: sm, dialog: xl }),
};

export const Modal = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants: {
    cubik,
  },
  defaultProps: {
    colorScheme: 'purple', //set the default color scheme to purple
    size: 'xl',
  },
});
