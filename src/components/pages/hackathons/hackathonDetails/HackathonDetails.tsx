import { Container } from '@chakra-ui/react';
import HackathonBody from './HackathonBody';
import HackathonHeader from './HackathonHeader';

const HackathonDetails = () => {
  return (
    <Container
      maxW="7xl"
      zIndex={'1'}
      transform={'translateY(-10rem)'}
      display="flex"
      flexDirection={'column'}
      gap="48px"
      px={{ base: '2rem', md: '3rem', xl: '1rem' }}
    >
      <HackathonHeader isLoading={false} />
      <HackathonBody isLoading={false} />
    </Container>
  );
};

export default HackathonDetails;
