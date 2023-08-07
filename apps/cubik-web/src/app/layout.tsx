"use client";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { VStack } from "@/utils/chakra";
import theme from "@/config/chakra.config";
import { Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/app/components/layout/header";
import WalletContext from "@/app/components/wallet/context";
import { AuthProvider } from "./context/user";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${jakarta.className}`}>
        <WalletContext>
          <AuthProvider>
            <ChakraProvider theme={theme}>
              <VStack maxW="full" w="100%" h="100vh" p="0" bg="black">
                <Header />
                <Box w="full" pt={10}>
                  {children}
                </Box>
              </VStack>
            </ChakraProvider>
          </AuthProvider>
        </WalletContext>
      </body>
    </html>
  );
}
