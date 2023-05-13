import {
  Avatar,
  Box,
  Center,
  HStack,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import { BiChevronRight } from 'react-icons/bi';
import { BONK, SOL, USDC } from '~/components/common/tokens/token';
import { TruncatedAddr } from '~/components/common/wallet/WalletAdd';

const TableLoading = () => {
  return (
    <Tbody width="full">
      <Tr>
        <Td p="8px">
          <Skeleton w="full" height="2rem" opacity="0.2" />
        </Td>
        <Td p="8px">
          <Skeleton w="full" height="2rem" opacity="0.2" />
        </Td>
        <Td p="8px">
          <Skeleton w="full" height="2rem" opacity="0.2" />
        </Td>
        <Td p="8px">
          <Skeleton w="full" height="2rem" opacity="0.2" />
        </Td>
      </Tr>
      <Tr>
        <Td p="8px">
          <Skeleton w="full" height="2rem" opacity="0.2" />
        </Td>
        <Td p="8px">
          <Skeleton w="full" height="2rem" opacity="0.2" />
        </Td>
        <Td p="8px">
          <Skeleton w="full" height="2rem" opacity="0.2" />
        </Td>
        <Td p="8px">
          <Skeleton w="full" height="2rem" opacity="0.2" />
        </Td>
      </Tr>
    </Tbody>
  );
};
const ProjectContributors = ({ isLoading }: { isLoading?: boolean }) => {
  return (
    <TableContainer w="full">
      <Table variant="unstyled">
        <Thead>
          <Tr>
            <Th px="12px">
              <Text
                color="#ADB8B6"
                size={{ base: '14px', md: '16px' }}
                textTransform={'capitalize'}
                fontWeight="500"
              >
                Contributor
              </Text>
            </Th>
            <Th px="12px">
              <Text
                color="#ADB8B6"
                size={{ base: '14px', md: '16px' }}
                textTransform={'capitalize'}
                fontWeight="500"
              >
                Amount
              </Text>
            </Th>
            <Th px="12px">
              <Text
                color="#ADB8B6"
                size={{ base: '14px', md: '16px' }}
                textTransform={'capitalize'}
                fontWeight="500"
              >
                Time
              </Text>
            </Th>
            <Th px="12px"></Th>
          </Tr>
        </Thead>
        {isLoading ? (
          <TableLoading />
        ) : (
          <Tbody>
            <Tr _hover={{ backgroundColor: '#0C0D0D' }}>
              <Td px="12px">
                <HStack align={'start'} gap={{ base: '8px', md: '16px' }}>
                  <Avatar
                    width={{ base: '36px', md: '44px' }}
                    height={{ base: '36px', md: '44px' }}
                    src="https://www.thismorningonchain.com/content/images/2022/01/solana-opensea-degenerate-ape.png"
                  />
                  <VStack
                    align={'start'}
                    justify="center"
                    spacing={{ base: '8px', md: '8px' }}
                  >
                    <Box
                      as="p"
                      textStyle={{ base: 'title6', md: 'title4' }}
                      color="neutral.11"
                    >
                      @monkeman
                    </Box>
                    <Box
                      as="p"
                      textStyle={{ base: 'body6', md: 'body5' }}
                      color="neutral.7"
                    >
                      {TruncatedAddr({
                        walletAddress:
                          'CgAK5s4aqQNWqxE3MKvzGLJ6fj7nm83uWDDMuiZQ85ik',
                      })}
                    </Box>
                  </VStack>
                </HStack>
              </Td>
              <Td px="12px">
                <HStack gap="8px" align={'center'}>
                  <Center>
                    <BONK size={28} />
                  </Center>
                  <VStack justify={'center'} spacing="2px" align={'start'}>
                    <HStack align={'baseline'} color="white">
                      <Box as="p" textStyle={{ base: 'title5', md: 'title4' }}>
                        222K
                      </Box>
                      <Box as="p" textStyle={{ base: 'title6', md: 'title7' }}>
                        BONK
                      </Box>
                    </HStack>
                    <Box
                      as="p"
                      color="neutral.8"
                      textStyle={{ base: 'body6', md: 'body5' }}
                    >
                      2.06$
                    </Box>
                  </VStack>
                </HStack>
              </Td>
              <Td px="12px">
                <Box
                  as="p"
                  textStyle={{ base: 'body5', md: 'body4' }}
                  color="neutral.11"
                >
                  8 hrs ago
                </Box>
              </Td>
              <Td px="12px">
                <BiChevronRight size="24" />
              </Td>
            </Tr>
            <Tr _hover={{ backgroundColor: '#0C0D0D' }}>
              <Td px="12px">
                <HStack align={'start'} gap={{ base: '8px', md: '16px' }}>
                  <Avatar
                    width={{ base: '36px', md: '44px' }}
                    height={{ base: '36px', md: '44px' }}
                    src="https://global-uploads.webflow.com/6241bcd9e666c1514401461d/6381252415e37a8c091e8eda_claynosaurz%20upcomingnftdrop%20nftmintradar.png"
                  />
                  <VStack
                    align={'start'}
                    justify="center"
                    spacing={{ base: '8px', md: '8px' }}
                  >
                    <Box
                      as="p"
                      textStyle={{ base: 'title6', md: 'title4' }}
                      color="neutral.11"
                    >
                      @claynosaurz
                    </Box>
                    <Box
                      as="p"
                      textStyle={{ base: 'body6', md: 'body5' }}
                      color="neutral.7"
                    >
                      {TruncatedAddr({
                        walletAddress:
                          'CgAK5s4aqQNWqxE3MKvzGLJ6fj7nm83uWDDMuiZQ85ik',
                      })}
                    </Box>
                  </VStack>
                </HStack>
              </Td>
              <Td px="12px">
                <HStack gap="8px" align={'center'}>
                  <Center>
                    <USDC size={28} />
                  </Center>
                  <VStack justify={'center'} spacing="2px" align={'start'}>
                    <HStack align={'baseline'} color="white">
                      <Box as="p" textStyle={{ base: 'title5', md: 'title4' }}>
                        1.0
                      </Box>
                      <Box as="p" textStyle={{ base: 'title6', md: 'title7' }}>
                        USDC
                      </Box>
                    </HStack>
                    <Box
                      as="p"
                      color="neutral.8"
                      textStyle={{ base: 'body6', md: 'body5' }}
                    >
                      1.0$
                    </Box>
                  </VStack>
                </HStack>
              </Td>
              <Td px="12px">
                <Box
                  as="p"
                  textStyle={{ base: 'body5', md: 'body4' }}
                  color="neutral.11"
                >
                  2 Days ago
                </Box>
              </Td>
              <Td px="12px">
                <BiChevronRight size="24" />
              </Td>
            </Tr>
            <Tr _hover={{ backgroundColor: '#0C0D0D' }}>
              <Td px="12px">
                <HStack align={'start'} gap={{ base: '8px', md: '16px' }}>
                  <Avatar
                    width={{ base: '36px', md: '44px' }}
                    height={{ base: '36px', md: '44px' }}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG4bEk_34lB67MpG_1YVEbXxOgfqGG3heKXX8JOtoFJV-0U5Ypkxg_Dp4wvNpftZsdIMw&usqp=CAU"
                  />
                  <VStack
                    align={'start'}
                    justify="center"
                    spacing={{ base: '8px', md: '8px' }}
                  >
                    <Box
                      as="p"
                      textStyle={{ base: 'title6', md: 'title4' }}
                      color="neutral.11"
                    >
                      @fff01
                    </Box>
                    <Box
                      as="p"
                      textStyle={{ base: 'body6', md: 'body5' }}
                      color="neutral.7"
                    >
                      {TruncatedAddr({
                        walletAddress:
                          '0kuj5s4aqQNWqxE3MKvzGLJ6fj7nm83uWDDMuiZQ8w45h',
                      })}
                    </Box>
                  </VStack>
                </HStack>
              </Td>
              <Td px="12px">
                <HStack gap="8px" align={'center'}>
                  <Center>
                    <BONK size={28} />
                  </Center>
                  <VStack justify={'center'} spacing="2px" align={'start'}>
                    <HStack align={'baseline'} color="white">
                      <Box as="p" textStyle={{ base: 'title5', md: 'title4' }}>
                        2.0M
                      </Box>
                      <Box as="p" textStyle={{ base: 'title6', md: 'title7' }}>
                        BONK
                      </Box>
                    </HStack>
                    <Box
                      as="p"
                      color="neutral.8"
                      textStyle={{ base: 'body6', md: 'body5' }}
                    >
                      500.06$
                    </Box>
                  </VStack>
                </HStack>
              </Td>
              <Td px="12px">
                <Box
                  as="p"
                  textStyle={{ base: 'body5', md: 'body4' }}
                  color="neutral.11"
                >
                  7 Days ago
                </Box>
              </Td>
              <Td px="12px">
                <BiChevronRight size="24" />
              </Td>
            </Tr>
            <Tr _hover={{ backgroundColor: '#0C0D0D' }}>
              <Td px="12px">
                <HStack align={'start'} gap={{ base: '8px', md: '16px' }}>
                  <Avatar
                    width={{ base: '36px', md: '44px' }}
                    height={{ base: '36px', md: '44px' }}
                    src="https://blog.mexc.com/wp-content/uploads/2022/09/DeGods.png"
                  />
                  <VStack
                    align={'start'}
                    justify="center"
                    spacing={{ base: '8px', md: '8px' }}
                  >
                    <Box
                      as="p"
                      textStyle={{ base: 'title6', md: 'title4' }}
                      color="neutral.11"
                    >
                      @frankdegods
                    </Box>
                    <Box
                      as="p"
                      textStyle={{ base: 'body6', md: 'body5' }}
                      color="neutral.7"
                    >
                      {TruncatedAddr({
                        walletAddress:
                          '7i9hkt4aqQNWqxE3MKvzGLJ6fj7nm83uWDDMuiZQ83ebgy',
                      })}
                    </Box>
                  </VStack>
                </HStack>
              </Td>
              <Td px="12px">
                <HStack gap="8px" align={'center'}>
                  <Center>
                    <SOL size={28} />
                  </Center>
                  <VStack justify={'center'} spacing="2px" align={'start'}>
                    <HStack align={'baseline'} color="white">
                      <Box as="p" textStyle={{ base: 'title5', md: 'title4' }}>
                        1.5
                      </Box>
                      <Box as="p" textStyle={{ base: 'title6', md: 'title7' }}>
                        SOL
                      </Box>
                    </HStack>
                    <Box
                      as="p"
                      color="neutral.8"
                      textStyle={{ base: 'body6', md: 'body5' }}
                    >
                      33.33$
                    </Box>
                  </VStack>
                </HStack>
              </Td>
              <Td px="12px">
                <Box
                  as="p"
                  textStyle={{ base: 'body5', md: 'body4' }}
                  color="neutral.11"
                >
                  10 Days ago
                </Box>
              </Td>
              <Td px="12px">
                <BiChevronRight size="24" />
              </Td>
            </Tr>
          </Tbody>
        )}
      </Table>
    </TableContainer>
  );
};

export default ProjectContributors;
