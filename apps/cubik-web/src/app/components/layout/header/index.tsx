"use client";
import { Container, Flex, HStack } from "@/utils/chakra";
import React, { useEffect } from "react";
import Logo from "../../common/logo";
import Links from "./links";
import { WalletConnect } from "./auth/handleConnect";
import { useUser } from "@/app/context/user";

const Header = () => {
  const { setUser } = useUser();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userRes = await fetch("/api/auth/decode", {
          method: "GET",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const dataRes = await userRes.json();
        const user = dataRes.data;
        if (dataRes.data) {
          setUser({
            id: user.id,
            mainWallet: user.mainWallet,
            profilePicture: user.profilePicture,
            username: user.username,
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkAuth();
  }, []);
  return (
    <>
      <main>
        <Container
          w="100vw"
          zIndex="10"
          maxW={"full"}
          position="fixed"
          top="0px"
          left="0px"
          minH="3.6rem"
          p="0"
          bg="transparent"
          sx={{
            backdropFilter: "blur(18px)",
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
            <HStack flexGrow="1" gap={{ base: "28px", lg: "42px" }}>
              <Logo />
              <Links />
            </HStack>
            <WalletConnect />
          </Flex>
        </Container>
      </main>
    </>
  );
};

export default Header;
