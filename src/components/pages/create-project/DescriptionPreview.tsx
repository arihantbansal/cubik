import { Box, Stack, useDisclosure, VStack } from '@chakra-ui/react';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import { Link, LinkProps } from '@chakra-ui/react';

export const DescriptionPreview = ({
  description,
}: {
  description: string;
}) => {
  //const projectDescription = description[0] === '"' ? JSON.parse(description) : description;
  const { isOpen, onToggle } = useDisclosure();

  const newTheme = {
    a: (props: LinkProps) => {
      const { children } = props;
      return (
        <Link color="#31F579" href={props.href} isExternal>
          {children}
        </Link>
      );
    },
    p: (props: any) => {
      const { children } = props;
      return (
        <Box as="p" textStyle={{ base: 'body4', md: 'body3' }} color="#D7E0DF">
          {children}
        </Box>
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
        <Box
          _before={{
            content: '"•"',
            color: '#D7E0DF',
            display: 'inline-block',
            width: '1rem',
            marginLeft: '-1rem',
          }}
          as="p"
          textStyle={{ base: 'body4', md: 'body3' }}
          color="#D7E0DF"
        >
          {children}
        </Box>
      );
    },
  };

  return (
    <Stack alignSelf={'start'} w="full" direction={'column'} gap="0.5rem">
      <VStack align="start" gap="0.5rem">
        <ReactMarkdown
          components={ChakraUIRenderer(newTheme)}
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[remarkGfm]}
        >
          {description}
        </ReactMarkdown>
      </VStack>
    </Stack>
  );
};
