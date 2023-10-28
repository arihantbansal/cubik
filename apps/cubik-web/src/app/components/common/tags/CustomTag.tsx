// @ts-nocheck
import React, { forwardRef } from 'react';
import { Box, Tag } from '@/utils/chakra';

interface CustomTagProps {
  color?: string;
  children: React.ReactNode;
  // onResize?: () => void;
  // ref?: React.Ref<HTMLDivElement>;
}

const CustomTag = forwardRef<HTMLDivElement, CustomTagProps>(
  ({ children }, ref) => {
    return (
      <Tag
        ref={ref}
        rounded="full"
        variant="colorful"
        backgroundColor="#1D1F1E"
        fontSize="xs"
        p="8px 12px"
        mx={0}
      >
        <Box
          as="p"
          whiteSpace="pre"
          color="#D7E0DF"
          textStyle={{ base: 'body6', md: 'body5' }}
        >
          {children}
        </Box>
      </Tag>
    );
  },
);

CustomTag.displayName = 'CustomTag';

export default CustomTag;
