"use client";
import React from "react";
import theme from "@/config/chakra.config";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@/utils/chakra";
interface Props {
  children: React.ReactNode;
}
export const Provider = ({ children }: Props) => {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
  );
};
