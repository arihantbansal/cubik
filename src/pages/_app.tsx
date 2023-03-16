import "../styles/globals.css";
import type { AppProps, AppType } from "next/app";
import { trpc } from "../utils/trpc";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionProvider>
    </>
  );
};

export default trpc.withTRPC(MyApp);
