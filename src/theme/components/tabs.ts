import { tabsAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys);

const cubik = definePartsStyle((props) => {
  const { colorScheme: c } = props; // extract colorScheme from component props

  return {
    tab: {
      padding: '10px 8px',
      backgroundColor: 'transparent',
      borderBottom: '1px solid transparent',
      color: '#717171',
      fontWeight: '600',
      mb: '-1px',
      _hover: {
        borderBottom: '1px solid transparent',
        color: '#717171',
        mb: '-1px',
      },
      _selected: {
        borderBottom: '1px solid #D645A6',
        color: 'white',
        mb: '-1px',
      },
    },
    tablist: {
      width: '100%',
      // borderBottom: '1px solid #222222',
      backgroundColor: 'transparent',
    },
    tabpanel: {
      padding: '0',
      backgroundColor: 'transparent',
      borderBottomRadius: 'lg',
      borderTopRightRadius: 'lg',
    },
  };
});

const variants = {
  cubik: cubik,
};

// export the component theme
export const Tabs = defineMultiStyleConfig({ variants });
