import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Card,
  Center,
  HStack,
  Skeleton,
  Tag,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { UserProof } from '~/types/user';
import { SuperteamMembers } from '~/utils/data/superteamMembers';
import { trpc } from '~/utils/trpc';
import CivicIDProof from './proofs/CivicIDProof';
import CubikGrantee from './proofs/CubikGrantee';
import GithubProof from './proofs/github';
import GoogleProof from './proofs/GoogleProof';
import SuperteamProof from './proofs/SuperteamProof';

const MotionBox = motion(Box);
interface Props {
  isLoading: boolean;
  proofs: UserProof[];
  wallet: string;
}
const UserProofs = ({ isLoading, proofs, wallet }: Props) => {
  const checkProofs = trpc.user.checkProof.useQuery();
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
            {proofs?.length ?? 0} / 3 Collected
          </Tag>
        </Skeleton>
      </HStack>
      <Skeleton
        mt={{ base: '16px', sm: '20px', md: '24px' }}
        fadeDuration={3}
        isLoaded={!isLoading}
        opacity={isLoading ? 0.6 : 1}
        w="full"
      >
        <Alert
          mt={{ base: '16px', sm: '20px', md: '24px' }}
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
            To start contributing on the platform you need to collect proofs. By
            collecting more proofs your voting power increases.
          </AlertDescription>
        </Alert>
      </Skeleton>
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
            <SuperteamProof
              claimed={
                proofs?.find((e) => e.name === 'SUPERTEAM') ? true : false
              }
              isClaimAble={
                SuperteamMembers.find((e) => e === wallet) ? true : false
              }
            />
          </MotionBox>
        </Skeleton>
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
            <GithubProof
              minted={
                proofs?.find((e) => e.name.toLocaleLowerCase() === 'github')
                  ? true
                  : false
              }
              isLoading={isLoading}
            />
          </MotionBox>
        </Skeleton>
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
            <CubikGrantee
              canMint={(checkProofs.data as boolean) ?? false}
              minted={
                proofs?.find(
                  (e) => e.name.toLocaleLowerCase() === 'cubikgrantee'
                )
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
