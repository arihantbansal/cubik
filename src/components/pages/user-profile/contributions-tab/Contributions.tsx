import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  AvatarGroup,
  TableContainer,
  Box,
  Text,
  VStack,
  HStack,
  Avatar,
  Center,
} from '@chakra-ui/react';
import React from 'react';
import { BiChevronRight } from 'react-icons/bi';
import CustomTag from '~/components/common/tags/CustomTag';
import { USDC, BONK, SOL } from '~/components/common/tokens/token';
import CustomTagContainer from './CustomTagContainer';

const Contributions = () => {
  return (
    <TableContainer w="full">
      <Table variant="unstyled">
        <Thead>
          <Tr>
            <Th px="12px">
              <Text
                color="#ADB8B6"
                size="16px"
                textTransform={'capitalize'}
                fontWeight="500"
              >
                Projects
              </Text>
            </Th>
            <Th px="12px">
              <Text
                color="#ADB8B6"
                size="16px"
                textTransform={'capitalize'}
                fontWeight="500"
              >
                Category
              </Text>
            </Th>
            <Th px="12px">
              <Text
                color="#ADB8B6"
                size="16px"
                textTransform={'capitalize'}
                fontWeight="500"
              >
                Amount Contributed
              </Text>
            </Th>
            <Th px="12px">
              <Text
                color="#ADB8B6"
                size="16px"
                textTransform={'capitalize'}
                fontWeight="500"
              >
                Contributors
              </Text>
            </Th>
            <Th px="12px">
              <Text
                color="#ADB8B6"
                size="16px"
                textTransform={'capitalize'}
                fontWeight="500"
              >
                Total Amount Raised
              </Text>
            </Th>
            <Th px="12px"></Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr _hover={{ backgroundColor: '#0C0D0D' }}>
            <Td px="12px">
              <HStack align={'start'} gap="16px">
                <Avatar src="https://img.onesignal.com/permanent/0d9397a8-f8b4-469e-a109-734cce31c12c" />
                <VStack align={'start'} justify="center" gap="0">
                  <Box as="p" textStyle={'title4'} color="neutral.11">
                    Solsea
                  </Box>
                  <Box as="p" textStyle={'body5'} color="neutral.7">
                    by <b>@dhruvraj</b>
                  </Box>
                </VStack>
              </HStack>
            </Td>
            <Td px="12px">
              <CustomTag>NFTs</CustomTag>
            </Td>
            <Td px="12px">
              <HStack gap="8px" align={'center'}>
                <Center>
                  <USDC size={32} />
                </Center>
                <VStack justify={'center'} spacing="2px" align={'start'}>
                  <HStack align={'baseline'} color="white">
                    <Box as="p" textStyle={'title4'}>
                      1.0
                    </Box>
                    <Box as="p" textStyle={'title7'}>
                      USDC
                    </Box>
                  </HStack>
                  <Box as="p" color="neutral.8" textStyle={'body5'}>
                    1.0$
                  </Box>
                </VStack>
              </HStack>
            </Td>
            <Td px="12px">
              <HStack gap="0px" align={'center'} justify="start">
                <AvatarGroup size="sm" max={3} spacing="-4">
                  <Avatar
                    name="Prosper Otemuyiwa"
                    src="https://bit.ly/prosper-baba"
                  />
                  <Avatar
                    name="Christian Nwamba"
                    src="https://bit.ly/code-beast"
                  />
                  <Avatar
                    name="Segun Adebayo"
                    src="https://bit.ly/sage-adebayo"
                  />
                  <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
                  <Avatar
                    name="Prosper Otemuyiwa"
                    src="https://bit.ly/prosper-baba"
                  />
                  <Avatar
                    name="Christian Nwamba"
                    src="https://bit.ly/code-beast"
                  />
                </AvatarGroup>
                <Box as="p" color="white" textStyle={'body5'}>
                  +50
                </Box>
              </HStack>
            </Td>
            <Td px="12px">
              <Box as="p" textStyle={'title3'} color="neutral.11">
                $12,248.64
              </Box>
            </Td>
            <Td px="12px">
              <BiChevronRight size="24" />
            </Td>
          </Tr>
          <Tr _hover={{ backgroundColor: '#0C0D0D' }}>
            <Td px="12px">
              <HStack align={'start'} gap="16px">
                <Avatar src="https://solana.com/_next/image?url=%2Fapi%2Fprojectimg%2Fckx5uuxi6003009latrl4rkbn%3Ftype%3DLOGO&w=1920&q=75" />
                <VStack align={'start'} justify="center" gap="0">
                  <Box as="p" textStyle={'title4'} color="neutral.11">
                    Digital Eyes Market
                  </Box>
                  <Box as="p" textStyle={'body5'} color="neutral.7">
                    by <b>@irffan</b>
                  </Box>
                </VStack>
              </HStack>
            </Td>
            <Td px="12px">
              <HStack>
                <CustomTag>Wallet</CustomTag>
                <CustomTag>NFTs</CustomTag>
              </HStack>
            </Td>
            <Td px="12px">
              <HStack gap="8px" align={'center'}>
                <Center>
                  <BONK size={32} />
                </Center>
                <VStack justify={'center'} spacing="2px" align={'start'}>
                  <HStack align={'baseline'} color="white">
                    <Box as="p" textStyle={'title4'}>
                      2.0M
                    </Box>
                    <Box as="p" textStyle={'title7'}>
                      BONK
                    </Box>
                  </HStack>
                  <Box as="p" color="neutral.8" textStyle={'body5'}>
                    500.06$
                  </Box>
                </VStack>
              </HStack>
            </Td>
            <Td px="12px">
              <HStack gap="0px" align={'center'} justify="start">
                <AvatarGroup size="sm" max={3} spacing="-4">
                  <Avatar
                    name="Ryan Florence"
                    src="https://randomuser.me/api/portraits/women/76.jpg"
                  />
                  <Avatar
                    name="Segun Adebayo"
                    src="https://randomuser.me/api/portraits/women/6.jpg"
                  />
                  <Avatar
                    name="Christian Nwamba"
                    src="https://bit.ly/code-beast"
                  />
                </AvatarGroup>
                <Box as="p" color="white" textStyle={'body5'}>
                  +20
                </Box>
              </HStack>
            </Td>
            <Td px="12px">
              <Box as="p" textStyle={'title3'} color="neutral.11">
                $12,248.64
              </Box>
            </Td>
            <Td px="12px">
              <BiChevronRight size="24" />
            </Td>
          </Tr>
          <Tr _hover={{ backgroundColor: '#0C0D0D' }}>
            <Td px="12px">
              <HStack align={'start'} gap="16px">
                <Avatar src="https://solana.com/_next/image?url=%2Fapi%2Fprojectimg%2Fckwgwh8w830938eysxhy5e8syg%3Ftype%3DLOGO&w=1920&q=75" />
                <VStack align={'start'} justify="center" gap="0">
                  <Box as="p" textStyle={'title4'} color="neutral.11">
                    Solend
                  </Box>
                  <Box as="p" textStyle={'body5'} color="neutral.7">
                    by <b>@soju</b>
                  </Box>
                </VStack>
              </HStack>
            </Td>
            <Td px="12px">
              <CustomTagContainer />
            </Td>
            <Td px="12px">
              <HStack gap="8px" align={'center'}>
                <Center>
                  <SOL size={32} />
                </Center>
                <VStack justify={'center'} spacing="2px" align={'start'}>
                  <HStack align={'baseline'} color="white">
                    <Box as="p" textStyle={'title4'}>
                      1.5
                    </Box>
                    <Box as="p" textStyle={'title7'}>
                      SOL
                    </Box>
                  </HStack>
                  <Box as="p" color="neutral.8" textStyle={'body5'}>
                    33.33$
                  </Box>
                </VStack>
              </HStack>
            </Td>
            <Td px="12px">
              <HStack gap="0px" align={'center'} justify="start">
                <AvatarGroup size="sm" max={3} spacing="-4">
                  <Avatar
                    name="Ryan Florence"
                    src="https://randomuser.me/api/portraits/men/79.jpg"
                  />
                  <Avatar
                    name="Segun Adebayo"
                    src="https://randomuser.me/api/portraits/men/35.jpg"
                  />
                  <Avatar
                    name="Kent Dodds"
                    src="https://randomuser.me/api/portraits/men/46.jpg"
                  />
                  <Avatar
                    name="Prosper Otemuyiwa"
                    src="https://bit.ly/prosper-baba"
                  />
                  <Avatar
                    name="Christian Nwamba"
                    src="https://bit.ly/code-beast"
                  />
                  <Avatar
                    name="Segun Adebayo"
                    src="https://bit.ly/sage-adebayo"
                  />
                  <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
                  <Avatar
                    name="Prosper Otemuyiwa"
                    src="https://bit.ly/prosper-baba"
                  />
                  <Avatar
                    name="Christian Nwamba"
                    src="https://bit.ly/code-beast"
                  />
                </AvatarGroup>
                <Box as="p" color="white" textStyle={'body5'}>
                  +200
                </Box>
              </HStack>
            </Td>
            <Td px="12px">
              <Box as="p" textStyle={'title3'} color="neutral.11">
                $12,248.64
              </Box>
            </Td>
            <Td px="12px">
              <BiChevronRight size="24" />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default Contributions;
