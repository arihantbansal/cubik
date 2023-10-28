import type { JSX } from 'react';
import { Box, Tag } from '@/utils/chakra';

const CategoryTag = ({
  isSelected,
  children,
}: {
  isSelected?: boolean;
  children: string | JSX.Element;
}) => {
  return (
    <Tag
      cursor="pointer"
      rounded="full"
      px={{ base: '16px', md: '24px' }}
      py={{ base: '18px', md: '18px' }}
      bg={isSelected ? '#E0FFFD' : '#010F0D'}
    >
      <Box
        as="p"
        color={isSelected ? '#14665B' : '#ADB8B6'}
        noOfLines={1}
        whiteSpace="nowrap"
        textStyle={{ base: 'title7', md: 'title6' }}
        fontWeight="500 !important"
        textTransform={'capitalize'}
      >
        {children}
      </Box>
    </Tag>
  );
};

export default CategoryTag;
