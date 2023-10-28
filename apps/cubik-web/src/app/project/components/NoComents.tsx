import { Box, Center, VStack } from '@/utils/chakra';

export const NoComments = () => {
  return (
    <VStack
      align="center"
      spacing="16px"
      py="80px"
      w="full"
      textAlign={'center'}
      border="1px dashed"
      borderColor={'#1D1F1E'}
      rounded="12px"
    >
      <Center bg="#A8F0E6" p={{ base: '12px', md: '16px' }} rounded="full">
        <Box
          //   as={FaRegComments}
          boxSize={{ base: '20px', md: '32px' }}
          color={'#001F1B'}
        />
      </Center>
      <Box
        as="p"
        textStyle={{ base: 'body3', md: 'title2' }}
        color="neutral.11"
      >
        No Comments yet
      </Box>
      <Box as="p" textStyle={{ base: 'body5', md: 'body4' }} color="neutral.8">
        Start a conversation by adding the first comment.
      </Box>
    </VStack>
  );
};
