import type { StyleFunctionProps } from '@chakra-ui/theme-tools';
import { mode } from '@chakra-ui/theme-tools';

import '@fontsource/plus-jakarta-sans';

export const styles = {
  global: (props: StyleFunctionProps) => ({
    '*': {
      //  outline: '1px dashed white',
    },
    // disable blue overlay on touch
    'a, button': {
      WebkitTapHighlightColor: 'transparent',
    },
    '::-webkit-scrollbar': {
      display: 'none',
    },
    ':host,:root': {
      '--chakra-ui-focus-ring-color': '#3B3D3D',
      '--chakra-shadows-outline': '0 0 0 3px var(--chakra-ui-focus-ring-color)',
    },
    fonts: {
      heading: `'Plus Jakarta Sans', sans-serif`,
      body: `'Plus Jakarta Sans', sans-serif`,
    },
    body: {
      bg: mode('#000000', '#000000')(props),
      color: mode('#E0FFFD', '#E0FFFD')(props),
    },
    option: {
      background: 'red !important',
    },
    'td:first-of-type': {
      borderTopLeftRadius: '16px',
      borderBottomLeftRadius: '16px',
    },
    'td:last-child': {
      borderTopRightRadius: '16px',
      borderBottomRightRadius: '16px',
    },
    'th:first-of-type': {
      borderTopLeftRadius: '16px',
      borderBottomLeftRadius: '16px',
    },
    'th:last-child': {
      borderTopRightRadius: '16px',
      borderBottomRightRadius: '16px',
    },
    text: {
      marginTop: '0',
    },
    '.chakra-alert': {
      gap: '1.2rem',
      bg: 'black',
      color: 'white',
    },
    '#mouse-parallax-container': {
      width: '100%',
      height: '100%',
    },
    // ---- wallet adapter ui ---
    '.wallet-adapter-modal-overlay': {
      bg: 'rgba(0, 0, 0, 0.12)',
      backdropFilter: 'blur(12px)',
    },
    '.wallet-adapter-modal-wrapper': {
      borderRadius: '20px',
      border: '1px solid #141414',
      backgroundColor: `#08080880 !important`,
      boxShadow: '0px 2px 120px #000000',
      backdropFilter: 'blur(10px)',
      padding: '44px 0px 16px 0px',
      gap: '18px !important',
      width: { base: '10px', md: '416px' },
      overflow: 'hidden',
    },
    '.wallet-adapter-modal-wrapper:before': {
      content: '""',
      zIndex: '-1',
      position: 'absolute',
      bottom: '100%',
      left: '50%',
      transform: 'translate(-50%, 0%)',
      width: '6rem',
      height: '6rem',
      backgroundColor: '#A8F0E6',
      filter: 'blur(120px)',
      borderRadius: 'full',
    },
    '.wallet-adapter-modal-list, .wallet-adapter-collapse': {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: { base: 'nowrap', md: 'wrap' },
      overflow: 'scroll',
      padding: {
        base: '32px 12px 16px 16px !important',
        md: '32px 32px 0px 32px !important',
      },
      gap: { base: '8px', md: '14px' },
    },
    '.wallet-adapter-collapse': {
      _after: {
        content: '"I dont have a wallet"',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: '20px',
        color: '#ffffff57',
        fontSize: { base: '12px', sm: '14px' },
        fontWeight: '500',
        lineHeight: { base: '18px', md: '24px' },
      },
    },
    '.wallet-adapter-collapse > li': {
      display: 'none',
    },
    '.wallet-adapter-modal-list > li, .wallet-adapter-collapse > li': {
      minW: '5.5rem',
      w: '6.2rem',
      minH: '6rem',
      height: 'full',
      borderRadius: '12px',
      overflow: 'hidden',
      transition: '0.2s linear all',
      border: '1px solid',
      borderColor: 'transparent',
      _hover: {
        transition: '0.2s linear all',
        border: { base: 'none', md: '1px solid #E0FFFD24' },
        boxShadow: { base: 'none', md: '0px 4px 60px #000000' },
      },
    },
    '.wallet-adapter-modal-list > li > button, .wallet-adapter-collapse > li > button':
      {
        minW: '5.5rem',
        width: 'full',
        minH: '6rem',
        height: '6rem',
        padding: '16px',
        borderRadius: '12px',
        gap: { base: '8px', md: '12px' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: { base: 'transparent', md: '#FFFFFF10' },
        fontWeight: '700 !important',
        fontSize: { base: '14px !important', md: '16px !important' },
        lineHeight: '18px',
        transition: '0.2s linear all',
        _hover: {
          transition: '0.2s linear all',
          backgroundColor: {
            base: '#FFFFFF12 !important',
            md: '#FFFFFF16 !important',
          },
        },
      },
    '.wallet-adapter-button-start-icon': {
      margin: '0px !important',
      width: { base: '48px !important', md: '32px !important' },
      height: { base: '48px !important', md: '32px !important' },
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    '.wallet-adapter-button-start-icon > img': {
      width: { base: '48px !important', md: '32px !important' },
      height: { base: '48px !important', md: '32px !important' },
    },
    '.wallet-adapter-button > span ': {
      display: 'none !important',
    },
    '.wallet-adapter-modal-list-more': {
      display: 'none !important',
    },

    '.wallet-adapter-button wallet-adapter-button-trigger ': {
      display: 'none',
    },

    '.wallet-adapter-modal-button-close': {
      backgroundColor: '#1D1F1E',
      color: 'white',
      padding: '8px',
      top: '32px',
      right: '32px',
    },
    '.wallet-adapter-modal-title': {
      visibility: 'hidden',
      position: 'relative',
      padding: '0px !important',
      height: '0rem',
    },
    '.wallet-adapter-modal-title:after': {
      visibility: 'visible',
      position: 'absolute',
      top: '-10px',
      left: '32px',
      fontSize: '20px',
      fontWeight: 'bold',
      lineHeight: '28px',
      letterSpacing: '0.02em',
      color: 'white',
      content: '"Connect Wallet"',
    },

    // wallet connect button
    '.wallet-adapter-button-trigger > i': {
      display: 'none !important',
    },

    '.wallet-adapter-button-trigger': {
      border: '1px solid red',
      color: '#031513',
      backgroundColor: '#A8F0E6',
      padding: { base: '8px 12px', sm: '8px 12px' },
      whiteSpace: 'nowrap',
      //border: '1px solid rgba(168, 240, 230, 0.6)',
      rounded: '6px',
      fontSize: { base: '12px', sm: '14px' },
      fontWeight: '600',
      lineHeight: { base: '18px', md: '22px' },
      height: {
        base: '28px !important',
        sm: '32px !important',
        md: '40rem !important',
      },
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '8px',
      behavior: 'url(PIE.htc)',
      _hover: {
        color: '#14665B',
        backgroundColor: '#E0FFFD !important',
      },
      _disabled: {
        position: 'relative',
        _after: {
          content: '"Connecting..."',
          position: 'absolute',
          left: '0',
          right: '0',
          color: '#031513',
          backgroundColor: '#A8F0E6',
          padding: { base: '5px 12px', sm: '8px 12px' },
          borderColor: 'rgba(168, 240, 230, 0.6)',
          rounded: '6px',
          fontSize: { base: '12px', sm: '14px' },
          fontWeight: '600',
          lineHeight: { base: '18px', md: '24px' },
        },
      },
      _active: {
        color: '#031513',
      },
    },

    // react slick
    '.slick-next': {
      right: '0px',
    },
    '.slick-prev': {
      left: '0px',
    },

    //taptap
    '#reset-des blockquote': {
      all: 'revert !important',
    },
    '#reset-des ol': {
      all: 'revert !important',
    },
    '#reset-des li': {
      all: 'revert !important',
    },
    '#reset-des a': {
      all: 'revert !important',
    },
    '#reset-des ul': {
      all: 'revert !important',
    },
    '#reset-des strong': {
      all: 'revert !important',
    },
    '#reset-des br': {
      all: 'revert !important',
    },
    '#reset-des h1': {
      all: 'revert !important',
    },
    '#reset-des h2': {
      all: 'revert !important',
    },
    '#reset-des h3': {
      all: 'revert !important',
    },
    '#reset-des h4': {
      all: 'revert !important',
    },
    '#reset-des h5': {
      all: 'revert !important',
    },
    '#reset-des h6': {
      all: 'revert !important',
    },
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

    // react datepicker
    '.react-datepicker': {
      fontSize: '0.8rem',
      border: '1px solid #A8F0E6',
      backgroundColor: '#1D1F1E',
      borderRadius: '12px',
      overflow: 'hidden',
      color: 'red',
    },

    '.react-datepicker__day--selected': {
      backgroundColor: 'red',
    },
    '.react-datepicker-popper[data-placement^=top] .react-datepicker__triangle::before':
      { borderTopColor: '#A8F0E6' },
    '.react-datepicker-popper[data-placement^=top] .react-datepicker__triangle::after':
      {
        borderTopColor: '#A8F0E6',
      },
    '.react-datepicker__current-month': {
      color: '#A8F0E6',
    },

    '.react-datepicker__day': {
      color: 'red',
    },

    ' .react-datepicker__day-name, .react-datepicker__day, .react-datepicker__time-name':
      {
        color: '#E0FFFD',
      },

    '.react-datepicker__header': {
      backgroundColor: '#2c2c2c',
      borderBottom: 'none',
    },

    '.react-datepicker__navigation--previous': {
      borderRightColor: 'white',
    },

    '.react-datepicker__navigation--next': {
      borderLeftColor: 'white',
    },

    '.react-datepicker__day--selected, .react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range':
      {
        backgroundColor: '#14665B',
      },

    '.react-datepicker__close-icon::before, .react-datepicker__close-icon::after':
      {
        backgroundColor: 'white',
      },
    '.react-datepicker__day:hover, .react-datepicker__month-text:hover, .react-datepicker__quarter-text:hover, .react-datepicker__year-text:hover':
      {
        backgroundColor: '#14665B',
      },
    ' .react-datepicker__day:focus': {
      backgroundColor: '#14665B',
    },
    '.react-datepicker__day--disabled, .react-datepicker__month-text--disabled, .react-datepicker__quarter-text--disabled, .react-datepicker__year-text--disabled':
      {
        color: '#2c2c2c',
      },
    '.react-datepicker__day--disabled:hover, .react-datepicker__month-text--disabled:hover, .react-datepicker__quarter-text--disabled:hover, .react-datepicker__year-text--disabled:hover':
      {
        backgroundColor: 'transparent',
      },
    '.react-datepicker__navigation-icon::before': {
      width: '6px',
      height: '6px',
      top: '-3px',
    },
    '.react-datepicker__navigation-icon--previous': {
      height: '2px',
    },
  }),
};
