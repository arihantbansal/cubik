import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  HStack,
  Skeleton,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { TransactionAccount } from '@sqds/sdk';
import { HiArrowNarrowUp } from 'react-icons/hi';
import NoInformation from '~/components/common/empty-state/NoInformation';
import { SOL, USDC } from '~/components/common/tokens/token';
import { TruncatedAddr } from '~/components/common/wallet/WalletAdd';
import { useErrorBoundary } from '~/hooks/useErrorBoundary';
import { formatNumberWithK } from '~/utils/formatWithK';
{
  /* <NoInformation /> */
}
interface Props {
  txAccount: TransactionAccount | null;
}
const MultisigTransactions = (props: Props) => {
  const { ErrorBoundaryWrapper } = useErrorBoundary();
  const isLoading = false;
  return (
    <Accordion
      w="full"
      display={'flex'}
      flexDir={'column'}
      gap={{ base: '16px', md: '24px' }}
      allowMultiple
      allowToggle
      variant={'unstyled'}
    >
      <ErrorBoundaryWrapper>
        <Skeleton
          isLoaded={!isLoading}
          fadeDuration={2.5}
          opacity={isLoading ? 0.5 : 1}
          w="full"
        >
          <AccordionItem
            overflow={'scroll'}
            w="full"
            outline="none"
            border="none"
          >
            <AccordionButton
              borderRadius="12px"
              backgroundColor={'neutral.2'}
              p="18px"
              _expanded={{
                backgroundColor: 'neutral.3',
                borderBottomLeftRadius: '0px',
                borderBottomRightRadius: '0px',
              }}
              _hover={{
                backgroundColor: 'neutral.3',
              }}
              w="full"
            >
              <HStack w="full" justify={'space-between'}>
                <HStack spacing="16px">
                  <Button
                    size={{ base: 'cubikMini', md: 'cubikSmall' }}
                    variant={'cubikAccept'}
                    isDisabled
                    iconSpacing={{ base: '2px', md: '2px' }}
                    //onClick={onOpen}
                    rightIcon={
                      <Box
                        as={HiArrowNarrowUp}
                        boxSize={{ base: '14px', md: '18px' }}
                        color="#31F579"
                      />
                    }
                  />
                  <VStack align="start" justify="center" spacing="4px">
                    <Box
                      as="p"
                      textStyle={{ base: 'title5', md: 'title4' }}
                      color="neutral.11"
                    >
                      Send
                    </Box>
                    <Box
                      as="p"
                      textStyle={{ base: 'body6', md: 'body5' }}
                      color="neutral.7"
                    >
                      Type
                    </Box>
                  </VStack>
                </HStack>
                <HStack gap="8px" align={'center'}>
                  <Center>
                    <SOL size={'28px'} />
                  </Center>
                  <VStack align="start" justify="center" spacing="4px">
                    <HStack align={'baseline'} color="white">
                      <Box
                        as="p"
                        textStyle={{ base: 'title5', md: 'title4' }}
                        color="neutral.11"
                      >
                        {formatNumberWithK(1)}
                      </Box>
                      <Box
                        as="p"
                        textStyle={{ base: 'title5', md: 'title4' }}
                        color="neutral.11"
                      >
                        SOL
                      </Box>
                    </HStack>
                    <Box
                      as="p"
                      textStyle={{ base: 'body4', md: 'body5' }}
                      color="neutral.7"
                    >
                      Amount
                    </Box>
                  </VStack>
                </HStack>
                <VStack align="start" justify="center" spacing="4px">
                  <Box
                    as="p"
                    textStyle={{ base: 'title5', md: 'title4' }}
                    color="neutral.11"
                  >
                    {TruncatedAddr({
                      walletAddress:
                        '8Fy7yHo7Sn7anUtG7VANLEDxCWbLjku1oBVa4VouEVVP',
                    })}
                  </Box>
                  <Box
                    as="p"
                    textStyle={{ base: 'body4', md: 'body5' }}
                    color="neutral.7"
                  >
                    Recipient Address
                  </Box>
                </VStack>
                <HStack align="start" justify="center" spacing="16px">
                  <VStack align="start" justify="center" spacing="4px">
                    <Box
                      as="p"
                      textStyle={{ base: 'title5', md: 'title4' }}
                      color="surface.green.2"
                    >
                      Active
                    </Box>
                    <Box
                      as="p"
                      textStyle={{ base: 'body4', md: 'body5' }}
                      color="neutral.7"
                    >
                      Status
                    </Box>
                  </VStack>
                  <Center p="8px">
                    <AccordionIcon display={{ base: 'none', md: 'block' }} />
                  </Center>
                </HStack>
              </HStack>
            </AccordionButton>
            <AccordionPanel
              backgroundColor={'neutral.3'}
              borderBottomRightRadius={'12px'}
              borderBottomLeftRadius={'12px'}
            >
              <Stack
                gap={{ base: '64px', sm: '72px', md: '32px' }}
                padding={{
                  base: '0px',
                  sm: '4px',
                  md: '16px',
                }}
                direction={{ base: 'column', lg: 'row' }}
              >
                <VStack
                  border="1px solid "
                  borderColor="neutral.5"
                  p="32px"
                  rounded="12px"
                  flex={'50%'}
                  align={'start'}
                  width="full"
                  spacing={{ base: '12px', sm: '16px', md: '18px' }}
                >
                  <Box
                    as="p"
                    textStyle={{ base: 'body4', md: 'body3' }}
                    color={'neutral.11'}
                  >
                    Info
                  </Box>
                  <VStack w="full">
                    <HStack justify={'space-between'} w="full">
                      <Box
                        as="p"
                        textStyle={{ base: 'body5', md: 'body4' }}
                        color={'neutral.8'}
                      >
                        Author
                      </Box>
                      <Box
                        as="p"
                        textStyle={{ base: 'title5', md: 'title4' }}
                        color="neutral.11"
                      >
                        {TruncatedAddr({
                          walletAddress:
                            '8Fy7yHo7Sn7anUtG7VANLEDxCWbLjku1oBVa4VouEVVP',
                        })}
                      </Box>
                    </HStack>
                    <HStack justify={'space-between'} w="full">
                      <Box
                        as="p"
                        textStyle={{ base: 'body5', md: 'body4' }}
                        color={'neutral.8'}
                      >
                        Created on
                      </Box>
                      <Box
                        as="p"
                        textStyle={{ base: 'title5', md: 'title4' }}
                        color="neutral.11"
                      >
                        Jul2, 2023, 10:02 PM
                      </Box>
                    </HStack>
                    <HStack justify={'space-between'} w="full">
                      <Box
                        as="p"
                        textStyle={{ base: 'body5', md: 'body4' }}
                        color={'neutral.8'}
                      >
                        Executed on
                      </Box>
                      <Box
                        as="p"
                        textStyle={{ base: 'title5', md: 'title4' }}
                        color="neutral.11"
                      >
                        n/a
                      </Box>
                    </HStack>
                    <HStack justify={'space-between'} w="full">
                      <Box
                        as="p"
                        textStyle={{ base: 'body5', md: 'body4' }}
                        color={'neutral.8'}
                      >
                        Transaction Link
                      </Box>
                      <Box
                        as="p"
                        textStyle={{ base: 'title5', md: 'title4' }}
                        color="neutral.11"
                      >
                        n/a
                      </Box>
                    </HStack>
                  </VStack>
                </VStack>
                <VStack
                  border="1px solid "
                  borderColor="neutral.5"
                  p="32px"
                  rounded="12px"
                  flex={'50%'}
                  align={'start'}
                  width="full"
                  justify={'space-between'}
                  spacing={{ base: '12px', sm: '16px', md: '18px' }}
                >
                  <Box
                    as="p"
                    textStyle={{ base: 'body4', md: 'body3' }}
                    color={'neutral.11'}
                  >
                    Results
                  </Box>
                  <HStack justify={'space-around'} spacing="32px" w="full">
                    <VStack justify={'space-between'} align="end">
                      <Box
                        as="p"
                        textStyle={{ base: 'body5', md: 'body4' }}
                        color={'neutral.8'}
                      >
                        Confirmed
                      </Box>
                      <Box
                        as="p"
                        textStyle={{ base: 'title3', md: 'title2' }}
                        color="surface.green.2"
                      >
                        1
                      </Box>
                    </VStack>
                    <VStack justify={'space-between'} align="end">
                      <Box
                        as="p"
                        textStyle={{ base: 'body5', md: 'body4' }}
                        color={'neutral.8'}
                      >
                        Rejected
                      </Box>
                      <Box
                        as="p"
                        textStyle={{ base: 'title3', md: 'title2' }}
                        color="surface.red.2"
                      >
                        0
                      </Box>
                    </VStack>
                    <VStack justify={'space-between'} align="end">
                      <Box
                        as="p"
                        textStyle={{ base: 'body5', md: 'body4' }}
                        color={'neutral.8'}
                      >
                        Threshold
                      </Box>
                      <Box
                        as="p"
                        textStyle={{ base: 'title3', md: 'title2' }}
                        color="neutral.11"
                      >
                        2/2
                      </Box>
                    </VStack>
                  </HStack>{' '}
                  <HStack justify={'space-between'} w="full">
                    <Button w="full" variant="cubikOutlined">
                      Reject
                    </Button>
                    <Button w="full" variant={'cubikFilled'}>
                      Confirm
                    </Button>
                  </HStack>
                </VStack>
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        </Skeleton>
      </ErrorBoundaryWrapper>
    </Accordion>
  );
};

export default MultisigTransactions;
