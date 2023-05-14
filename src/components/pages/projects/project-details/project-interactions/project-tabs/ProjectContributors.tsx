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
import { useEffect, useState } from 'react';
import { BiChevronRight } from 'react-icons/bi';
import ContributionsEmptyState from '~/components/common/empty-state/ContributionsEmptyState';
import Pagination from '~/components/common/pagination/Pagination';
import { SOL, USDC } from '~/components/common/tokens/token';
import { TruncatedAddr } from '~/components/common/wallet/WalletAdd';
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
};

type ContributorRowProps = {
  contributor: Contributor;
};

const formatContributorData = (data: any[]): Contributor[] => {
  return data.map((contributor) => ({
    id: contributor.id,
    avatar: contributor.user.profilePicture,
    username: contributor.user.username,
    walletAddress: contributor.user.mainWallet,
    amount: contributor.currentTotal,
    currentusdTotal: contributor.currentusdTotal,
    timestamp: contributor.createdAt,
    token: contributor.token,
  }));
};

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

const ContributorRow: React.FC<ContributorRowProps> = ({ contributor }) => (
  <Tr _hover={{ backgroundColor: '#0C0D0D' }}>
    <Td px="12px">
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
          <Box
            as="p"
            textStyle={{ base: 'title6', md: 'title4' }}
            color="neutral.11"
          >
            @{contributor.username}
          </Box>
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
    <Td px="12px">
      <HStack gap="8px" align={'center'}>
        <Center>
          {contributor.token === 'sol' ? <SOL size={28} /> : <USDC size={28} />}
        </Center>
        <VStack justify={'center'} spacing="2px" align={'start'}>
          <HStack align={'baseline'} color="white">
            <Box as="p" textStyle={{ base: 'title5', md: 'title4' }}>
              {contributor.amount}
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
            {contributor.currentusdTotal}$
          </Box>
        </VStack>
      </HStack>
    </Td>
    <Td px="12px">
      <Box as="p" textStyle={{ base: 'body5', md: 'body4' }} color="neutral.11">
        {timeSince(new Date(contributor.timestamp))}
      </Box>
    </Td>
    <Td px="12px">
      <BiChevronRight size="24" />
    </Td>
  </Tr>
);

const ProjectContributors = ({
  projectId,
  isLoading,
}: {
  projectId: string;
  isLoading?: boolean;
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: contributorsData,
    isLoading: loadingContributors,
    isError,
    error,
  } = trpc.contribution.getProjectContributors.useQuery({ projectId });

  // Assuming 10 contributors per page
  const pageSize = 5;
  const siblingCount = 1; // Change this according to your needs

  const totalContributors = contributorsData ? contributorsData.length : 0;
  const totalPages = Math.ceil(totalContributors / pageSize);

  useEffect(() => {
    if (currentPage < 1) setCurrentPage(1);
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  // Calculate the contributors for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const currentContributors = contributorsData
    ? formatContributorData(contributorsData).slice(startIndex, endIndex)
    : [];

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
      {currentContributors.length === 0 ? (
        <ContributionsEmptyState />
      ) : (
        <Pagination
          currentPage={currentPage}
          totalCount={totalContributors}
          siblingCount={siblingCount}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      )}
    </TableContainer>
  );
};

export default ProjectContributors;
