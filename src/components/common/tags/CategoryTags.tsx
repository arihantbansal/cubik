import React from 'react';
import { Box, Tag } from '@chakra-ui/react';

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
      px="20px"
      py="12px"
      bg={isSelected ? '#E0FFFD' : '#010F0D'}
    >
      <Box
        as="p"
        color={isSelected ? '#14665B' : '#ADB8B6'}
        noOfLines={1}
        whiteSpace="nowrap"
        textStyle={'body5'}
        fontWeight="600"
      >
        {children}
      </Box>
    </Tag>
  );
};

export default CategoryTag;
