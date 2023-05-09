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
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { memo } from 'react';
import { RxDotsVertical } from 'react-icons/rx';
import Logo from '~/components/common/logo/Logo';
import { SearchBar } from '~/components/common/searchbar';

const MobileNavCollapsible = memo(function MobileNavCollapsible({
  isOpen,
  onToggle,
  onClose,
  children,
}: {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  children?: React.ReactNode;
}) {
  const router = useRouter();
  let landingPage: boolean = false;
  if (router.pathname === '/') {
    landingPage = true;
  }
  return (
    <Collapse in={isOpen} animateOpacity>
      <Center
        display={landingPage ? 'none' : 'flex'}
        w="full"
        px="24px"
        pt={{ base: '16px', sm: '24px' }}
      >
        <SearchBar width={{ base: '100%', sm: '', md: '2rem' }} />
      </Center>
      <Flex
        display={{ base: 'flex', lg: 'none' }}
        flexDirection="column"
        alignItems="start"
        fontSize="18px"
        fontWeight={'700'}
        p="24px"
        pt="0px"
        gap={{ base: '16px', sm: '24px' }}
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

export const Header = memo(function Header({
  children,
}: {
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const { connected } = useWallet();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [isDesktop] = useMediaQuery('(min-width: 768px)');

  const isActiveRoute = (route: string): boolean => {
    return router.pathname === route;
  };

  let landingPage: boolean = false;
  if (router.pathname === '/') {
    landingPage = true;
  }

  const NavbarCTA: React.FC<any> = ({ children }) => {
    return (
      <Center h={{ base: '1.6rem', md: '2.6rem' }} justifyContent="end">
        <Center display={{ base: connected ? 'none' : 'flex', md: 'none' }}>
          <WalletMultiButton>Connect Wallet</WalletMultiButton>
        </Center>
        {isDesktop ? (
          <Center w="fit-content">{children}</Center>
        ) : (
          <HStack gap="0">
            {connected ? (
              <Center w={'100%'} display={{ base: 'flex', md: 'none' }} gap="0">
                {children}
              </Center>
            ) : (
              ''
            )}
            <RxDotsVertical size={24} color="white" onClick={onToggle} />
          </HStack>
        )}
      </Center>
    );
  };
  const DeskNavbarItems = () => {
    return isDesktop && router.pathname != '/create-profile' ? (
      <>
        <SearchBar
          display={landingPage ? 'none' : 'flex'}
          width={{ base: 'full', sm: 'full', md: '8rem', lg: '16rem' }}
        />
        <HStack
          gap={{ base: '28px', lg: '40px' }}
          alignItems={'center'}
          justifyContent={landingPage ? 'center' : 'flex-start'}
          mx="auto"
        >
          <Link href="/projects" passHref prefetch>
            <Box
              as="p"
              textStyle={'title4'}
              color={isActiveRoute('/projects') ? 'brand.teal5' : 'neutral.8'}
              cursor={'pointer'}
            >
              Projects
            </Box>
          </Link>
          <Link href="/grants" passHref prefetch>
            <Box
              as="p"
              textStyle={'title4'}
              color={isActiveRoute('/grants') ? 'brand.teal5' : 'neutral.8'}
              cursor={'pointer'}
            >
              Grants
            </Box>
          </Link>
        </HStack>
      </>
    ) : (
      <></>
    );
  };
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
      <Flex
        mx="auto"
        p={{ base: '20px 16px', md: '20px 20px' }}
        maxW="7xl"
        alignItems={'center'}
        justifyContent={'space-between'}
        gap={'24px'}
      >
        <HStack w="full" gap={{ base: '28px', lg: '40px' }}>
          <Logo />
          <DeskNavbarItems />
        </HStack>
        <NavbarCTA>{children}</NavbarCTA>
      </Flex>
      <MobileNavCollapsible
        onClose={onClose}
        isOpen={isOpen}
        onToggle={onToggle}
      />
    </Container>
  );
});
