import { tabsAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys);

const cubik = definePartsStyle(() => {
  return {
    tablist: {
      width: '100%',
      height: { base: '2.2rem', md: '3rem' },
      backgroundColor: 'transparent',
      gap: { base: '18px', md: '32px' },
    },
    tab: {
      boxShadow: 'none !important',
      padding: { base: '6px 6px 10px 6px', md: '8px 8px 12px 8px' },
      fontWeight: '600',
      fontSize: { base: '14px', md: '18px' },
      lineHeight: { base: '16px', md: '22px' },
      backgroundColor: 'transparent',
      height: { base: '2.2rem', md: '3rem' },
      borderBottom: '2px solid transparent',
      color: 'neutral.7',
      mb: '-1px',
      _hover: {
        boxShadow: 'none !important',
        borderBottom: '2px solid transparent',
        color: 'neutral.7',
        mb: '-1px',
      },
      _selected: {
        boxShadow: 'none !important',
        borderBottom: '2px solid',
        borderColor: 'brand.teal5',
        color: 'brand.teal6',
        mb: '-1px',
      },
    },
    tabpanel: {
      padding: { base: '24px 0px', md: '32px 0px' },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      justifyContent: 'start',
      gap: { base: '32px', md: '32px' },
      backgroundColor: 'transparent',
    },
  };
});

const variants = {
  cubik: cubik,
};

// export the component theme
export const Tabs = defineMultiStyleConfig({ variants });
