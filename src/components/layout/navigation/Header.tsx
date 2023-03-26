import {
  Box,
  Button,
  Center,
  Collapse,
  Container,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useBreakpointValue,
  useDisclosure,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Cross as Hamburger } from 'hamburger-react';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import NProgress from 'nprogress';
import React, { memo, useEffect, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { MdKeyboardArrowRight } from 'react-icons/md';
import Loader from '~/components/common/loader/Loading';
import Logo from '~/components/common/logo/Logo';
import { WalletAddress } from '~/components/common/wallet/WalletAdd';
import useLoadingStore from '~/store/pageLoadingStore';

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

const DeskNavMenu = () => {
  const { disconnect, publicKey } = useWallet();
  //const { user, setUser } = useUserStore();
  const router = useRouter();
  //const { setAuthenticationState } = useAuthStore();

  function handleSignOut() {
    // setUser(null);
    disconnect();
    //  setAuthenticationState(AuthState.NOT_AUTHENTICATED);
  }

  // if (!user?.username) return <>no username</>;

  return (
    <>
      <HStack gap="0.5rem">
        <Menu>
          <MenuButton
            backgroundColor={'transparent'}
            _hover={{
              backgroundColor: 'transparent',
            }}
            _active={{
              backgroundColor: 'transparent',
            }}
            _focus={{
              backgroundColor: 'transparent',
            }}
            as={Button}
            rightIcon={<BiChevronDown />}
            color="white"
            fontSize={'md'}
            //todo: set max width to prevent overflow of text
          >
            {/* {user?.username} */}
          </MenuButton>
          <MenuList bg="#121212" border="1px solid #222222">
            <HStack p="0.5rem 1rem" gap="0.5rem">
              {/* <Avatar size={'sm'} src={user?.icon} /> */}
              <VStack
                alignItems={'start'}
                justify="center"
                w="full"
                spacing="0"
              >
                {/* <Text fontSize="md">{user?.username}</Text> */}
                <WalletAddress
                  // @ts-ignore
                  walletAddress={'asdfasdfasdfasdfasdfasdfasdfasdf'}
                  size="xs"
                  copy={true}
                />
              </VStack>
            </HStack>
            <MenuDivider />
            <MenuItem
              mx="0.5rem"
              bg="transparent"
              rounded="md"
              onClick={() => {
                console.log('pushing to profile');
                router.push({
                  pathname: '/create-project',
                });
              }}
              sx={{
                width: '-webkit-fill-available',
              }}
              _hover={{
                backgroundColor: '#262626',
              }}
              _active={{
                backgroundColor: '#262626',
              }}
            >
              Create Project
            </MenuItem>
            <MenuItem
              mx="0.5rem"
              bg="transparent"
              rounded="md"
              onClick={() => {
                console.log('pushing to profile');
                router.push({
                  pathname: '/[username]',
                  query: { username: 'user?.username' },
                });
              }}
              sx={{
                width: '-webkit-fill-available',
              }}
              _hover={{
                backgroundColor: '#262626',
              }}
              _active={{
                backgroundColor: '#262626',
              }}
            >
              View Profile
            </MenuItem>
            <MenuItem
              mx="0.5rem"
              bg="transparent"
              rounded="md"
              sx={{
                width: '-webkit-fill-available',
              }}
              _hover={{
                backgroundColor: '#262626',
              }}
              _active={{
                backgroundColor: '#262626',
              }}
            >
              Projects
            </MenuItem>
            <MenuItem
              mx="0.5rem"
              bg="transparent"
              rounded="md"
              sx={{
                width: '-webkit-fill-available',
              }}
              _hover={{
                backgroundColor: '#262626',
              }}
              _active={{
                backgroundColor: '#262626',
              }}
            >
              Funding Rounds
            </MenuItem>
            <MenuItem
              mx="0.5rem"
              bg="transparent"
              rounded="md"
              sx={{
                width: '-webkit-fill-available',
              }}
              _hover={{
                backgroundColor: '#262626',
              }}
              _active={{
                backgroundColor: '#262626',
              }}
              as="button"
              onClick={handleSignOut}
            >
              Sign out
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </>
  );
};

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
      <Flex
        display={{ base: 'flex', lg: 'none' }}
        flexDirection="column"
        alignItems="start"
        fontSize="18px"
        p="1rem 2.5rem 2rem 2.5rem"
        gap="1.4rem"
      >
        {children}
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

const LOADER_PAGES = ['/connect-wallet', '/', '/contact'];

export const Header = memo(function Header({
  children,
}: {
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 768px)');
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
      top="4px"
      p="0"
      minH="4rem"
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
        maxW="7xl"
        alignItems={'center'}
        justifyContent={'space-between'}
        py={{ base: '1rem', md: '1.5rem' }}
        px="1.5rem"
      >
        <Box as="button" fontSize={'5xl'} onClick={() => router.push('/')}>
          <Logo />
        </Box>
        <HStack display={{ base: 'none', md: 'flex' }} pl="5rem" gap="1rem">
          <Link href="/projects" passHref>
            <Text fontSize="sm" fontWeight={'600'} cursor={'pointer'}>
              Projects
            </Text>
          </Link>
          <Link href="/events" passHref>
            <Text fontSize="sm" fontWeight={'600'} cursor={'pointer'}>
              Events
            </Text>
          </Link>
          <Link href="/blog" passHref>
            <Text fontSize="sm" fontWeight={'600'} cursor={'pointer'}>
              Blog
            </Text>
          </Link>
          <Link href="/forum" passHref>
            <Text fontSize="sm" fontWeight={'600'} cursor={'pointer'}>
              Forum
            </Text>
          </Link>
        </HStack>
        {children}
      </Flex>
      {/* <MobileNavCollapsible
        onClose={onClose}
        isOpen={isOpen}
        onToggle={onToggle}
      > */}
      {/* </MobileNavCollapsible> */}
    </Container>
  );
});

