import { Box, VStack } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';
import WalletBalance from '~/components/app/navbar-menu/WalletBalance';
import { useErrorBoundary } from '~/hooks/useErrorBoundary';
import VaultHeader from './VaultHeader';
import MultisigTransactions from './project-vault-tabs/Transactions';
import { useEffect } from 'react';
import { getAllTx } from '~/utils/vault';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';

const Vault = ({
  isLoading,
  multisigAddress,
  createKey,
}: {
  isLoading: boolean;
  multisigAddress: string | null | undefined;
  createKey: string;
}) => {
  const anchorWallet = useAnchorWallet();
  const { ErrorBoundaryWrapper } = useErrorBoundary();

  useEffect(() => {
    const fetchTx = async () => {
      const tx = await getAllTx(anchorWallet as NodeWallet, createKey);
    };

    fetchTx();
  }, []);

  return (
    <ErrorBoundaryWrapper>
      <VStack
        w="full"
        pt={'16px'}
        alignItems={'start'}
        px={{ base: '12px', sm: '16px', md: '24px' }}
        gap={{ base: '16px', sm: '20px', md: '24px' }}
      >
        <VaultHeader isLoading={isLoading} multiSigAddress={multisigAddress} />
        <Box height="1px" width="full" background={'neutral.3'} />
        <Tabs w="full" variant={'cubik'}>
          <TabList>
            <Tab>Assets</Tab>
            <Tab>Transactions</Tab>
          </TabList>
          <TabPanels w="full" p={'0'}>
            <TabPanel w="full">
              <Skeleton w="full" isLoaded={!isLoading}>
                <WalletBalance
                  size={'lg'}
                  walletAddress={multisigAddress as string}
                />
              </Skeleton>
            </TabPanel>
            <TabPanel w="full">
              <MultisigTransactions />
              <MultisigTransactions />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </ErrorBoundaryWrapper>
  );
};

export default Vault;
