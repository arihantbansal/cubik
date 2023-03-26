import { ChakraProvider } from '@chakra-ui/react';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { AppProps, AppType } from 'next/app';
import dynamic from 'next/dynamic';
import AppLayout from '~/components/layout/AppLayout';
import theme from '~/config/chakra.config';
import { trpc } from '../utils/trpc';
require('@solana/wallet-adapter-react-ui/styles.css');

const WalletContext: any = dynamic(() => import('../context/wallet-context'), {
  ssr: false,
});

// Show a progress bar for page transitions

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
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
  );
};

export default trpc.withTRPC(MyApp);