export function AuthHeader() {
  const [isSmallerThan800] = useMediaQuery('(max-width: 800px)');
  const { isOpen, onToggle, onClose } = useDisclosure();
  const router = useRouter();
  const { disconnect, publicKey } = useWallet();
  const pubKey = publicKey?.toBase58();

  if (!pubKey) return <></>;
  const addr = pubKey;
  let first = addr.slice(0, 4);
  let last = addr.slice(addr.length - 4, addr.length);
  let truncatedAddr = first + '...' + last;

  return (
    <Container
      zIndex="9"
      maxW={'full'}
      position="fixed"
      p="0"
      bg="transparent"
      sx={{
        backdropFilter: 'blur(10px)',
        margin: '0px !important',
        marginTop: '0px !important',
      }}
    >
      <Flex
        mx="auto"
        maxW="7xl"
        alignItems={'center'}
        justifyContent={'space-between'}
        py={{ base: '0.6rem', md: '1.5rem' }}
        px="1.5rem"
      >
        <Box as="button" fontSize={'5xl'} onClick={() => router.push('/')}>
          <Logo />
        </Box>

        {isSmallerThan800 ? (
          <Hamburger
            toggled={isOpen}
            toggle={onToggle}
            size={25}
            duration={0.4}
            color="white"
            hideOutline
            rounded
          />
        ) : (
          <>
            <HStack gap="1rem">
              <Link href="/projects" passHref>
                <Text fontSize="sm" fontWeight={'600'} cursor={'pointer'}>
                  Projects
                </Text>
              </Link>
              <Link href="/events" passHref>
                <Text fontSize="sm" fontWeight={'600'} cursor={'pointer'}>
                  Events
                </Text>
              </Link>
              <Link href="/blog" passHref>
                <Text fontSize="sm" fontWeight={'600'} cursor={'pointer'}>
                  Blog
                </Text>
              </Link>
              <Link href="/forum" passHref>
                <Text fontSize="sm" fontWeight={'600'} cursor={'pointer'}>
                  Forum
                </Text>
              </Link>
            </HStack>
            <DeskNavMenu />
          </>
        )}
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Flex
          display={{ base: 'flex', lg: 'none' }}
          flexDirection="column"
          alignItems="start"
          fontSize="18px"
          p="1rem 2.5rem 2rem 2.5rem"
          gap="1.4rem"
        >
          <Button w="full" variant={'outline'} borderColor="white">
            {truncatedAddr}
          </Button>
          <Button onClick={() => disconnect()} w="full" borderColor="white">
            Logout
          </Button>
          <Link href="/profile" style={{ width: '100%' }} passHref>
            <Flex
              direction={'row'}
              alignItems="center"
              justify={'space-between'}
              w="100%"
              // pb='1rem'
              // borderBottom='0.1px solid white'
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
                Profile
              </Box>
            </Flex>
          </Link>
          <Link href="/projects" style={{ width: '100%' }} passHref>
            <Flex
              direction={'row'}
              alignItems="center"
              justify={'space-between'}
              w="100%"
              // pb='1rem'
              // borderBottom='0.1px solid white'
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
              //pb='1rem'
              //   borderBottom='0.1px solid white'
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
          </Link>{' '}
        </Flex>
      </Collapse>
    </Container>
  );
}
