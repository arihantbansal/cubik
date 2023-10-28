import { Center } from '@chakra-ui/react';

import ComponentErrors from './componentErrors';

export const ErrorUI = () => {
  return (
    <Center
      w="full"
      py={{ base: '16px', sm: '24px' }}
      border="1px dashed"
      borderColor={'#1D1F1E'}
      rounded="12px"
    >
      <ComponentErrors />
    </Center>
  );
};
