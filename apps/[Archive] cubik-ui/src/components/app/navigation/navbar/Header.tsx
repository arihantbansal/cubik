import {
  Box,
  Button,
  Center,
  Container,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  Flex,
  HStack,
  Icon,
  Stack,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { memo, useState } from "react";
import { MdClear } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import Logo from "~/components/common/logo/Logo";
import { SearchBar } from "~/components/common/searchbar";
import { MobileNavCollapsible } from "./MobileNav";
import { set } from "nprogress";
import SEO from "~/components/SEO";

export const Header = memo(function Header({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { connected } = useWallet();
  const router = useRouter();
  const {
    isOpen: isOpenDrawer,
    onOpen: onOpenDrawer,
    onClose: onCloseDrawer,
  } = useDisclosure();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [isDesktop] = useMediaQuery("(min-width: 768px)");
  const [drawerOpenedOnce, setDrawerOpenedOnce] = useState(true);
  const isCreateProfilePage = router.pathname !== "/create-profile";

  const isActiveRoute = (route: string): boolean => {
    return router.pathname === route;
  };

  const landingPage = router.pathname === "/";

  const NavbarCTA: React.FC<any> = ({ children }) => {
    return (
      <Center
        h={{ base: "2rem", md: "2.6rem" }}
        justifyContent="flex-end"
        alignItems="end"
        w="full"
        zIndex="99"
      >
        {isDesktop ? (
          <Center w="fit-content">{children}</Center>
        ) : (
          <HStack justify="end" align="center" w="full" gap="12px">
            <Center display={{ base: "flex", md: "none" }} gap="12px">
              {children}
              <Box
                as={RxHamburgerMenu}
                boxSize={"26px"}
                color="white"
                onClick={onToggle}
              />{" "}
            </Center>
          </HStack>
        )}
      </Center>
    );
  };

  setTimeout(() => {
    if (!connected && drawerOpenedOnce) {
      setDrawerOpenedOnce(false);
      onOpenDrawer();
    }
  }, 2000);

  const DeskNavbarItems = () => {
    return isDesktop && isCreateProfilePage ? (
      <>
        <SearchBar
          display={landingPage ? "none" : "flex"}
          width={{ base: "full", sm: "full", md: "8rem", lg: "14rem" }}
        />
        <HStack
          gap={{ base: "28px", lg: "32px" }}
          alignItems={"center"}
          justifyContent={landingPage ? "center" : "flex-start"}
          mx="auto"
        >
          <Link href="/projects">
            <Box
              as="p"
              textStyle={"title4"}
              color={isActiveRoute("/projects") ? "brand.teal5" : "neutral.8"}
              cursor={"pointer"}
            >
              Projects
            </Box>
          </Link>
          <Link href="/grants">
            <Box
              as="p"
              textStyle={"title4"}
              color={isActiveRoute("/grants") ? "brand.teal5" : "neutral.8"}
              cursor={"pointer"}
            >
              Grants
            </Box>
          </Link>
          <Link href="/hackathons">
            <Box
              as="p"
              textStyle={"title4"}
              color={isActiveRoute("/hackathons") ? "brand.teal5" : "neutral.8"}
              cursor={"pointer"}
            >
              Hackathons
            </Box>
          </Link>
        </HStack>
      </>
    ) : (
      <></>
    );
  };

  return (
    <>
      <SEO
        title={`Cubik`}
        description={`Fund What Matters on Solana Through Community Voting`}
        image={`https://res.cloudinary.com/demonicirfan/image/upload/v1687261386/OG_Image_-_Landing_page_5_-min_lxcnes.png`}
      />
      <main>
        <Container
          w="full"
          zIndex="10"
          maxW={"full"}
          position="fixed"
          top="0px"
          minH="4rem"
          p="0"
          bg="transparent"
          sx={{
            backdropFilter: "blur(20px)",
            margin: "0px !important",
            marginTop: "0px !important",
          }}
        >
          <Flex
            mx="auto"
            p={{ base: "14px 12px", sm: "16px 24px", md: "20px 20px" }}
            maxW="7xl"
            alignItems={"center"}
            justifyContent={"space-between"}
            gap={"24px"}
          >
            <HStack w="full" gap={{ base: "28px", lg: "32px" }}>
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
      </main>
      {/* {router.pathname === '/' ? (
        ''
      ) : (
        <Drawer
          placement="bottom"
          autoFocus={false}
          blockScrollOnMount={false}
          onClose={onCloseDrawer}
          isOpen={isOpenDrawer}
          variant={'none'}
        >
          <DrawerContent h="fit-content" bg="transparent">
            <Container
              display={connected ? 'none' : { base: 'block', md: 'none' }}
              w="90%"
              left="5%"
              bottom="1rem"
              rounded="12px"
              zIndex="10"
              maxW={'full'}
              position="fixed"
              minH={{ base: '4rem', md: '6rem' }}
              p="18px"
              bg="#31F57903"
              border="1px solid"
              borderColor={'#31F57915'}
              sx={{
                backdropFilter: 'blur(40px)',
                margin: '0px !important',
                marginTop: '0px !important',
              }}
            >
              <Center position={'absolute'} right="4%" top="6%">
                <Icon
                  as={DrawerCloseButton}
                  onClick={onCloseDrawer}
                  border="1px solid"
                  borderColor="#091F12"
                  backgroundColor={'#091F1240'}
                  h="34px"
                  w="34px"
                  p="8px"
                  color="neutral.8"
                  rounded="full"
                >
                  <MdClear />
                </Icon>
              </Center>
              <VStack
                maxW="7xl"
                mx="auto"
                p={{ base: '16px', md: '32px' }}
                align={'center'}
                justify={'space-between'}
                gap="18px"
              >
                <VStack align="start">
                  <Box
                    as="p"
                    textStyle={{ base: 'title2' }}
                    fontWeight={'700'}
                    color="white"
                  >
                    Welcome to Cubik
                  </Box>
                  <Box
                    textAlign="start"
                    as="p"
                    textStyle={{ base: 'body5', md: 'body4' }}
                    color="neutral.9"
                  >
                    Discover top projects in the ecosystem and help us
                    distribute resources to the best ones.
                  </Box>
                </VStack>
                <Stack
                  h="full"
                  w="full"
                  align="start"
                  direction={{ base: 'row' }}
                >
                  <Button
                    variant={'cubikFilled'}
                    size={'cubikMini'}
                    as={WalletMultiButton}
                    // backgroundColor={'neutral.6'}
                    // outline={'1px solid'}
                    // outlineColor={'neutral.4'}
                    // color={'neutral.10'}
                    h="2.4rem"
                    w="60%"
                  >
                    Connect Wallet
                  </Button>
                  <Center
                    as={Link}
                    href={`https://phantom.app/ul/browse/${encodeURIComponent(
                      'https://cubik.so'
                    )}`}
                    width={'3rem'}
                    height={'2.5rem'}
                    p="12px"
                    border="1px solid"
                    borderColor="neutral.5"
                    backgroundColor={'neutral.3'}
                    rounded="8px"
                  >
                    <svg
                      width="27"
                      height="23"
                      viewBox="0 0 27 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M25.1914 11.0582H22.1945C22.1945 4.95077 17.2262 0 11.097 0C5.04379 0 0.122408 4.82957 0.00195818 10.8324C-0.122652 17.0374 5.71948 22.4256 11.9473 22.4256H12.7307C18.2213 22.4256 25.5804 18.1427 26.7302 12.9243C26.9425 11.9624 26.18 11.0582 25.1914 11.0582ZM6.64354 11.3303C6.64354 12.147 5.97316 12.815 5.15353 12.815C4.33389 12.815 3.66355 12.1467 3.66355 11.3303V8.92837C3.66355 8.11167 4.33389 7.44367 5.15353 7.44367C5.97316 7.44367 6.64354 8.11167 6.64354 8.92837V11.3303ZM11.8173 11.3303C11.8173 12.147 11.147 12.815 10.3274 12.815C9.50774 12.815 8.83744 12.1467 8.83744 11.3303V8.92837C8.83744 8.11167 9.50804 7.44367 10.3274 7.44367C11.147 7.44367 11.8173 8.11167 11.8173 8.92837V11.3303Z"
                        fill="white"
                      />
                    </svg>
                  </Center>
                 <Center
                    as="button" // todo use
                    width={'3rem'}
                    height={'2.5rem'}
                    p="12px"
                    border="1px solid"
                    borderColor="neutral.4"
                    backgroundColor={'neutral.3'}
                    rounded="8px"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.4162 20.5541C18.1738 22.7658 15.1496 24.004 12 24C8.85757 24.0047 5.83965 22.7719 3.59924 20.5684C8.51329 16.6979 15.4966 16.6934 20.4162 20.5541ZM20.5541 20.4162C22.7658 18.1738 24.004 15.1496 24 12C24 8.72948 22.6918 5.76561 20.5706 3.60034C16.6979 8.52873 16.6934 15.4977 20.5541 20.4162ZM20.4339 3.46356C15.5077 7.34406 8.50226 7.33855 3.58048 3.44922C5.82306 1.23529 8.84871 -0.00422473 12 1.08194e-05C15.2871 1.08194e-05 18.2664 1.32256 20.4339 3.46356ZM3.44922 3.58048C1.23529 5.82306 -0.00422474 8.84871 1.08194e-05 12C1.08194e-05 15.2882 1.32256 18.2664 3.46356 20.4339C7.34406 15.5077 7.33855 8.50225 3.44922 3.58048Z"
                        fill="white"
                      />
                    </svg>
                  </Center>  
                </Stack>
              </VStack>
            </Container>
          </DrawerContent>
        </Drawer>
      )} */}
    </>
  );
});
