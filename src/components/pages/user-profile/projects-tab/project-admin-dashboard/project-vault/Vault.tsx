import { Box, Flex, Link, VStack } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';
import WalletBalance from '~/components/app/navbar-menu/WalletBalance';
import { useErrorBoundary } from '~/hooks/useErrorBoundary';
import VaultHeader from './VaultHeader';
import MultisigTransactions from './project-vault-tabs/Transactions';
import { useEffect, useState } from 'react';
import { VaultTx, getAllTx, getMsAddress } from '~/utils/vault';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import { TransactionAccount } from '@sqds/sdk';
import { Button } from '@chakra-ui/react';
import * as anchor from '@coral-xyz/anchor';
import { useUserStore } from '~/store/userStore';
import useGetTotalWalletBalanceInUSDC from '~/utils/wallet/useGetTotalWalletBalanceInUSDC';
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
  const [tx, setTx] = useState<VaultTx[]>([]);
  const [ms, setMS] = useState<string>('');
  const [key, setKey] = useState<string>('');
  const { user } = useUserStore();
  const [update, setUpdate] = useState<boolean>(false);
  const { balance } = useGetTotalWalletBalanceInUSDC(multisigAddress as string);

  useEffect(() => {
    const fetchTx = async () => {
      if (!createKey) return;
      const tx = await getAllTx(anchorWallet as NodeWallet, createKey);
      if (tx) {
        console.log('tx', tx);
        setTx(tx);
      } else {
        setTx([]);
      }
      const msAddress = await getMsAddress(
        anchorWallet as NodeWallet,
        createKey
      );
      setMS(msAddress);
      setKey(anchor.utils.bytes.base64.encode(Buffer.from(msAddress)));
    };

    fetchTx();
  }, [createKey, update]);

  return (
    <ErrorBoundaryWrapper>
      <VStack
        w="full"
        pt={'16px'}
        alignItems={'start'}
        px={{ base: '12px', sm: '16px', md: '24px' }}
        gap={{ base: '16px', sm: '20px', md: '24px' }}
      >
        <VaultHeader
          balance={balance}
          isLoading={isLoading}
          multiSigAddress={multisigAddress}
        />
        <Box height="1px" width="full" background={'neutral.3'} />
        <Tabs w="full" variant={'cubik'}>
          <TabList>
            <Tab>Transactions</Tab>
            <Tab>Assets</Tab>
          </TabList>
          <TabPanels w="full" p={'0'}>
            <TabPanel w="full">
              <Flex w="full" justify={'center'} align="center">
                {/* <Link
                  isExternal
                  border={'1px solid #8FFFF0'}
                  paddingY={2}
                  paddingX={4}
                  borderRadius={7}
                  href={'https://v3.squads.so/dashboard/' + key}
                >
                  Visit Squads
                </Link> */}
              </Flex>
              {tx.slice(tx.length - 1, tx.length).map((t, index) => {
                return (
                  <MultisigTransactions
                    usdcAmount={balance}
                    setUpdate={setUpdate}
                    ms={ms}
                    wallet={user?.mainWallet as string}
                    tx={t}
                    key={index.toString() + '000'}
                  />
                );
              })}
            </TabPanel>
            <TabPanel w="full">
              <Skeleton w="full" isLoaded={!isLoading}>
                <WalletBalance
                  size={'lg'}
                  walletAddress={multisigAddress as string}
                />
              </Skeleton>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </ErrorBoundaryWrapper>
  );
};

export default Vault;
