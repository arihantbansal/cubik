import { Container } from '@chakra-ui/react';
import HackathonBody from './HackathonBody';
import HackathonHeader from './HackathonHeader';

const HackathonDetails = () => {
  return (
    <Container
      maxW="7xl"
      zIndex={'1'}
      transform={'translateY(-4rem)'}
      display="flex"
      flexDirection={'column'}
      gap="48px"
      p={{ base: '2rem', lg: '1rem' }}
    >
      <HackathonHeader isLoading={false} />
      <HackathonBody isLoading={false} />
    </Container>
  );
};

export default HackathonDetails;
