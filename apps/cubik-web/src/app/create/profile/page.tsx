import React from 'react';
import { Box, Card, CardHeader, Container } from '@/utils/chakra';

import { Form } from './components/Form';

const CreateProfile = () => {
  return (
    <>
      <Container maxW="full" py={{ base: '2rem', lg: '2vh' }}>
        <Card
          background={'#080808'}
          borderRadius={'12px'}
          borderColor={'#141414'}
          overflow="hidden"
          maxW={'32rem'}
          mx="auto"
          gap={{ base: '24px', sm: '28px', md: '32px' }}
          p={{ base: '22px', md: '32px' }}
          position="relative"
        >
          <Box
            as="svg"
            position="absolute"
            top="0%"
            left="50%"
            transform="translate(-50%, -50%)"
            zIndex={0}
            width="6rem"
            height="6rem"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              filter: 'blur(100px)',
            }}
          >
            <circle cx="50" cy="50" r="50" fill="#C8F6F6" />
          </Box>
          <>
            <CardHeader gap="8px">
              <Box
                as="p"
                textStyle={{ base: 'title2', md: 'title1' }}
                color="neutral.11"
              >
                Create your account
              </Box>
              <Box
                as="p"
                textStyle={{ base: 'body5', md: 'body4' }}
                color="neutral.9"
              >
                Create your Cubik account to get started.
              </Box>
            </CardHeader>
            <Form />
          </>
        </Card>
      </Container>
    </>
  );
};

export default CreateProfile;
