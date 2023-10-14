import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps, AppType } from "next/app";
import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "react-query";
import AppLayout from "~/components/app";
import theme from "~/config/chakra.config";
import { Mixpanel } from "~/utils/mixpanel";
import { trpc } from "../utils/trpc";
import { ChakraProvider } from "@chakra-ui/react";

require("@solana/wallet-adapter-react-ui/styles.css");

const WalletContext: any = dynamic(() => import("../context/wallet-context"), {
  ssr: false,
});

const queryClient = new QueryClient();
const MyApp: AppType = ({
  Component,
  pageProps: { ...pageProps },
}: AppProps) => {
  Mixpanel.track("root_load");

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <WalletContext>
          <ChakraProvider theme={theme}>
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </ChakraProvider>
        </WalletContext>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </>
  );
};

export default trpc.withTRPC(MyApp);
