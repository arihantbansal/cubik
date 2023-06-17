import {
  Box,
  Container,
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';
import VaultHeader from './VaultHeader';
import WalletBalance from '~/components/app/navbar-menu/WalletBalance';
import MultisigTransactions from './project-vault-tabs/Transactions';
import { useErrorBoundary } from '~/hooks/useErrorBoundary';

const Vault = ({
  isLoading,
  multisigAddress,
}: {
  isLoading: boolean;
  multisigAddress: string | null | undefined;
}) => {
  const { ErrorBoundaryWrapper } = useErrorBoundary();
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
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </ErrorBoundaryWrapper>
  );
};

export default Vault;
