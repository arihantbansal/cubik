import { Box, Tag } from '@chakra-ui/react';
import React from 'react';

const CustomTag = ({
  color,
  children,
}: {
  color: string;
  children: React.ReactChild;
}) => {
  switch (color) {
    case 'DAO':
      return (
        <Tag variant="colorful" fontSize="xs" color="#FF1F1F" bg="#3b1515">
          <Box as="p" textStyle={'body5'}>
            {children}
          </Box>
        </Tag>
      );
    case 'DeFi':
      return (
        <Tag variant="colorful" fontSize="xs" color="#73FF9A" bg="#042919">
          <Box as="p" textStyle={'body5'}>
            {children}
          </Box>
        </Tag>
      );
    case 'dapp':
      return (
        <Tag variant="colorful" fontSize="xs" color="#BFFF36" bg="#232916">
          <Box as="p" textStyle={'body5'}>
            {children}
          </Box>
        </Tag>
      );
    case 'framework':
      return (
        <Tag variant="colorful" fontSize="xs" color="#FFF066" bg="#2D2A14">
          <Box as="p" textStyle={'body5'}>
            {children}
          </Box>
        </Tag>
      );
    case 'analytics':
      return (
        <Tag variant="colorful" fontSize="xs" color="#7ABAFF" bg="#1B2127">
          <Box as="p" textStyle={'body5'}>
            {children}
          </Box>
        </Tag>
      );
    case 'dex':
      return (
        <Tag variant="colorful" fontSize="xs" color="#FF7A00" bg="#352B22">
          <Box as="p" textStyle={'body5'}>
            {children}
          </Box>
        </Tag>
      );
    case 'SDK':
      return (
        <Tag variant="colorful" fontSize="xs" color="#D196FF" bg="#2E2039">
          <Box as="p" textStyle={'body5'}>
            {children}
          </Box>
        </Tag>
      );
    case 'tool':
      return (
        <Tag variant="colorful" fontSize="xs" color="#FF8EFF" bg="#341E34">
          <Box as="p" textStyle={'body5'}>
            {children}
          </Box>
        </Tag>
      );
    case 'Wallet':
      return (
        <Tag variant="colorful" fontSize="xs" color="#4797C5" bg="#054265">
          <Box as="p" textStyle={'body5'}>
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
          <Box as="p" textStyle={'body5'}>
            {children}
          </Box>
        </Tag>
      );

    default:
      return (
        <Tag variant="colorful" fontSize="xs">
          <Box as="p" textStyle={'body5'}>
            {children}
          </Box>
        </Tag>
      );
  }
};

export default CustomTag;
