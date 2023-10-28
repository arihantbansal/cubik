'use client';

import React from 'react';
import { Container } from '@/utils/chakra';

import Form from './components/Form';

const CreateProjectPage = () => {
  return (
    <>
      <Container
        transition="all .25s ease"
        maxW="7xl"
        p={{ base: '1rem', md: '0' }}
        my={{ base: '2rem', md: '5rem', lg: '5rem', xl: '6rem' }}
        outline="none"
      >
        <Form />
      </Container>
    </>
  );
};

export default CreateProjectPage;
