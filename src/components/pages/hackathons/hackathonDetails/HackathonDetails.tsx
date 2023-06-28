import { Container } from '@chakra-ui/react';
import HackathonBody from './HackathonBody';
import HackathonHeader from './HackathonHeader';

type HackathonDetailsPropsType = {
  isLoading: boolean;
  logo: string;
  name: string;
  short_description: string;
  background: string;
  description: string;
  host: string;
  prize_pool: string;
  prize: string;
  timeline: string;
  social: string;
  team: string;
};

const HackathonDetails = (props: HackathonDetailsPropsType) => {
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
      <HackathonHeader
        isLoading={false}
        logo={props.logo}
        name={props.name}
        short_description={props.short_description}
      />
      <HackathonBody isLoading={false} />
    </Container>
  );
};

export default HackathonDetails;
