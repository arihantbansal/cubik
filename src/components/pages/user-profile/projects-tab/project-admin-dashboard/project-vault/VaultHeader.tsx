import { Box, Button, Center, HStack, Stack, VStack } from '@chakra-ui/react';
import { WalletAddress } from '~/components/common/wallet/WalletAdd';

const VaultHeader = () => {
  return (
    <Stack
      direction={{ base: 'column', md: 'row' }}
      gap={{ base: '16px', sm: '20px', md: '24px' }}
      w="full"
    >
      <VStack alignItems={'start'}>
        <Box
          as="p"
          textStyle={{ base: 'title6', sm: 'title6', md: 'title5' }}
          color={'neutral.8'}
        >
          Project Vault
        </Box>
        <HStack gap="6px" align={{ base: 'center', md: 'center' }}>
          <Box
            as="p"
            textStyle={{ base: 'title3', sm: 'title2', md: 'title1' }}
            color="neutral.11"
          >
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
        <Button
          w={{ base: 'full', md: 'auto' }}
          ml="auto"
          variant={'connect_wallet'}
        >
          Withdraw
        </Button>
      </Center>
    </Stack>
  );
};

export default VaultHeader;
