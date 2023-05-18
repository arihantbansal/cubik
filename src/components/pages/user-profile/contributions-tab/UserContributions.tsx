import {
  Avatar,
  Box,
  Center,
  HStack,
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
import { Key, ReactChild } from 'react';
import { BiChevronRight } from 'react-icons/bi';
import CustomTag from '~/components/common/tags/CustomTag';
import { BONK, SOL, USDC } from '~/components/common/tokens/token';
import { UserContributionsWithProjectOwnerAndProjectRound } from '~/types/contribution';
import { formatNumberWithK } from '~/utils/formatWithK';
import { timeSince } from '~/utils/gettimeSince';
import { trpc } from '~/utils/trpc';

const UserContributionTableRow = ({
  contribution,
}: {
  contribution: UserContributionsWithProjectOwnerAndProjectRound;
}) => {
  console.log('contribution - ', contribution);

  // projectLogo
  // projectName
  // projectCreator
  // projectCategory
  // amount donated by user
  // project donors data
  // total amount raised
  return (
    <Tr _hover={{ backgroundColor: '#0C0D0D' }}>
      <Td px="12px">
        <HStack align={'start'} gap={{ base: '14px', md: '16px' }}>
          <Avatar
            borderRadius={'8px'}
            width={{ base: '36px', md: '52px' }}
            height={{ base: '36px', md: '52px' }}
            src={contribution.ProjectsModel.logo}
          />
          <VStack
            align={'start'}
            justify="center"
            spacing={{ base: '8px', md: '8px' }}
          >
            <Box
              as="p"
              textStyle={{ base: 'title5', md: 'title4' }}
              color="neutral.11"
            >
              {contribution.ProjectsModel.name}
            </Box>
            <Box
              as="p"
              textStyle={{ base: 'body5', md: 'body4' }}
              color="neutral.7"
            >
              by <b>@{contribution.ProjectsModel.owner.username}</b>
            </Box>
          </VStack>
        </HStack>
      </Td>
      <Td px="12px">
        {JSON.parse(contribution.ProjectsModel.industry).map(
          (industry: { value: Key | null | undefined; label: ReactChild }) => (
            <CustomTag key={industry.value}>{industry.label}</CustomTag>
          )
        )}
      </Td>
      <Td px="12px">
        <HStack gap="8px" align={'center'}>
          <Center>
            {contribution.token === 'sol' ? (
              <SOL size={32} />
            ) : contribution.token === 'usdc' ? (
              <USDC size={32} />
            ) : contribution.token === 'bonk' ? (
              <BONK size={32} />
            ) : (
              '- -'
            )}
          </Center>
          <VStack justify={'center'} spacing="2px" align={'start'}>
            <HStack align={'baseline'} color="white">
              <Box as="p" textStyle={{ base: 'title5', md: 'title4' }}>
                {formatNumberWithK(contribution.total)}
              </Box>
              <Box as="p" textStyle={{ base: 'title8', md: 'title7' }}>
                {contribution.token.toUpperCase()}
              </Box>
            </HStack>
            <Box
              as="p"
              color="neutral.8"
              textStyle={{ base: 'body6', md: 'body5' }}
            >
              {formatNumberWithK(contribution.usdTotal)}$
            </Box>
          </VStack>
        </HStack>
      </Td>
      <Td px="12px">
        <VStack alignItems={'start'} gap="0px" justify="start">
          <Box
            as="p"
            textStyle={{ base: 'title5', md: 'title4' }}
            color="neutral.11"
          >
            {
              contribution.ProjectsModel.ProjectJoinRound[0].fundingRound
                .roundName
            }{' '}
            Round
          </Box>
          <Box
            as="p"
            textStyle={{ base: 'body5', md: 'body4' }}
            color="neutral.7"
          >
            {timeSince(new Date(contribution.createdAt))}
          </Box>
        </VStack>
      </Td>
      <Td px="12px">
        <Box
          as="p"
          textStyle={{ base: 'title4', md: 'title3' }}
          color="neutral.11"
        >
          $12,248.64
        </Box>
      </Td>
      <Td px="12px">
        <BiChevronRight size="24" />
      </Td>
    </Tr>
  );
};

const UserContributions = ({
  userId,
}: {
  userId: string | null | undefined;
}) => {
  const { data, isError, isLoading } = userId
    ? trpc.contribution.getUserContributions.useQuery({ userId })
    : { data: null, isError: false, isLoading: false }; // todo: i have a doubt if it works or not

  if (!userId) {
    return <Text>No user ID provided</Text>;
  }

  return (
    <TableContainer w="full">
      <Table variant="unstyled">
        <Thead>
          <Tr>
            <Th w="20%" px="12px">
              <Text
                color="#ADB8B6"
                size={{ base: '14px', md: '16px' }}
                textTransform={'capitalize'}
                fontWeight="500"
              >
                Projects
              </Text>
            </Th>
            <Th w="25%" px="12px">
              <Text
                color="#ADB8B6"
                size={{ base: '14px', md: '16px' }}
                textTransform={'capitalize'}
                fontWeight="500"
              >
                Category
              </Text>
            </Th>
            <Th w="15%" px="12px">
              <Text
                color="#ADB8B6"
                size={{ base: '14px', md: '16px' }}
                textTransform={'capitalize'}
                fontWeight="500"
              >
                Amount Contributed
              </Text>
            </Th>
            <Th w="20%" px="12px">
              <Text
                color="#ADB8B6"
                size={{ base: '14px', md: '16px' }}
                textTransform={'capitalize'}
                fontWeight="500"
              >
                Round
              </Text>
            </Th>
            <Th w="15%" px="12px">
              <Text
                color="#ADB8B6"
                size={{ base: '14px', md: '16px' }}
                textTransform={'capitalize'}
                fontWeight="500"
              >
                Total Amount Raised
              </Text>
            </Th>
            <Th w="5%" px="12px"></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            data.map((contribution) => (
              <UserContributionTableRow
                key={contribution.id}
                contribution={contribution}
              />
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default UserContributions;
