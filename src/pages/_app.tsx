import AppLayout from '@/components/layout/AppLayout';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { trpc } from '../utils/trpc';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppLayout>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </AppLayout>
  );
}

export default trpc.withTRPC(MyApp);
