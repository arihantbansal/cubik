import { Box, HStack, Tag, VStack } from '@chakra-ui/react';
import LamportDAoSVG from './SVGs/LamportDAO';

const LamportDAOProof = () => {
  return (
    <VStack p="32px" gap="8px" align="start">
      <LamportDAoSVG />
      <HStack spacing="8px">
        <Box as="p" textStyle={{ base: '', md: 'title3' }} color={'neutral.11'}>
          Lamport DAO
        </Box>
        <Tag
          size={{ base: 'xs', md: 'sm' }}
          px="12px"
          py="4px"
          color="surface.yellow.1"
          background={'surface.yellow.3'}
          rounded="full"
        >
          Claim
        </Tag>
      </HStack>
      <Box as="p" textStyle={{ base: '', md: 'body5' }} color={'neutral.7'}>
        Collect Proof of Lamport DAO by connecting your discord account.
      </Box>
    </VStack>
  );
};

export default LamportDAOProof;
