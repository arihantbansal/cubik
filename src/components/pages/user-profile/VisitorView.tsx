import { Container } from '@chakra-ui/react';

import { useRouter } from 'next/router';

const VisitorView = ({ loading, user }: any) => {
  const { query } = useRouter();

  return (
    <Container maxW="full" p="0" my="2.5rem">
      hello visitor
    </Container>
  );
};

export default VisitorView;
