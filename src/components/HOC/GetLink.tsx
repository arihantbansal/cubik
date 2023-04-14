import { Box, HStack } from '@chakra-ui/react';
import { BiLink } from 'react-icons/bi';
import { getDomain } from '~/utils/getDomain';

const GetFormattedLink = ({ link }: { link: string }) => {
  return (
    <HStack w="full" as="button" align={'center'} justify="start" spacing="4px">
      <BiLink size={20} color={'#A8F0E6'} />
      <Box
        noOfLines={1}
        textAlign="start"
        as="p"
        whiteSpace={'nowrap'}
        textStyle={{ base: 'body6', sm: 'body5', md: 'body4' }}
        color={'brand.teal5'}
        w="full"
      >
        {getDomain(link)}
      </Box>
    </HStack>
  );
};

export default GetFormattedLink;
