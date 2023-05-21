import { Center, Container, Stack } from '@chakra-ui/react';
import HackathonInteractions from './HackathonInteractions';
import HackathonTabs from './HackathonTabs';

const HackathonBody = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <Container p="0px" maxW="full">
      <Stack
        gap={{ base: '12px', md: '24px', lg: '12vw' }}
        w="full"
        alignItems="top"
        direction={{ base: 'column-reverse', lg: 'row' }}
      >
        <Center w="full" flex={3}>
          <HackathonTabs />
        </Center>
        <Center w="full" h="full" flex={1.5}>
          <HackathonInteractions isLoading={isLoading} />
        </Center>
      </Stack>
    </Container>
  );
};

export default HackathonBody;
