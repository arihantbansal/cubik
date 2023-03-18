import { selectAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(selectAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  field: {
    background: 'purple.100',
    border: '1px dashed',
    borderColor: 'purple.200',
    borderRadius: 'full',
  },
  icon: {
    color: 'purple.400',
  },
});

export const Select = defineMultiStyleConfig({ baseStyle });
