import { Box, HStack } from '@chakra-ui/react';
import { Session } from 'next-auth'; // adjust this import as per your actual session type
import { BiError } from 'react-icons/bi';
import { useTokenBalance } from '~/hooks/useTokenBalance';
import { tokenGroup } from '~/interfaces/token';

type WalletBalanceErrorProps = {
  selectedToken: tokenGroup;
  data: Session | null; // adjust this type as per your actual session type
};

export const WalletBalanceError = ({
  selectedToken,
  data,
}: WalletBalanceErrorProps) => {
  const {
    data: balance,
    isError,
    error,
  } = useTokenBalance(
    selectedToken.mainNetAdd as string,
    data?.user.mainWallet as string
  );

  return isError || !balance ? (
    <HStack
      mt="8px"
      align={'center'}
      justify="center"
      spacing="8px"
      p="12px"
      rounded="8px"
      width="full"
      backgroundColor={'surface.red.1'}
    >
      <BiError size={18} color="#FFCAC2" />
      <Box as="p" color="surface.red.3" textStyle={'body4'}>
        {error?.message || 'Insufficient wallet balance'}
      </Box>
    </HStack>
  ) : null;
};
