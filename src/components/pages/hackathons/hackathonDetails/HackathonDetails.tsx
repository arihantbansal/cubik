import { Container } from '@chakra-ui/react';
import HackathonBody from './HackathonBody';
import HackathonHeader from './HackathonHeader';
import { JSONValue } from 'superjson/dist/types';

type HackathonDetailsPropsType = {
  isLoading: boolean;
  logo?: string;
  name?: string;
  short_description?: string;
  background?: string;
  description?: string;
  host?: JSONValue;
  prize_pool?: number;
  prize?: JSONValue;
  timeline?: JSONValue;
  social?: JSONValue;
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
        isLoading={props.isLoading}
        logo={props.logo}
        name={props.name}
        short_description={props.short_description}
      />
      <HackathonBody
        isLoading={props.isLoading}
        description={props.description}
        host={props.host}
        prize_pool={props.prize_pool}
        prize={props.prize}
        timeline={props.timeline}
        social={props.social}
      />
    </Container>
  );
};

export default HackathonDetails;
