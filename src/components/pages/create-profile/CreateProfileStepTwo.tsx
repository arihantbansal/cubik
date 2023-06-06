import { Box, Button, CardBody, CardFooter } from '@chakra-ui/react';
import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const CreateProfileStepTwo = ({
  onNext,
  onPrevious,
}: {
  onNext: () => void;
  onPrevious: () => void;
}) => {
  return (
    <>
      <CardBody>
        <Button
          size={{ base: 'cubikMini', md: 'cubikSmall' }}
          variant="cubikFilled"
          loadingText="Submitting"
          onClick={() => {}}
        >
          Connect Google
        </Button>
      </CardBody>
      <CardFooter>
        <Button
          size={{ base: 'cubikMini', md: 'cubikSmall' }}
          variant={'cubikText'}
          leftIcon={<Box as={FiChevronLeft} width={5} height={5} />}
          onClick={() => onPrevious()}
        >
          Previous
        </Button>
        <Button
          size={{ base: 'cubikMini', md: 'cubikSmall' }}
          variant="cubikFilled"
          loadingText="Submitting"
          rightIcon={
            <Box as={FiChevronRight} boxSize={['10px', '12px', '16px']} />
          }
          onClick={() => onNext()}
        >
          Next
        </Button>
      </CardFooter>
    </>
  );
};

export default CreateProfileStepTwo;
