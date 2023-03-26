import { Box, Button, Center, HStack, Stack, VStack } from '@chakra-ui/react';
import { WalletAddress } from '~/components/common/wallet/WalletAdd';

const VaultHeader = () => {
  return (
    <Stack direction={{ Base: 'row', md: 'column' }} w="full">
      <VStack alignItems={'start'}>
        <Box as="p" textStyle="title5" color={'neutral.8'}>
          Project Vault
        </Box>
        <HStack gap="6px" align={'end'}>
          <Box as="p" textStyle={'title1'} color="neutral.11">
            $5489.60
          </Box>
          <WalletAddress
            walletAddress={'8Fy7yHo7Sn7anUtG7VANLEDxCWbLjku1oBVa4VouEVVP'}
            size={'sm'}
            copy={true}
          />
        </HStack>
      </VStack>
      <Center w="full">
        <Button ml="auto" variant={'connect_wallet'}>
          Withdraw
        </Button>
      </Center>
    </Stack>
  );
};

export default VaultHeader;
