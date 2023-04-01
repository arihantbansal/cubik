import {
  Box,
  Button,
  Center,
  Collapse,
  Stack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

import { Link, LinkProps } from '@chakra-ui/react';

export const ProjectsDetailedDescription = ({
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
      <Box color="#FFFFFF" as="p" textStyle={'title2'} pb="0.6rem">
        About Project
      </Box>
      <Collapse startingHeight={'20rem'} in={isOpen} animateOpacity>
        <VStack align="start" gap="0.5rem">
          <ReactMarkdown
            components={ChakraUIRenderer(newTheme)}
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
          >
            {description}
          </ReactMarkdown>
        </VStack>
      </Collapse>
      <Center position="relative" height={isOpen ? '6rem' : '0'}>
        <Button
          background={
            'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%), linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)'
          }
          h="8rem"
          position={'absolute'}
          bottom="0"
          variant={'unstyled'}
          onClick={onToggle}
          w="full"
        >
          <Box
            border="1px solid white"
            rounded="8px"
            w="8rem"
            mx="auto"
            p="8px"
          >
            Read {isOpen ? 'Less' : 'More'}
          </Box>
        </Button>
      </Center>
    </Stack>
  );
};
