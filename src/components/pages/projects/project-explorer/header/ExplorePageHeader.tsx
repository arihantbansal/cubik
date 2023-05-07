import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { BiSearch } from 'react-icons/bi';
import FundingRoundBanner from './FundingRoundBanner';

const ExplorePageHeader = () => {
  return (
    <VStack w="full">
      {/* <VStack align={'start'} gap="8px">
        <Box
          color="neutral.9"
          as="p"
          textStyle={{ base: 'body3', md: 'body2' }}
        >
          gm @irfan
        </Box>
        <Box
          color="neutral.11"
          as="p"
          textStyle={{ base: 'headline4', md: 'headline4' }}
        >
          Help fund public goods and the ecosystem grow!
        </Box>
      </VStack> */}
      <FundingRoundBanner />
    </VStack>
  );
};

export default ExplorePageHeader;
