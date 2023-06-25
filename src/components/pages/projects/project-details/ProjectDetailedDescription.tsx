import { Box, Center, Stack, Text, VStack } from '@chakra-ui/layout';
import { SkeletonText } from '@chakra-ui/skeleton';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import { Link, LinkProps } from '@chakra-ui/react';
import ComponentErrors from '~/components/errors/ComponentErrors';

const ErrorUI = () => {
  return (
    <Center
      w="full"
      py={{ base: '16px', sm: '24px' }}
      border="1px dashed"
      borderColor={'#1D1F1E'}
      rounded="12px"
    >
      <ComponentErrors />
    </Center>
  );
};

export const ProjectsDetailedDescription = ({
  isError,
  isLoading,
  description,
  maxH,
  overflow,
}: {
  isError?: boolean;
  isLoading: boolean;
  description: string | null | undefined;
  maxH?: string;
  overflow?: string;
}) => {
  if (isError) {
    return <ErrorUI />;
  }

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
    <Stack alignSelf={'start'} w="full" direction={'column'} gap="0.5rem">
      <SkeletonText
        isLoaded={!isLoading}
        w="full"
        fadeDuration={3}
        noOfLines={5}
        opacity={isLoading ? '0.4' : '1'}
        skeletonHeight="16px"
        spacing="4"
      >
        <VStack
          maxH={maxH}
          overflow={overflow ? overflow : 'scroll'}
          align="start"
          gap="0.5rem"
        >
          <ReactMarkdown
            components={ChakraUIRenderer(newTheme)}
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
          >
            {description ? description : ''}
          </ReactMarkdown>
        </VStack>{' '}
      </SkeletonText>
    </Stack>
  );
};
