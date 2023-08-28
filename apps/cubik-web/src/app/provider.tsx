"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@/utils/chakra";
import theme from "@/config/chakra.config";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
  );
}
