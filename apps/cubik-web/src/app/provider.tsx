"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@/utils/chakra";
import theme from "@/config/chakra.config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <CacheProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </CacheProvider>
    </QueryClientProvider>
  );
}
