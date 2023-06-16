import {
  Box,
  Card,
  HStack,
  Skeleton,
  AlertDescription,
  Alert,
  AlertIcon,
  VStack,
  Wrap,
  Center,
  Tag,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import TwitterProof from './proofs/TwitterProof';
import MonkeDAOProof from './proofs/MonkeDAOProof';
import CivicIDProof from './proofs/CivicIDProof';
import DripProof from './proofs/DripProof';
import LamportDAOProof from './proofs/LamportDAOProof';
import GoogleProof from './proofs/GoogleProof';
import { UserProof } from '~/types/user';

const MotionBox = motion(Box);
interface Props {
  isLoading: boolean;
  proofs: UserProof[];
}
const UserProofs = ({ isLoading, proofs }: Props) => {
  return (
    <VStack align="start" w="full">
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
            size={{ base: 'sm', md: 'sm' }}
            px="16px"
            py="6px"
            fontWeight={'700'}
            color="surface.yellow.1"
            background={'surface.yellow.3'}
            rounded="full"
          >
            1 / 1 Collected
          </Tag>
        </Skeleton>
      </HStack>
      {/* <Alert
        w="full"
        variant={'solid'}
        rounded="none"
        backgroundColor={'#31F57910'}
        borderLeft={'2px solid'}
        borderColor={'#31F57940'}
        status="info"
      >
        <Center h={'1.4rem'}>
          <Box as={AlertIcon} boxSize={'12px'} color="#31F579" />
        </Center>
        <AlertDescription
          color="neutral.11"
          fontSize={{ base: '10px', md: '12px' }}
        >
          To start contributing on the platform you need to collect proofs by
          verifying your digital identity.
        </AlertDescription>
      </Alert> */}
      <Wrap
        direction={{ base: 'column', md: 'row' }}
        spacing={{ base: '24px', md: '32px' }}
        pt={{ base: '16px', sm: '20px', md: '24px' }}
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
            w={{ base: 'full', sm: 'full', md: '17.8rem' }}
            height="fit-content"
            h="full"
            whileHover={{ y: -8, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <GoogleProof
              minted={
                proofs?.find((e) => e.name.toLocaleLowerCase() === 'google')
                  ? true
                  : false
              }
              isLoading={isLoading}
            />
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
            w={{ base: 'full', sm: 'full', md: '17.8rem' }}
            height="fit-content"
            h="full"
            //  whileHover={{ y: -8, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <CivicIDProof />
          </MotionBox>
        </Skeleton>
      </Wrap>
    </VStack>
  );
};

export default UserProofs;
