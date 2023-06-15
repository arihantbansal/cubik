import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Center,
  HStack,
  IconButton,
  Skeleton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BiChevronDown, BiChevronRight, BiChevronUp } from 'react-icons/bi';
import ContributionsEmptyState from '~/components/common/empty-state/ContributionsEmptyState';
import Pagination from '~/components/common/pagination/Pagination';
import { SOL, USDC } from '~/components/common/tokens/token';
import Username from '~/components/common/username/Username';
import { TruncatedAddr } from '~/components/common/wallet/WalletAdd';
import Contributors from '~/components/pages/user-profile/projects-tab/project-admin-dashboard/project-vault/project-vault-tabs/Contributors';
import { UserProof } from '~/types/user';
import { formatNumberWithK } from '~/utils/formatWithK';
import { timeSince } from '~/utils/gettimeSince';
import { trpc } from '~/utils/trpc';

type Contributor = {
  id: string;
  avatar: string;
  username: string;
  walletAddress: string;
  amount: number;
  currentusdTotal: number;
  timestamp: string;
  token: string;
  [key: string]: any;
};

type ContributorRowProps = {
  contributor: Contributor;
};

const formatContributorData = (data: any): Contributor[] => {
  const finalData: Contributor[] = [];

  data?.forEach((contributor: any) => {
    finalData.push({
      id: contributor.id,
      avatar: contributor.user.profilePicture,
      username: contributor.user.username,
      walletAddress: contributor.user.mainWallet,
      amount: contributor.total,
      currentusdTotal: contributor.usdTotal,
      timestamp: contributor.createdAt,
      token: contributor.token,
    });
  });

  return finalData;
};

