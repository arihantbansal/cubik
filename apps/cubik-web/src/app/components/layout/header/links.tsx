'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box, HStack, useMediaQuery } from '@chakra-ui/react';

const Links = () => {
  const [isDesktop] = useMediaQuery('(min-width: 768px)');

  const path = usePathname();

  const isActiveRoute = (route: string): boolean => {
    return path === route;
  };

  return isDesktop ? (
    <HStack
      gap={{ base: '28px', lg: '32px' }}
      alignItems={'center'}
      justifyContent={'flex-start'}
      // mx="auto"
    >
      <Link href="/projects">
        <Box
          as="p"
          textStyle={'title4'}
          color={isActiveRoute('/projects') ? 'neutral.11' : 'neutral.8'}
          cursor={'pointer'}
        >
          Projects
        </Box>
      </Link>
      <Link href="/grants">
        <Box
          as="p"
          textStyle={'title4'}
          color={isActiveRoute('/grants') ? 'neutral.11' : 'neutral.8'}
          cursor={'pointer'}
        >
          Grants
        </Box>
      </Link>
      <Link href="/hackathons">
        <Box
          as="p"
          textStyle={'title4'}
          color={isActiveRoute('/hackathons') ? 'neutral.11' : 'neutral.8'}
          cursor={'pointer'}
        >
          Hackathons
        </Box>
      </Link>
    </HStack>
  ) : null;
};

export default Links;
