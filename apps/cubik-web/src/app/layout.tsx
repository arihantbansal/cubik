'use client';

const WalletContext: any = dynamic(() => import('../context/wallet-context'), {
  ssr: false,
});
import { ChakraProvider } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

import { VStack } from '../utils/chakra';
import theme from '~/config/chakra.config';

import { Plus_Jakarta_Sans } from 'next/font/google';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${jakarta.className}`}>
        <WalletContext>
          <ChakraProvider theme={theme}>
            <VStack maxW="full" w="100%" h="100vh" p="0" bg="black">
              <WalletMultiButton />
              {/* {children} */}
            </VStack>
          </ChakraProvider>
        </WalletContext>
      </body>
    </html>
  );
}
