import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';

export const styles = {
  global: (props: StyleFunctionProps) => ({
    fonts: {
      heading: `'Poppins', sans-serif`,
      body: `'Poppins', sans-serif`,
    },
    body: {
      bg: mode('#01020B', '#01020B')(props),
      color: mode('white', 'white')(props),
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
      fontWeight: '600',
      height: '2.5rem',
      bg: mode('red !important', 'red')(props),
      color: mode('black', 'white')(props),
      _hover: {
        bg: mode('red !important', 'red')(props),
        color: mode('black', 'white')(props),
      },
      _active: {
        bg: mode('red !important', 'red')(props),
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
      bg: 'red',
      color: 'red',
      shadow: 'none',
      border: '1px solid',
      borderColor: 'gray.200',
      rounded: 'md',
    },
    '.wallet-adapter-dropdown-list-item': {
      bg: 'red',
      color: 'red',
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
    // dispatch styles
    '.dsp- .topicView': {
      background: 'transparent !important',
    },
    '.dsp- .alertContainer': {
      background: 'transparent !important',
      display: 'none',
    },
    '.dsp- .topicViewContainer .topicViewContent': {
      padding: '0px !important',
    },
    '.dsp- .topicViewContainer': {
      background: 'transparent !important',
      padding: '0px !important',
      minHeight: '40rem',
    },
    '.breadcrumbContainer': {
      backgroundColor: 'red',
    },
    '.dsp- .topicContentBox .headerAndActions .topicHeader': {
      display: 'none',
      padding: 'none',
    },

    '.dsp- .topicContentBox .headerAndActions .topicToolsContainer': {
      display: 'none',
      padding: 'none',
    },
    '.dsp- .postContent': {
      background: '#141414 !important',
      border: '1px solid #242424 !important',
      borderRadius: '4px',
      color: '#242424',
      height: '5rem',
      _placeholder: {
        color: '#242424',
      },
    },
    '.dsp- .topicContentBox .activityInfo': {
      display: 'none',
      padding: 'none',
    },
    '.dsp- .breadcrumbContainer': {
      display: 'none',
    },
    '.dsp- .createPostContainer': {
      border: 'none',
    },
    '.dsp- .topicContentBox': {
      background: 'none',
      padding: '0px !important',
    },
    '.dsp- .createPostButton': {
      color: 'black',
      backgroundColor: 'white',
    },
    '.dsp- .postContentContainer': {
      background: 'transparent !important',
      padding: '0px',
    },
    '.dsp- .box .postHeader .walletId': {
      color: '#C5C5C5',
    },
    '.dsp- .votePostContainer': {
      display: 'none',
    },
    '.dsp- .box .postBody': {
      color: 'white',
    },
    '.dsp- .actionDivider': {
      display: 'none',
    },
    '.dsp- .box .actionsContainer .right .awardButton:disabled': {
      display: 'none',
    },
    '.dsp- .box .actionsContainer .right .replyButton:disabled': {
      color: '#FF8EFF',
    },
    '.dsp- .box .actionsContainer .right .replyButton svg': {
      display: 'none',
    },
    '.dsp- .addGIFButton:disabled': {
      color: '#FF8EFF',
      borderColor: '#FF8EFF',
    },
    '.dsp- ': {
      padding: 'none',
    },
    '.dsp- .roleLabelContainer': {
      display: 'none',
    },
    // react slick
    '.slick-next': {
      right: '0px',
    },
    '.slick-prev': {
      left: '0px',
    },
  }),
};
