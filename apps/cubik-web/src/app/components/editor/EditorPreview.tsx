'use client';

import { Box, Link, Stack, Text, VStack } from '@/utils/chakra';
import type { LinkProps } from '@/utils/chakra';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

export const DescriptionPreview = ({
  description,
}: {
  description: string;
}) => {
  //const projectDescription = description[0] === '"' ? JSON.parse(description) : description;
  const newTheme = {
    a: (props: LinkProps) => {
      const { children } = props;
      return (
        <Link color="#A8F0E6" href={props.href} textDecor="none" isExternal>
          {children}
        </Link>
      );
    },
    p: (props: any) => {
      const { children } = props;
      return (
        <Text
          fontSize={{ base: '14px', md: '16px' }}
          lineHeight={{ base: '22px', md: '24px' }}
          fontWeight="400"
          letterSpacing="normal"
          color="#D7E0DF"
        >
          {children}
        </Text>
      );
    },
    h1: (props: any) => {
      const { children } = props;
      return (
        <Box as="p" textStyle={'title2'} color="#FFFFFF">
          {children}
        </Box>
      );
    },
    h2: (props: any) => {
      const { children } = props;
      return (
        <Box as="p" textStyle={'title2'} color="#FFFFFF">
          {children}
        </Box>
      );
    },
    h3: (props: any) => {
      const { children } = props;
      return (
        <Box as="p" textStyle={'title2'} color="#FFFFFF">
          {children}
        </Box>
      );
    },
    h4: (props: any) => {
      const { children } = props;
      return (
        <Box as="p" textStyle={'title2'} color="#FFFFFF">
          {children}
        </Box>
      );
    },
    h5: (props: any) => {
      const { children } = props;
      return (
        <Box as="p" textStyle={'title2'} color="#FFFFFF">
          {children}
        </Box>
      );
    },
    li: (props: any) => {
      const { children } = props;
      return (
        <Text
          as="li"
          ml="1rem"
          fontSize={{ base: '14px', md: '16px' }}
          lineHeight={{ base: '24px', md: '24px' }}
          fontWeight="400"
          letterSpacing="normal"
          color="#D7E0DF"
        >
          {children}
        </Text>
      );
    },
  };

  return (
    <Stack
      alignSelf={'start'}
      minH="10rem"
      w="full"
      direction={'column'}
      gap="0.5rem"
    >
      <VStack overflow={'scroll'} align="start" gap="0.5rem">
        <ReactMarkdown
          components={ChakraUIRenderer(newTheme)}
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[remarkGfm]}
        >
          {description ? description : ''}
        </ReactMarkdown>
      </VStack>
    </Stack>
  );
};
