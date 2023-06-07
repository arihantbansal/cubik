import { Box, Button, CardBody, CardFooter } from '@chakra-ui/react';
import React, { use, useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { supabase } from '~/utils/supabase';

const CreateProfileStepTwo = ({
  onNext,
  onPrevious,
}: {
  onNext: () => void;
  onPrevious: () => void;
}) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const handleClick = async () => {
    console.log('sometjhing');
    const a = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // skipBrowserRedirect: true,
        // redirectTo: 'http://localhost:3000/api/success',
      },
    });
    // window.open(a.data.url as string, 'popup', 'width=600,height=600');
  };
  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.log(error);
        setIsDisabled(true);
      } else {
        console.log(data);
        setIsDisabled(false);
      }
    };
    fetch();
  }, []);
  return (
    <>
      <CardBody>
        <Button
          size={{ base: 'cubikMini', md: 'cubikSmall' }}
          variant="cubikFilled"
          loadingText="Submitting"
          onClick={() => {
            handleClick();
          }}
        >
          Connect Google
        </Button>
      </CardBody>
      <CardFooter>
        <Button
          size={{ base: 'cubikMini', md: 'cubikSmall' }}
          variant={'cubikText'}
          leftIcon={<Box as={FiChevronLeft} width={5} height={5} />}
          // onClick={() => onPrevious()}
          onClick={async () => {
            const { data, error } = await supabase.auth.getUser();
            console.log(data);
          }}
        >
          Previous
        </Button>
        <Button
          size={{ base: 'cubikMini', md: 'cubikSmall' }}
          variant="cubikFilled"
          loadingText="Submitting"
          isDisabled={!isDisabled}
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