export const TableLoading = () => {
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

export const ContributorRow: React.FC<ContributorRowProps> = ({
  contributor,
}) => {
  console.log('contributors - ', contributor);
  return (
    <Tr _hover={{ backgroundColor: '#0C0D0D' }}>
      <Td p="18px">
        <HStack align={'start'} gap={{ base: '8px', md: '16px' }}>
          <Avatar
            width={{ base: '36px', md: '44px' }}
            height={{ base: '36px', md: '44px' }}
            src={contributor.avatar}
          />
          <VStack
            align={'start'}
            justify="center"
            spacing={{ base: '8px', md: '8px' }}
          >
            <Username
              isLoading={false}
              username={contributor?.username}
              proofs={(contributor?.proof as unknown as UserProof[]) ?? []}
              size="sm"
            />
            <Box
              as="p"
              textStyle={{ base: 'body6', md: 'body5' }}
              color="neutral.7"
            >
              {TruncatedAddr({
                walletAddress: contributor.walletAddress,
              })}
            </Box>
          </VStack>
        </HStack>
      </Td>
      <Td p="18px">
        <HStack gap="8px" align={'center'}>
          <Center>
            {contributor.token.includes('sol') ? (
              <SOL size={28} />
            ) : (
              <USDC size={28} />
            )}
          </Center>
          <VStack justify={'center'} spacing="2px" align={'start'}>
            <HStack align={'baseline'} color="white">
              <Box as="p" textStyle={{ base: 'title5', md: 'title4' }}>
                {formatNumberWithK(contributor.amount)}
              </Box>
              <Box as="p" textStyle={{ base: 'title6', md: 'title7' }}>
                {contributor.token.toUpperCase()}
              </Box>
            </HStack>
            <Box
              as="p"
              color="neutral.8"
              textStyle={{ base: 'body6', md: 'body5' }}
            >
              {formatNumberWithK(contributor.currentusdTotal)}$
            </Box>
          </VStack>
        </HStack>
      </Td>
      <Td p="18px">
        <Box
          as="p"
          textStyle={{ base: 'body5', md: 'body4' }}
          color="neutral.11"
        >
          {timeSince(new Date(contributor.timestamp))}
        </Box>
      </Td>
      <Td p="18px">
        <BiChevronRight size="24" />
      </Td>
    </Tr>
  );
};

const ProjectContributors = ({
  projectId,
  roundId,
  isLoading,
}: {
  projectId: string;
  isLoading?: boolean;
  roundId: string;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState('desc');

  const {
    data: contributorsData,
    isLoading: loadingContributors,
    isError,
    error,
  } = trpc.contribution.getProjectContributors.useQuery({ projectId, roundId });

  const pageSize = 15;
  const siblingCount = 1;

  const totalContributors = contributorsData ? contributorsData.length : 0;
  const totalPages = Math.ceil(totalContributors / pageSize);

  useEffect(() => {
    if (currentPage < 1) setCurrentPage(1);
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const sortedAndFormattedContributors = contributorsData
    ? formatContributorData(contributorsData).sort((a, b) => {
        if (a[sortField] < b[sortField]) {
          return sortDirection === 'asc' ? -1 : 1;
        }
        if (a[sortField] > b[sortField]) {
          return sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
      })
    : [];

  const currentContributors = sortedAndFormattedContributors
    ? sortedAndFormattedContributors.slice(startIndex, endIndex)
    : [];

  const handleSortChange = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <VStack
      w="full"
      align={
        currentContributors?.length === 0
          ? 'center'
          : { base: 'start', md: 'end' }
      }
    >
      {currentContributors?.length === 0 ? (
        <ContributionsEmptyState />
      ) : (
        <>
          <Table w="full" minW="34rem" overflowX="scroll" variant="unstyled">
            <Thead
              color="neutral.8"
              fontFamily={'Plus Jakarta Sans, sans-serif'}
            >
              <Tr>
                <Th w={'40%'} p="18px">
                  <Text
                    fontSize={{ base: '12px', md: '14px' }}
                    textTransform={'capitalize'}
                    fontWeight="500"
                  >
                    Contributor
                  </Text>
                </Th>
                <Th w={'25%'} p="18px">
                  <ButtonGroup
                    onClick={() => handleSortChange('amount')}
                    variant="unstyled"
                    gap="8px"
                    isAttached
                  >
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
                    <IconButton
                      aria-label="Sort by Amount"
                      icon={
                        sortField === 'amount' && sortDirection === 'asc' ? (
                          <BiChevronUp size={20} />
                        ) : (
                          <BiChevronDown size={20} />
                        )
                      }
                    />
                  </ButtonGroup>
                </Th>
                <Th w={'25%'} p="18px">
                  <ButtonGroup
                    onClick={() => handleSortChange('timestamp')}
                    variant="unstyled"
                    gap="8px"
                    isAttached
                  >
                    <Button
                      textAlign={'center'}
                      alignContent={'center'}
                      variant="unstyled"
                      fontWeight="500"
                      fontSize={{ base: '12px', md: '14px' }}
                      textTransform={'capitalize'}
                    >
                      Time
                    </Button>
                    <IconButton
                      aria-label="Sort by time"
                      icon={
                        sortField === 'timestamp' && sortDirection === 'asc' ? (
                          <BiChevronDown size={20} />
                        ) : (
                          <BiChevronUp size={20} />
                        )
                      }
                    />
                  </ButtonGroup>
                </Th>
                <Th w={'10%'} p="18px"></Th>
              </Tr>
            </Thead>
            {isLoading || loadingContributors ? (
              <TableLoading />
            ) : (
              <Tbody>
                {currentContributors.length === 0 ? (
                  <></>
                ) : (
                  currentContributors.map((contributor: Contributor) => (
                    <ContributorRow
                      key={contributor.id}
                      contributor={contributor}
                    />
                  ))
                )}
              </Tbody>
            )}
          </Table>
          {currentContributors.length >= pageSize && (
            <Pagination
              currentPage={currentPage}
              totalCount={totalContributors}
              siblingCount={siblingCount}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </VStack>
  );
};

export default ProjectContributors;
