import {
  Box,
  Center,
  Collapse,
  Container,
  Flex,
  HStack,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Turn as Hamburger } from 'hamburger-react';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import NProgress from 'nprogress';
import React, { memo, useEffect, useState } from 'react';
import Loader from '~/components/common/loader/Loading';
import Logo from '~/components/common/logo/Logo';
import { SearchBar } from '~/components/common/searchbar';

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});
Router.events.on('routeChangeError', () => {
  NProgress.done();
});

const MobileNavCollapsible = memo(function MobileNavCollapsible({
  isOpen,
  onToggle,
  onClose,
  children,
}: {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <Collapse in={isOpen} animateOpacity>
      <Center w="full" px="1.2rem">
        <SearchBar width={{ base: '100%' }} />
      </Center>
      <Flex
        display={{ base: 'flex', lg: 'none' }}
        flexDirection="column"
        alignItems="start"
        fontSize="18px"
        p="1rem 2.5rem 2rem 2.5rem"
        gap="1.4rem"
      >
        <Center w="full">{children}</Center>
        <Link href="/projects" style={{ width: '100%' }} passHref>
          <Flex
            direction={'row'}
            alignItems="center"
            justify={'space-between'}
            w="100%"
          >
            <Box
              display="flex"
              alignItems={'start'}
              w="100%"
              onClick={() => onToggle()}
              as="button"
              transition={'all 0.3s ease'}
              fontSize="15px"
              fontWeight="400"
            >
              Projects
            </Box>
          </Flex>
        </Link>
        <Link href="/rounds" style={{ width: '100%' }} passHref>
          <Flex
            direction={'row'}
            alignItems="center"
            justify={'space-between'}
            w="100%"
          >
            <Box
              display="flex"
              alignItems={'start'}
              w="100%"
              onClick={() => onClose()}
              as="button"
              transition={'all 0.3s ease'}
              fontSize="15px"
              fontWeight="400"
            >
              Funding Round
            </Box>
          </Flex>
        </Link>
      </Flex>
    </Collapse>
  );
});

const LOADER_PAGES = ['/submit-project', '/projects'];

export const Header = memo(function Header({
  children,
}: {
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const { connected } = useWallet();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [isDesktop] = useMediaQuery('(min-width: 768px)');
  const [isLoading, setIsLoading] = useState(false);

  const [currentRoute, setCurrentRoute] = useState('');

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsLoading(true);
    };
    const handleRouteChangeComplete = () => {
      setIsLoading(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router, setIsLoading]);

  useEffect(() => {
    setCurrentRoute(router.asPath);
  }, [router]);

  const shouldShowLoader = LOADER_PAGES.includes(currentRoute);

  return (
    <Container
      w="full"
      zIndex="10"
      maxW={'full'}
      position="fixed"
      top="0px"
      minH="4rem"
      p="0"
      bg="transparent"
      sx={{
        backdropFilter: 'blur(20px)',
        margin: '0px !important',
        marginTop: '0px !important',
      }}
    >
      {shouldShowLoader && <Loader />}
      <Flex
        mx="auto"
        p={{ base: '20px 24px', md: '20px 20px' }}
        maxW="7xl"
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <HStack gap="40px">
          <Box as="button" fontSize={'5xl'} onClick={() => router.push('/')}>
            <Logo />
          </Box>
          {isDesktop && router.pathname != '/create-profile' && (
            <>
              <SearchBar
                width={{ base: '12rem', sm: '13rem', md: '10rem', lg: '16rem' }}
              />
              <Link href="/projects" passHref prefetch>
                <Box
                  as="p"
                  textStyle={'title4'}
                  color="brand.teal5"
                  cursor={'pointer'}
                >
                  Projects
                </Box>
              </Link>
              <Link href="/grants" passHref prefetch>
                <Box
                  as="p"
                  textStyle={'title4'}
                  color="brand.teal5"
                  cursor={'pointer'}
                >
                  Grants
                </Box>
              </Link>
            </>
          )}
        </HStack>
        <Center
          h={{ base: '1.6rem', md: '2.6rem' }}
          justifyContent="end"
          w="full"
        >
          {isDesktop ? (
            <Center w="fit-content">{children}</Center>
          ) : (
            <HStack gap="0">
              {connected ? (
                <Center display={{ base: 'flex', md: 'none' }} gap="0">
                  {children}
                </Center>
              ) : (
                ''
              )}
              <Hamburger
                toggled={isOpen}
                toggle={onToggle}
                size={24}
                duration={0.4}
                color="#A8F0E6"
                hideOutline
                rounded
              />
            </HStack>
          )}
        </Center>
      </Flex>
      <MobileNavCollapsible
        onClose={onClose}
        isOpen={isOpen}
        onToggle={onToggle}
      >
        {connected ? '' : <WalletMultiButton />}
      </MobileNavCollapsible>
    </Container>
  );
});
