import { Box, Button, CardBody, CardFooter } from '@chakra-ui/react';
import React, { use, useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { supabase, useUser } from '~/utils/supabase';

const CreateProfileStepTwo = ({
  onNext,
  onPrevious,
}: {
  onNext: () => void;
  onPrevious: () => void;
}) => {
  const { user } = useUser(supabase);
  const handleClick = async () => {
    console.log('sometjhing');
    const a = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/create-profile',
      },
    });
  };

  return (
    <>
      <CardBody>
        <Button
          size={{ base: 'cubikMini', md: 'cubikSmall' }}
          variant="cubikOutline"
          loadingText="Submitting"
          onClick={() => {
            handleClick();
          }}
        >
          {user?.data?.user?.email ? user?.data?.user?.email : 'Connect Google'}
        </Button>
      </CardBody>
      <CardFooter>
        <Button
          size={{ base: 'cubikMini', md: 'cubikSmall' }}
          variant={'cubikText'}
          leftIcon={<Box as={FiChevronLeft} width={5} height={5} />}
          onClick={async () => {
            onPrevious();
          }}
        >
          Previous
        </Button>
        <Button
          size={{ base: 'cubikMini', md: 'cubikSmall' }}
          variant="cubikFilled"
          loadingText="Submitting"
          isDisabled={!user?.data.user?.email}
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
