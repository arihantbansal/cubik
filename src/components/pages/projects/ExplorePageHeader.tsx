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
    <VStack w="full" align={'start'} gap={{ base: '2rem', md: '2rem' }}>
      <VStack align={'start'}>
        <Box
          color="neutral.11"
          as="p"
          textStyle={{ base: 'headline3', md: 'headline1' }}
        >
          Discover and Fund Public Goods
        </Box>
        <Box
          color="neutral.9"
          as="p"
          textStyle={{ base: 'body3', md: 'body2' }}
        >
          Help fund projects that matter to you and your community
        </Box>
      </VStack>
      <FundingRoundBanner />
      <InputGroup
        rounded="8px"
        h="fit-content"
        background={'#0F0F0F'}
        border="1px solid #1B181A"
        w={'36%'}
        zIndex="1"
      >
        <InputLeftElement
          w="3.5rem"
          h="full"
          pointerEvents="none"
          bg="transparent"
        >
          <BiSearch size="1.4rem" color="#757575" />
        </InputLeftElement>
        <Input
          variant={'unstyled'}
          pl="3rem"
          fontSize={'md'}
          background="#05060F"
          bg="transparent"
          placeholder="Search For Projects, Categories..."
          _placeholder={{
            fontcolor: '#757575',
            fontSize: 'md',
            opacity: '0.4',
            fontWeight: '500',
          }}
          h="2.5rem"
          pb={'3px'}
        />
      </InputGroup>
    </VStack>
  );
};

export default ExplorePageHeader;
