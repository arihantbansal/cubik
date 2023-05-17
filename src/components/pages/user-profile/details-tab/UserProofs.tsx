import {
  Box,
  Card,
  HStack,
  Skeleton,
  Tag,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import CivicIDProof from './proofs/CivicIDProof';
import DripProof from './proofs/DripProof';
import LamportDAOProof from './proofs/LamportDAOProof';
import MonkeDAOProof from './proofs/MonkeDAOProof';

const UserProofs = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <VStack align="start" w="full" gap="24px">
      <HStack gap="8px">
        <Box
          as="p"
          textStyle={{ base: 'title4', md: 'title3' }}
          color="neutral.11"
        >
          Proofs
        </Box>
        <Skeleton
          fadeDuration={3}
          isLoaded={!isLoading}
          opacity={isLoading ? 0.6 : 1}
          rounded="full"
        >
          <Tag
            size={{ base: 'sm', md: 'md' }}
            px="16px"
            py="6px"
            fontWeight={'700'}
            color="surface.yellow.1"
            background={'surface.yellow.3'}
            rounded="full"
          >
            0 / 8 Collected
          </Tag>
        </Skeleton>
      </HStack>
      <Wrap
        direction={{ base: 'row', md: 'row' }}
        spacing={{ base: '24px', md: '32px' }}
      >
        <Skeleton
          fadeDuration={4}
          isLoaded={!isLoading}
          opacity={isLoading ? 0.4 : 1}
          rounded="12px"
        >
          <Card
            w={{ base: '40vw', md: '17.8rem' }}
            height="fit-content"
            h="full"
          >
            <LamportDAOProof />
          </Card>
        </Skeleton>
        <Skeleton
          fadeDuration={5}
          isLoaded={!isLoading}
          opacity={isLoading ? 0.4 : 1}
          rounded="12px"
        >
          <Card
            w={{ base: '40vw', md: '17.8rem' }}
            height="fit-content"
            h="full"
          >
            <DripProof />
          </Card>
        </Skeleton>
        <Skeleton
          fadeDuration={6}
          isLoaded={!isLoading}
          opacity={isLoading ? 0.4 : 1}
          rounded="12px"
        >
          <Card
            w={{ base: '40vw', md: '17.8rem' }}
            height="fit-content"
            h="full"
          >
            <CivicIDProof />
          </Card>
        </Skeleton>
        <Skeleton
          fadeDuration={7}
          isLoaded={!isLoading}
          opacity={isLoading ? 0.4 : 1}
          rounded="12px"
        >
          <Card
            w={{ base: '40vw', md: '17.8rem' }}
            height="fit-content"
            h="full"
          >
            <MonkeDAOProof />
          </Card>
        </Skeleton>
      </Wrap>
    </VStack>
  );
};

export default UserProofs;
