import React from 'react';
import {
  Button,
  ButtonGroup,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from '@/utils/chakra';

import { ContributorRow } from './ContributionRow';
import type { ContributionRowType } from './index';

interface Props {
  contribution: ContributionRowType[];
}
export const ContributionTable = ({ contribution }: Props) => {
  return (
    <>
      <TableContainer w="full">
        <Table w="full" minW="34rem" overflowX="scroll" variant="unstyled">
          <Thead color="neutral.8" fontFamily={'Plus Jakarta Sans, sans-serif'}>
            <Tr>
              <Th w={'40%'} p="0px 18px">
                <Text
                  fontSize={{ base: '12px', md: '14px' }}
                  textTransform={'capitalize'}
                  fontWeight="500"
                >
                  Contributor
                </Text>
              </Th>
              <Th w={'25%'} p="0px 18px">
                <ButtonGroup variant="unstyled" gap="8px" isAttached>
                  <Button
                    textAlign={'center'}
                    alignContent={'center'}
                    variant="unstyled"
                    fontWeight="500"
                    fontSize={{ base: '12px', md: '14px' }}
                    textTransform={'capitalize'}
                  >
                    Amount
                  </Button>
                </ButtonGroup>
              </Th>
              <Th w={'25%'} p="0px 18px">
                Time
              </Th>
              <Th w={'10%'} p="18px"></Th>
            </Tr>
          </Thead>

          <Tbody>
            {contribution?.length === 0 ? (
              <></>
            ) : (
              contribution?.map((contributor) => (
                <ContributorRow
                  key={contributor.id}
                  amount={contributor.totalAmount}
                  token={contributor.token}
                  timestamp={contributor.createdAt}
                  avatar={contributor.user.profilePicture as string}
                  usd={contributor.totalUsdAmount}
                  username={contributor.user.username as string}
                  walletAddress={contributor.user.mainWallet}
                  id={contributor.user.id}
                />
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>
      {/* {contributions?.length >= pageSize && (
        <Pagination
          currentPage={currentPage}
          totalCount={totalContributors}
          siblingCount={siblingCount}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          totalPages={totalPages}
        />
      )} */}
    </>
  );
};
