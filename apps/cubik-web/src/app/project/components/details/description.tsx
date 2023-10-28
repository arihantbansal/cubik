'use client';

import React, { useState } from 'react';
import type { LinkProps } from '@/utils/chakra';
import { Box, Button, Link, Stack, Text, VStack } from '@/utils/chakra';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

interface Props {
  longDescription: string;
}
export const Description = ({ longDescription }: Props) => {
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
  const isShortDescription = longDescription.length < 800;
  const [readMore, setReadMore] = useState<boolean>(false);
  return (
    <>
      <Stack
        alignSelf={'start'}
        minH="10rem"
        w="full"
        direction={'column'}
        gap="0.5rem"
      >
        <VStack
          position={'relative'}
          align="start"
          gap="0.5rem"
          w={'full'}
          overflow={'hidden'}
          maxW={{
            base: '20rem',
            md: 'full',
          }}
        >
          <ReactMarkdown
            components={ChakraUIRenderer(newTheme)}
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
          >
            {readMore ? longDescription : longDescription.slice(0, 800)}
          </ReactMarkdown>
          <Box
            position={'absolute'}
            bottom={0}
            left={0}
            display={isShortDescription ? 'none' : !readMore ? 'block' : 'none'}
            right={0}
            bg="linear-gradient(180deg, rgba(13, 13, 13, 0.00) -86.99%, #0D0D0D 100%)"
            w={'full'}
            h={'10rem'}
          ></Box>
          <Box pt={5}>
            {/* Need to update the icon */}
            <Button
              display={isShortDescription ? 'none' : 'flex'}
              p={0}
              rightIcon={
                <svg
                  width="13"
                  height="8"
                  viewBox="0 0 13 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1.5C2.46033 3.32735 4.17223 4.9641 6.09042 6.36775C6.33138 6.54408 6.66862 6.54408 6.90958 6.36775C8.82777 4.9641 10.5397 3.32735 12 1.5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              color={'white'}
              borderRadius={5}
              h={'full'}
              variant="ghost"
              w="full"
              minH={10}
              _hover={{
                bg: 'transparent',
              }}
              onClick={() => setReadMore(!readMore)}
            >
              Read {readMore ? 'Less' : 'More'}
            </Button>
          </Box>
        </VStack>
      </Stack>
    </>
  );
};
