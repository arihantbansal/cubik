import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Center,
  HStack,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import GetFormattedLink from '~/components/HOC/GetLink';
import { RoundDetailsWithProjectsWithContributionsType } from '~/types/round';

const GrantDetailsBody = ({
  data,
  isLoading,
}: {
  data: RoundDetailsWithProjectsWithContributionsType | undefined | null;
  isLoading: boolean;
}) => {
  console.log('round data - ', data);
  return (
    <Tabs variant={'cubik'} alignSelf={'start'} w="full">
      <TabList
        borderBottom="2px solid #1D1F1E"
        overflowY={{ base: 'hidden', md: 'inherit' }}
        overflowX={{ base: 'scroll', md: 'inherit' }}
        gap={{ base: '24px', md: '32px' }}
      >
        <Tab>Overview</Tab>
        <Tab gap="8px" display={'flex'}>
          <Box as="p" textStyle={{ base: 'title5', md: 'title4' }}>
            Participants
          </Box>
          {data && data?.ProjectJoinRound.length ? (
            <Tag rounded="full" variant="colorful" color="#FFF066" bg="#2D2A14">
              {data?.ProjectJoinRound.length}
            </Tag>
          ) : (
            ''
          )}
        </Tab>
        <Tab isDisabled>Contributions</Tab>
      </TabList>
      <TabPanels p="0">
        <TabPanel></TabPanel>
        <TabPanel>
          {data?.ProjectJoinRound.map((round) => (
            <Card
              key={round.project.id}
              border="none"
              px="24px"
              pt={{ base: '16px', sm: '20px', md: '24px' }}
              pb={{ base: '16px', sm: '20px', md: '24px' }}
              gap={{ base: '16px', sm: '20px', md: '24px' }}
              w="100%"
            >
              <CardBody>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  px={''}
                  gap={'12px'}
                  w="full"
                >
                  <Stack
                    w="full"
                    direction="row"
                    gap={{ base: '8px', sm: '12px', md: '16px' }}
                  >
                    <Center>
                      <Avatar
                        src={round.project.logo}
                        name={round.project.name}
                        width={{ base: '36px', sm: '48px', md: '52px' }}
                        height={{ base: '36px', sm: '48px', md: '52px' }}
                      />
                    </Center>
                    <VStack
                      alignItems={'start'}
                      align={'center'}
                      justify="center"
                      spacing={{ base: '2px', sm: '4px', md: '6px' }}
                    >
                      <Box
                        as="p"
                        textStyle={{
                          base: 'title4',
                          sm: 'title3',
                          md: 'title2',
                        }}
                        noOfLines={1}
                        textAlign="left"
                        color="white"
                      >
                        {round.project.name}
                      </Box>
                      <GetFormattedLink link={round.project.project_link} />
                    </VStack>
                  </Stack>
                  <HStack justifyContent={'end'}>
                    <Button
                      as={Link}
                      href={`/projects/${round.project.id}`}
                      variant={'cubikFilled'}
                      maxW={{ base: '100%', sm: '8rem', md: '10rem' }}
                      w={{ base: 'full', sm: '8rem', md: '10rem' }}
                      size={{ base: 'cubikMedium', md: 'cubikSmall' }}
                      onClick={() => {}}
                    >
                      View Project
                    </Button>
                  </HStack>
                </Stack>
              </CardBody>
            </Card>
          ))}
        </TabPanel>
        <TabPanel></TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default GrantDetailsBody;
