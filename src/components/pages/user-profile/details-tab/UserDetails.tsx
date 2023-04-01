import { Box, Card, HStack, Stack, VStack } from '@chakra-ui/react';
import React from 'react';

const UserDetails = () => {
  return (
    <Stack direction={{ base: 'column', md: 'row' }} gap="32px">
      <Card p="24px">
        <VStack align={'start'} gap="8px">
          <Box as="p" color="neutral.8" textStyle="body4">
            Donations
          </Box>
          <Box as="p" color="neutral.11" textStyle="title1">
            $178
          </Box>
          <Box
            as="p"
            color="#73FF9A"
            backgroundColor={'#042919'}
            rounded="full"
            p="0.4rem 0.8rem"
            textStyle="body4"
          >
            + $100
          </Box>
        </VStack>
        <HStack w="14rem" justifyContent={'space-between'} alignItems="end">
          <Box as="p" color="neutral.8" textStyle="body5">
            Last Donation
          </Box>
          <Box as="p" color="neutral.11" textStyle="title4">
            $10
          </Box>
        </HStack>
      </Card>
      <Card p="24px" flexDirection={'row'} gap="80px">
        <VStack align={'start'} gap="8px">
          <Box as="p" color="neutral.8" textStyle="body4">
            Funds Raised
          </Box>
          <Box as="p" color="neutral.11" textStyle="title1">
            $120,00
          </Box>
          <Box
            as="p"
            color="#73FF9A"
            backgroundColor={'#042919'}
            rounded="full"
            p="0.4rem 0.8rem"
            textStyle="body4"
          >
            + $100
          </Box>
        </VStack>
        <VStack gap="12px">
          <HStack w="12rem" justifyContent={'space-between'} alignItems="end">
            <Box as="p" color="neutral.8" textStyle="body5">
              Demo Project
            </Box>
            <Box as="p" color="neutral.11" textStyle="title4">
              $1,200
            </Box>
          </HStack>
          <HStack w="12rem" justifyContent={'space-between'} alignItems="end">
            <Box as="p" color="neutral.8" textStyle="body5">
              Cubik
            </Box>
            <Box as="p" color="neutral.11" textStyle="title4">
              $236
            </Box>
          </HStack>
          <HStack w="12rem" justifyContent={'space-between'} alignItems="end">
            <Box as="p" color="neutral.8" textStyle="body5">
              Solmon
            </Box>
            <Box as="p" color="neutral.11" textStyle="title4">
              $100
            </Box>
          </HStack>
          <HStack w="12rem" justifyContent={'space-between'} alignItems="end">
            <Box as="p" color="neutral.8" textStyle="body5">
              Test
            </Box>
            <Box as="p" color="neutral.11" textStyle="title4">
              -
            </Box>
          </HStack>
        </VStack>
      </Card>
    </Stack>
  );
};

export default UserDetails;
