import { ChakraProvider } from '@chakra-ui/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { AppProps, AppType } from 'next/app';
import dynamic from 'next/dynamic';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppLayout from '~/components/app';
import theme from '~/config/chakra.config';
import { Mixpanel } from '~/utils/mixpanel';
import { trpc } from '../utils/trpc';
require('@solana/wallet-adapter-react-ui/styles.css');

const WalletContext: any = dynamic(() => import('../context/wallet-context'), {
  ssr: false,
});

const queryClient = new QueryClient();
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  Mixpanel.track('root_load');
  return (
    <QueryClientProvider client={queryClient}>
      <WalletContext>
        <SessionProvider
          session={session}
          refetchInterval={5 * 60}
          refetchOnWindowFocus={true}
        >
          <ChakraProvider theme={theme}>
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </ChakraProvider>
        </SessionProvider>
      </WalletContext>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
};

export default trpc.withTRPC(MyApp);
