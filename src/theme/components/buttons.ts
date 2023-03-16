import { StyleFunctionProps } from '@chakra-ui/theme-tools';

export const Button = {
  baseStyles: {},
  backgroundColor: 'black',
  variants: {
    solid: (props: StyleFunctionProps) => ({
      rounded: '4px',
      padding: '12px 22px',
      backgroundColor: 'white',
      borderColor: '1px solis #222222',
      color: 'black',
      lineHeight: '10px',
      fontWeight: '500',
      transition: 'all 0.6s',
      fontSize: '14px',
      height: 'fit-content',
    }),
    outline: (props: StyleFunctionProps) => ({
      rounded: '4px',
      padding: '12px 22px',
      borderColor: '#222222',
      backgroundColor: 'transparent',
      color: '#A6A6A6',
      lineHeight: '10px',
      fontWeight: '500',
      transition: 'all 0.6s',
      fontSize: '14px',
      height: 'fit-content',
      _hover: {
        borderColor: '#A6A6A6',
        background: 'transparent',
        color: '#fff',
      },
      _active: {
        borderColor: '#A6A6A6',
        background: 'transparent',
        color: '#fff',
      },
      _disabled: {
        borderColor: '#121212',
        background: 'transparent',
        color: '#A6A6A6',
      },
    }),
  },
  sizes: {
    md: {
      fontSize: '14px',
      //height: '3rem',
    },
    sm: {
      fontSize: '12px',
      height: '2.5rem',
      padding: '0.5rem 1rem',
    },
  },
};
