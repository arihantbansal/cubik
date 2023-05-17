import { Box, HStack, Tag, VStack } from '@chakra-ui/react';
import DripHauz from './SVGs/DripHauz';

const DripProof = () => {
  return (
    <VStack p="32px" gap="8px" align="start">
      <DripHauz />
      <HStack spacing="8px">
        <Box as="p" textStyle={{ base: '', md: 'title3' }} color={'neutral.11'}>
          Drip Hauz
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
        If Drip S1 NFTs were airdropped to you can collect this proof
      </Box>
    </VStack>
  );
};

export default DripProof;
