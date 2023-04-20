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
} from '@chakra-ui/react';
import React from 'react';
import { BiChevronRight } from 'react-icons/bi';
import CustomTag from '~/components/common/tags/CustomTag';
import { TruncatedAddr } from '~/components/common/wallet/WalletAdd';

const Contributions = () => {
  return (
    <TableContainer w="full">
      <Table variant="unstyled">
        <Thead>
          <Tr>
            <Th>
              <Text
                color="#ADB8B6"
                size="16px"
                textTransform={'capitalize'}
                fontWeight="500"
              >
                Projects
              </Text>
            </Th>
            <Th>
              <Text
                color="#ADB8B6"
                size="16px"
                textTransform={'capitalize'}
                fontWeight="500"
              >
                Category
              </Text>
            </Th>
            <Th>
              <Text
                color="#ADB8B6"
                size="16px"
                textTransform={'capitalize'}
                fontWeight="500"
              >
                Status
              </Text>
            </Th>
            <Th>
              <Text
                color="#ADB8B6"
                size="16px"
                textTransform={'capitalize'}
                fontWeight="500"
              >
                Contributors
              </Text>
            </Th>
            <Th>
              <Text
                color="#ADB8B6"
                size="16px"
                textTransform={'capitalize'}
                fontWeight="500"
              >
                Total Amount Raised
              </Text>
            </Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>
              <HStack align={'start'} gap="16px">
                <Avatar src="https://img.onesignal.com/permanent/0d9397a8-f8b4-469e-a109-734cce31c12c" />
                <VStack align={'start'} justify="center" gap="0">
                  <Box as="p" textStyle={'title4'} color="neutral.11">
                    Solsea
                  </Box>
                  <Box as="p" textStyle={'body5'} color="neutral.7">
                    {TruncatedAddr({
                      walletAddress:
                        'CgAK5s4aqQNWqxE3MKvzGLJ6fj7nm83uWDDMuiZQ85ik',
                    })}
                  </Box>
                </VStack>
              </HStack>
            </Td>
            <Td>
              <CustomTag>NFTs</CustomTag>
            </Td>
            <Td>
              <VStack align={'start'} justify="center">
                <Box
                  as="p"
                  textStyle={'overline4'}
                  color="neutral.7"
                  textTransform={'capitalize'}
                >
                  Participating In
                </Box>
                <Box as="p" textStyle={'title4'} color="white">
                  Alpha Grant Round
                </Box>
              </VStack>
            </Td>
            <Td>
              <AvatarGroup size="sm" max={3} spacing="-4">
                <Avatar
                  name="Ryan Florence"
                  src="https://bit.ly/ryan-florence"
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
            </Td>
            <Td>
              <Box as="p" textStyle={'title3'} color="neutral.11">
                $12,248.64
              </Box>
            </Td>
            <Td>
              <BiChevronRight size="24" />
            </Td>
          </Tr>
          <Tr>
            <Td>
              <HStack align={'start'} gap="16px">
                <Avatar src="https://solana.com/_next/image?url=%2Fapi%2Fprojectimg%2Fckx5uuxi6003009latrl4rkbn%3Ftype%3DLOGO&w=1920&q=75" />
                <VStack align={'start'} justify="center" gap="0">
                  <Box as="p" textStyle={'title4'} color="neutral.11">
                    Digital Eyes Market
                  </Box>
                  <Box as="p" textStyle={'body5'} color="neutral.7">
                    {TruncatedAddr({
                      walletAddress:
                        '3c2x5s4aqQNWqxE3MKvzGLJ6fj7nm83uWDDMuiZQ6j8l',
                    })}
                  </Box>
                </VStack>
              </HStack>
            </Td>
            <Td>
              <HStack>
                <CustomTag>Wallet</CustomTag>
                <CustomTag>NFTs</CustomTag>
              </HStack>
            </Td>
            <Td>
              <VStack align={'start'} justify="center">
                <Box
                  as="p"
                  textStyle={'overline4'}
                  color="neutral.7"
                  textTransform={'capitalize'}
                >
                  Participating In
                </Box>
                <Box as="p" textStyle={'title4'} color="white">
                  Alpha Grant Round
                </Box>
              </VStack>
            </Td>
            <Td>
              <AvatarGroup size="sm" max={3} spacing="-4">
                <Avatar
                  name="Ryan Florence"
                  src="https://randomuser.me/api/portraits/women/76.jpg"
                />
                <Avatar
                  name="Segun Adebayo"
                  src="https://randomuser.me/api/portraits/women/6.jpg"
                />
              </AvatarGroup>
            </Td>
            <Td>
              <Box as="p" textStyle={'title3'} color="neutral.11">
                $12,248.64
              </Box>
            </Td>
            <Td>
              <BiChevronRight size="24" />
            </Td>
          </Tr>
          <Tr>
            <Td>
              <HStack align={'start'} gap="16px">
                <Avatar src="https://solana.com/_next/image?url=%2Fapi%2Fprojectimg%2Fckwgwh8w830938eysxhy5e8syg%3Ftype%3DLOGO&w=1920&q=75" />
                <VStack align={'start'} justify="center" gap="0">
                  <Box as="p" textStyle={'title4'} color="neutral.11">
                    Solend
                  </Box>
                  <Box as="p" textStyle={'body5'} color="neutral.7">
                    {TruncatedAddr({
                      walletAddress:
                        '4vhys4aqQNWqxE3MKvzGLJ6fj7nm83uWDDMuiZQi9lo',
                    })}
                  </Box>
                </VStack>
              </HStack>
            </Td>
            <Td>
              <HStack>
                <CustomTag>App</CustomTag>
                <CustomTag>Defi</CustomTag>
                <CustomTag>dApp</CustomTag>
              </HStack>
            </Td>
            <Td>
              <VStack align={'start'} justify="center">
                <Box
                  as="p"
                  textStyle={'overline4'}
                  color="neutral.7"
                  textTransform={'capitalize'}
                >
                  Participating In
                </Box>
                <Box as="p" textStyle={'title4'} color="white">
                  Alpha Grant Round
                </Box>
              </VStack>
            </Td>
            <Td>
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
            </Td>
            <Td>
              <Box as="p" textStyle={'title3'} color="neutral.11">
                $12,248.64
              </Box>
            </Td>
            <Td>
              <BiChevronRight size="24" />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default Contributions;
