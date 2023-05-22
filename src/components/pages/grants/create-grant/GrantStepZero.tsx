import {
  Box,
  CardBody,
  ListItem,
  UnorderedList,
  VStack,
} from '@chakra-ui/react';

const GrantStepZero = () => {
  return (
    <CardBody w="full">
      <VStack align="start" spacing="48px" textAlign={'start'} w="full">
        <VStack
          px="56px"
          pt="56px"
          w="full"
          align={'start'}
          spacing={{ base: '10px', md: '12px' }}
        >
          <Box
            as="p"
            textStyle={{ base: 'headline3', md: 'headline2' }}
            color={'neutral.11'}
          >
            Welcome to Cubik Grant Round Management
          </Box>
          <Box
            as="p"
            textStyle={{ base: 'title3', md: 'title2' }}
            color={'neutral.9'}
          >
            Embark on an empowering journey where you can establish and manage
            your own grant round.
          </Box>
        </VStack>
        <Box height="1px" w="full" backgroundColor={'#1D1F1E'} />
        <VStack px="56px" w="full" align="start">
          <UnorderedList w="full" spacing={3}>
            <Box
              as="p"
              textStyle={{ base: 'title4', md: 'title3' }}
              color={'neutral.11'}
            >
              Using Cubik, you have the ability to:
            </Box>
            <ListItem>
              <Box
                textStyle={{ base: 'body4', md: 'body3' }}
                color={'neutral.9'}
              >
                Create your own grants round tailored to your preferred funding
                methodology
              </Box>
            </ListItem>
            <ListItem>
              <Box
                textStyle={{ base: 'body4', md: 'body3' }}
                color={'neutral.9'}
              >
                Choose grant round period, cap the total projects, and define
                unique eligibility standards to pull in ideal projects.
              </Box>
            </ListItem>
            <ListItem>
              <Box
                textStyle={{ base: 'body4', md: 'body3' }}
                color={'neutral.9'}
              >
                Set up your grant round with a team to effectively oversee and
                maintain the entire process.
              </Box>
            </ListItem>
            <ListItem>
              <Box
                textStyle={{ base: 'body4', md: 'body3' }}
                color={'neutral.9'}
              >
                Manage your matching pool funds in a multisig wallet you and
                your team controls.
              </Box>
            </ListItem>
          </UnorderedList>
        </VStack>
        <VStack px="56px" w="full" align="start">
          <Box
            as="p"
            textStyle={{ base: 'title4', md: 'title3' }}
            color={'neutral.11'}
          >
            Our platform places you at the center of community engagement.
          </Box>
          <Box textStyle={{ base: 'body4', md: 'body3' }} color={'neutral.9'}>
            You can interface with passionate creators, select projects that
            resonate with your objectives, and manage the grant process with
            transparency and efficiency.
          </Box>
        </VStack>
        <Box
          px="56px"
          textStyle={{ base: 'body4', md: 'body3' }}
          color={'neutral.9'}
        >
          Remember, in creating a grant round, you`re nurturing innovation,
          contributing significantly to the community, and shaping the future of
          Web3.
        </Box>
        <Box height="1px" w="full" backgroundColor={'#1D1F1E'} />
        <VStack px="56px" align={'start'}>
          <Box textStyle={{ base: 'title3', md: 'title2' }} color={'neutral.9'}>
            Ready to lead change?
          </Box>
        </VStack>
      </VStack>
    </CardBody>
  );
};

export default GrantStepZero;
