"use client";
import { VStack } from "@/utils/chakra";
import { Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/app/components/layout/header";
import WalletContext from "@/app/components/wallet/context";
import { AuthProvider } from "./context/user";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Providers } from "./provider";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [client] = useState(() => new QueryClient());
  return (
    <html lang="en">
      <body className={`${jakarta.className}`}>
        <WalletContext>
          <QueryClientProvider client={client}>
            <AuthProvider>
              <Providers>
                <VStack mt={10} maxW="full" w="100%" h="100vh" p="0" bg="black">
                  <Header />
                  {children}
                </VStack>
              </Providers>
            </AuthProvider>
          </QueryClientProvider>
        </WalletContext>
      </body>
    </html>
  );
}
