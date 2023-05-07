import React, { forwardRef } from 'react';
import { Box, Tag } from '@chakra-ui/react';

interface CustomTagProps {
  color?: string;
  children: React.ReactChild;
  onResize?: () => void;
  ref?: React.Ref<HTMLDivElement>;
}

const CustomTag = forwardRef<HTMLDivElement, CustomTagProps>((props, ref) => {
  const { color, children, onResize } = props;

  switch (color) {
    case 'DAO':
      return (
        <Tag variant="colorful" fontSize="xs" color="#FF1F1F" bg="#3b1515">
          <Box as="p" noOfLines={1} whiteSpace="nowrap" textStyle={'body5'}>
            {children}
          </Box>
        </Tag>
      );
    case 'DeFi':
      return (
        <Tag variant="colorful" fontSize="xs" color="#73FF9A" bg="#042919">
          <Box as="p" noOfLines={1} whiteSpace="nowrap" textStyle={'body5'}>
            {children}
          </Box>
        </Tag>
      );
    case 'dapp':
      return (
        <Tag variant="colorful" fontSize="xs" color="#BFFF36" bg="#232916">
          <Box as="p" noOfLines={1} whiteSpace="nowrap" textStyle={'body5'}>
            {children}
          </Box>
        </Tag>
      );
    case 'framework':
      return (
        <Tag variant="colorful" fontSize="xs" color="#FFF066" bg="#2D2A14">
          <Box as="p" noOfLines={1} whiteSpace="nowrap" textStyle={'body5'}>
            {children}
          </Box>
        </Tag>
      );
    case 'analytics':
      return (
        <Tag variant="colorful" fontSize="xs" color="#7ABAFF" bg="#1B2127">
          <Box as="p" noOfLines={1} whiteSpace="nowrap" textStyle={'body5'}>
            {children}
          </Box>
        </Tag>
      );
    case 'dex':
      return (
        <Tag variant="colorful" fontSize="xs" color="#FF7A00" bg="#352B22">
          <Box as="p" noOfLines={1} whiteSpace="nowrap" textStyle={'body5'}>
            {children}
          </Box>
        </Tag>
      );
    case 'SDK':
      return (
        <Tag variant="colorful" fontSize="xs" color="#D196FF" bg="#2E2039">
          <Box as="p" noOfLines={1} whiteSpace="nowrap" textStyle={'body5'}>
            {children}
          </Box>
        </Tag>
      );
    case 'tool':
      return (
        <Tag variant="colorful" fontSize="xs" color="#FF8EFF" bg="#341E34">
          <Box as="p" noOfLines={1} whiteSpace="nowrap" textStyle={'body5'}>
            {children}
          </Box>
        </Tag>
      );
    case 'Wallet':
      return (
        <Tag variant="colorful" fontSize="xs" color="#4797C5" bg="#054265">
          <Box as="p" noOfLines={1} whiteSpace="nowrap" textStyle={'body5'}>
            {children}
          </Box>
        </Tag>
      );
    case 'game':
      return (
        <Tag variant="colorful" fontSize="xs" color="#05BE4F" bg="#003917">
          {children}
        </Tag>
      );
    case 'nft':
      return (
        <Tag variant="colorful" fontSize="xs" color="#D9873B" bg="#2E150B">
          <Box as="p" noOfLines={1} whiteSpace="nowrap" textStyle={'body5'}>
            {children}
          </Box>
        </Tag>
      );
    case 'filter':
      return (
        <Tag rounded="full" px="20px" py="8px" bg="#E0FFFD">
          <Box
            as="p"
            color="#14665B"
            noOfLines={1}
            whiteSpace="nowrap"
            textStyle={'body5'}
            fontWeight="600"
          >
            {children}
          </Box>
        </Tag>
      );

    default:
      return (
        <Tag
          ref={ref}
          rounded="full"
          variant="colorful"
          backgroundColor="#1D1F1E"
          fontSize="xs"
          p="8px 12px"
          mx={1}
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
  }
});

CustomTag.displayName = 'CustomTag';

export default CustomTag;
