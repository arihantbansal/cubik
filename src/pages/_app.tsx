import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps, AppType } from 'next/app';
import dynamic from 'next/dynamic';
import { QueryClient, QueryClientProvider } from 'react-query';
import SEO from '~/components/SEO';
import AppLayout from '~/components/app';
import theme from '~/config/chakra.config';
import { Mixpanel } from '~/utils/mixpanel';
import { trpc } from '../utils/trpc';
const ChakraProvider = dynamic(() =>
  import('@chakra-ui/provider').then((mod) => mod.ChakraProvider)
);

require('@solana/wallet-adapter-react-ui/styles.css');

const WalletContext: any = dynamic(() => import('../context/wallet-context'), {
  ssr: false,
});

const queryClient = new QueryClient();
const MyApp: AppType = ({
  Component,
  pageProps: { ...pageProps },
}: AppProps) => {
  Mixpanel.track('root_load');

  return (
    <>
      <SEO
        title={`Cubik`}
        description={`Fund What Matters on Solana Through Community Voting On Solana `}
        image={`https://res.cloudinary.com/demonicirfan/image/upload/v1684179451/cubik%20og.png`}
      />
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
