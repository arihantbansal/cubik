import {
  Box,
  Card,
  HStack,
  Skeleton,
  Tag,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import CivicIDProof from './proofs/CivicIDProof';
import DripProof from './proofs/DripProof';
import LamportDAOProof from './proofs/LamportDAOProof';
import MonkeDAOProof from './proofs/MonkeDAOProof';

const MotionBox = motion(Box);

const UserProofs = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <VStack align="start" w="full" gap="12px">
      <HStack gap="8px">
        <Skeleton
          isLoaded={!isLoading}
          opacity={isLoading ? '0.6' : 1}
          fadeDuration={3}
        >
          <Box
            as="p"
            textStyle={{ base: 'title4', md: 'title3' }}
            color="neutral.11"
          >
            Proofs
          </Box>
        </Skeleton>
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
        py="12px"
        direction={{ base: 'row', md: 'row' }}
        spacing={{ base: '24px', md: '32px' }}
      >
        <Skeleton
          fadeDuration={4}
          isLoaded={!isLoading}
          opacity={isLoading ? 0.4 : 1}
          rounded="12px"
        >
          <MotionBox
            as={Card}
            cursor="pointer"
            w={{ base: '40vw', md: '17.8rem' }}
            height="fit-content"
            h="full"
            whileHover={{ y: -8, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <LamportDAOProof />
          </MotionBox>
        </Skeleton>
        <Skeleton
          fadeDuration={5}
          isLoaded={!isLoading}
          opacity={isLoading ? 0.4 : 1}
          rounded="12px"
        >
          <MotionBox
            as={Card}
            cursor="pointer"
            w={{ base: '40vw', md: '17.8rem' }}
            height="fit-content"
            h="full"
            whileHover={{ y: -8, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <DripProof />
          </MotionBox>
        </Skeleton>
        <Skeleton
          fadeDuration={6}
          isLoaded={!isLoading}
          opacity={isLoading ? 0.4 : 1}
          rounded="12px"
        >
          <MotionBox
            as={Card}
            cursor="pointer"
            w={{ base: '40vw', md: '17.8rem' }}
            height="fit-content"
            h="full"
            //  whileHover={{ y: -8, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <CivicIDProof />
          </MotionBox>
        </Skeleton>
        <Skeleton
          fadeDuration={7}
          isLoaded={!isLoading}
          opacity={isLoading ? 0.4 : 1}
          rounded="12px"
        >
          <MotionBox
            as={Card}
            cursor="pointer"
            w={{ base: '40vw', md: '17.8rem' }}
            height="fit-content"
            h="full"
            //  whileHover={{ y: -8, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <MonkeDAOProof />
          </MotionBox>
        </Skeleton>
      </Wrap>
    </VStack>
  );
};

export default UserProofs;
