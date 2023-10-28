import React from 'react';
import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@/utils/chakra';

interface Props {
  children: React.JSX.Element[];
}

export const ContributionTable = ({ children }: Props) => {
  return (
    <>
      <TableContainer w="full">
        <Table variant="unstyled">
          <Thead>
            <Tr>
              <Th w="20%" px="12px">
                <Box
                  as="p"
                  color="#ADB8B6"
                  textStyle={{ base: 'body4', md: 'body3' }}
                  textTransform={'capitalize'}
                >
                  Projects
                </Box>
              </Th>
              <Th w="25%" px="12px">
                <Box
                  as="p"
                  color="#ADB8B6"
                  textStyle={{ base: 'body4', md: 'body3' }}
                  textTransform={'capitalize'}
                >
                  Category
                </Box>
              </Th>
              <Th w="15%" px="12px">
                <Box
                  as="p"
                  color="#ADB8B6"
                  textStyle={{ base: 'body4', md: 'body3' }}
                  textTransform={'capitalize'}
                >
                  Amount Contributed
                </Box>
              </Th>
              <Th w="20%" px="12px">
                <Box
                  as="p"
                  color="#ADB8B6"
                  textStyle={{ base: 'body4', md: 'body3' }}
                  textTransform={'capitalize'}
                >
                  Round
                </Box>
              </Th>
              <Th w="15%" px="12px">
                <Box
                  as="p"
                  color="#ADB8B6"
                  textStyle={{ base: 'body4', md: 'body3' }}
                  textTransform={'capitalize'}
                  fontWeight="500"
                >
                  Total Amount Raised
                </Box>
              </Th>
              <Th w="5%" px="12px"></Th>
            </Tr>
          </Thead>
          <Tbody>{children}</Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
