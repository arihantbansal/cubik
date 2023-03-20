import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';
import '@fontsource/plus-jakarta-sans';

export const styles = {
  global: (props: StyleFunctionProps) => ({
    fonts: {
      heading: `'Plus Jakarta Sans', sans-serif`,
      body: `'Plus Jakarta Sans', sans-serif`,
    },
    body: {
      bg: mode('#000000', '#000000')(props),
      color: mode('#E0FFFD', '#E0FFFD')(props),
      '::-webkit-scrollbar': {
        display: 'none',
      },
    },
    text: {
      marginTop: '0',
    },
    '.chakra-alert': {
      gap: '1.2rem',
      bg: 'black',
      color: 'white',
    },
    '.wallet-adapter-button': {
      padding: '0rem 1.2rem',
      rounded: '6px',
      fontSize: '16px',
      lineHeight: '0',
      fontWeight: '500',
      height: '2.5rem',
      bg: mode('#4ADE80 !important', '#4ADE80')(props),
      color: mode('black', 'black')(props),
      _hover: {
        bg: mode('#4ADE80 !important', '#4ADE80')(props),
        color: mode('black', 'white')(props),
      },
      _active: {
        bg: mode('#4ADE80 !important', '#4ADE80')(props),
        color: mode('black', 'white')(props),
      },
    },
    '.wallet-adapter-button wallet-adapter-button-trigger ': {
      display: 'none',
    },
    '.wallet-adapter-modal-wrapper': {
      bg: 'white',
      color: 'black',
    },
    '.wallet-adapter-modal-button-close': {
      bg: '#dbdbdb',
      color: 'black',
    },
    '.wallet-adapter-modal-title': {
      color: 'black',
    },
    '.wallet-adapter-modal-content': {
      color: 'black',
    },
    '.wallet-adapter-modal-list .wallet-adapter-button': {
      bg: 'white',
      color: 'black',
      border: '1px solid gray.100',
      _hover: {
        bg: 'gray.100',
        color: 'string',
        shadow: 'none',
        transform: 'translate(0)',
        transition: 'none',
      },
    },
    '.wallet-adapter-button-end-icon, .wallet-adapter-button-start-icon, ': {
      // display: 'none',
    },
    '.wallet-adapter-modal-list-more': {
      color: 'black',
    },
    '.wallet-adapter-modal-list-more .svg': {
      color: 'black',
    },
    '.wallet-adapter-modal-list-more-icon-rotate': {
      color: 'black',
    },
    '.wallet-adapter-dropdown-list': {
      bg: '#4ADE80',
      color: 'black',
      shadow: 'none',
      border: '1px solid',
      borderColor: 'gray.200',
      rounded: 'md',
    },
    '.wallet-adapter-dropdown-list-item': {
      bg: '#4ADE80',
      color: 'black',
      border: '1px solid gray.100',
      fontSize: 'lg',
      fontWeight: '400',
      padding: '0.5rem 1rem',
      textAlign: 'left',
      _hover: {
        bg: '#eaeaea',
        color: 'black',
        shadow: 'none',
        transform: 'translate(0)',
        transition: 'none',
      },
    },
    '.wallet-adapter-dropdown-list-item:not([disabled]):hover': {
      bg: '#eaeaea',
    },
    // react slick
    '.slick-next': {
      right: '0px',
    },
    '.slick-prev': {
      left: '0px',
    },

    //taptap
    '.ProseMirror': {
      minHeight: '20rem',
      height: 'fit-content',
      border: 'none',
      padding: '0.5rem 1.6rem',
      overflow: 'scroll',
      _focus: {
        outline: 'none',
      },

      '&::-moz-focus-inner': {
        border: 'none',
        outline: 'none !important',
      },
    },
  }),
};
