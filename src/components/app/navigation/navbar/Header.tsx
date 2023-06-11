import {
  Box,
  Button,
  Center,
  VStack,
  Container,
  Flex,
  HStack,
  useDisclosure,
  useMediaQuery,
  Stack,
} from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import Link from 'next/link';
import React, { memo } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import Logo from '~/components/common/logo/Logo';
import { SearchBar } from '~/components/common/searchbar';
import { MobileNavCollapsible } from './MobileNav';
import { isMobileOnly } from 'react-device-detect';
import { useRouter } from 'next/router';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export const Header = memo(function Header({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { connected } = useWallet();
  const router = useRouter();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [isDesktop] = useMediaQuery('(min-width: 768px)');
  const isCreateProfilePage = router.pathname !== '/create-profile';

  const isActiveRoute = (route: string): boolean => {
    return router.pathname === route;
  };

  const landingPage = router.pathname === '/';

  const NavbarCTA: React.FC<any> = ({ children }) => {
    return (
      <Center
        h={{ base: '2rem', md: '2.6rem' }}
        justifyContent="end"
        zIndex="99"
      >
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
            <Box
              as={RxHamburgerMenu}
              boxSize={'26px'}
              color="white"
              onClick={onToggle}
            />
          </HStack>
        )}
      </Center>
    );
  };

  const DeskNavbarItems = () => {
    return isDesktop && isCreateProfilePage ? (
      <>
        <SearchBar
          display={landingPage ? 'none' : 'flex'}
          width={{ base: 'full', sm: 'full', md: '8rem', lg: '14rem' }}
        />
        <HStack
          gap={{ base: '28px', lg: '32px' }}
          alignItems={'center'}
          justifyContent={landingPage ? 'center' : 'flex-start'}
          mx="auto"
        >
          <Button h="full" variant={'unstyled'} as={Link} href="/projects">
            <Box
              as="p"
              textStyle={'title4'}
              color={isActiveRoute('/projects') ? 'brand.teal5' : 'neutral.8'}
              cursor={'pointer'}
            >
              Projects
            </Box>
          </Button>
          <Button as={Link} href="/grants" h="full" variant={'unstyled'}>
            <Box
              as="p"
              textStyle={'title4'}
              color={isActiveRoute('/grants') ? 'brand.teal5' : 'neutral.8'}
              cursor={'pointer'}
            >
              Grants
            </Box>
          </Button>
          {/* <Button as={Link} href="/hackathons" h="full" variant={'unstyled'}>
            <Box
              as="p"
              textStyle={'title4'}
              color={isActiveRoute('/hackathons') ? 'brand.teal5' : 'neutral.8'}
              cursor={'pointer'}
            >
              Hackathons
            </Box>
          </Button> */}
        </HStack>
      </>
    ) : (
      <></>
    );
  };

  return (
    <>
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
          p={{ base: '14px 12px', sm: '16px 24px', md: '20px 20px' }}
          maxW="7xl"
          alignItems={'center'}
          justifyContent={'space-between'}
          gap={'24px'}
        >
          <HStack w="full" gap={{ base: '28px', lg: '32px' }}>
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
      {router.pathname === '/' ? (
        ''
      ) : (
        <Container
          display={connected ? 'none' : { base: 'block', md: 'none' }}
          w="full"
          zIndex="10"
          maxW={'full'}
          position="fixed"
          bottom="0px"
          minH={{ base: '4rem', md: '6rem' }}
          p="0"
          bg="#31F57908"
          sx={{
            backdropFilter: 'blur(70px)',
            margin: '0px !important',
            marginTop: '0px !important',
          }}
        >
          <HStack
            maxW="7xl"
            mx="auto"
            p={{ base: '16px', md: '32px' }}
            align={'center'}
            justify={'space-between'}
            gap="32px"
          >
            <VStack display={{ base: 'none', md: 'flex' }} align="start">
              <Box
                as="p"
                textStyle={{ base: 'title5', md: 'title3' }}
                color="white"
              >
                Get Started on Cubik
              </Box>
              <Box
                textAlign="start"
                as="p"
                textStyle={{ base: 'body5', md: 'body4' }}
                color="white"
              >
                Connect your wallet to get started with supporting your favorite
                project on cubik
              </Box>
            </VStack>
            <Stack direction={{ base: 'row', md: 'row' }}>
              <Button
                as={Link}
                href={`https://phantom.app/ul/browse/${encodeURIComponent(
                  router.asPath
                )}`}
                variant="cubikOutlined"
                size={{ base: 'cubikMini', md: 'cubikSmall' }}
                w="full"
              >
                Open In Phantom
              </Button>
              <WalletMultiButton>Connect another wallet</WalletMultiButton>
            </Stack>
          </HStack>
        </Container>
      )}
    </>
  );
});
