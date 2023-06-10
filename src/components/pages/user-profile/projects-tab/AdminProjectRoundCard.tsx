import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Center,
  Flex,
  HStack,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import {
  Contribution,
  ProjectJoinRound,
  ProjectJoinRoundStatus,
  Round,
  UserModel,
} from '@prisma/client';
import { FiClock } from 'react-icons/fi';
import { HiBan } from 'react-icons/hi';
import { ImCheckboxChecked } from 'react-icons/im';
import RoundStatus from '~/components/common/dates/Status';
import ProjectContributorsAdminView from '../../projects/project-details/project-interactions/project-tabs/ProjectContributorsAdminView';
import FundingOverview from './project-admin-dashboard/FundingOverview';
import ProjectInsights from './project-admin-dashboard/ProjectInsights';

const FundingRoundStatus = ({ status }: { status: string }) => {
  if (status === ProjectJoinRoundStatus.PENDING) {
    return (
      <HStack w="fit-content" rounded="full" bg="#470E47" p="6px 10px">
        <Box
          as={FiClock}
          color="#FFCCFF"
          boxSize={['10px', '11px', '12px', '14px']}
        />
        <Box
          as="p"
          noOfLines={1}
          whiteSpace={'nowrap'}
          textStyle={{ base: 'body6', md: 'body5' }}
          color="#FFCCFF"
        >
          Approval Pending
        </Box>
      </HStack>
    );
  } else if (status === ProjectJoinRoundStatus.APPROVED) {
    return (
      <HStack w="fit-content" rounded="full" p="6px 10px" bg="#6D28D9">
        <Box
          as={ImCheckboxChecked}
          color="#E6D6FF"
          boxSize={['10px', '11px', '12px', '14px']}
        />
        <Box
          as="p"
          noOfLines={1}
          whiteSpace={'nowrap'}
          textStyle={{ base: 'body6', md: 'body5' }}
          color="#E6D6FF"
        >
          Selected
        </Box>
      </HStack>
    );
  } else if (status === ProjectJoinRoundStatus.REJECTED) {
    return (
      <HStack w="fit-content" rounded="full" p="6px 10px" bg="#EB7626">
        <HiBan size={14} color="#FFE3CC" />
        <Box
          as="p"
          noOfLines={1}
          whiteSpace={'nowrap'}
          textStyle={{ base: 'body6', md: 'body5' }}
          color="#FFE3CC"
        >
          Not Selected
        </Box>
      </HStack>
    );
  } else {
    return (
      <HStack>
        <Box>Approval Pending</Box>
      </HStack>
    );
  }
};

const AdminProjectRoundCard = ({
  round,
}: {
  round: ProjectJoinRound & {
    fundingRound: Round & {
      Contribution: (Contribution & {
        user: UserModel;
      })[];
    };
  };
}) => {
  return (
    <AccordionItem overflow={'scroll'} w="full" outline="none" border="none">
      <AccordionButton
        borderRadius="12px"
        backgroundColor={'neutral.2'}
        p="16px"
        _expanded={{
          backgroundColor: 'neutral.3',
          borderBottomLeftRadius: '0px',
          borderBottomRightRadius: '0px',
        }}
        _hover={{
          backgroundColor: 'neutral.3',
        }}
        w="full"
      >
        <HStack justify={'space-between'} w="full">
          <HStack justify={'space-between'} w="full">
            <HStack gap={{ base: '6px', md: '8px' }}>
              <FundingRoundStatus status={round.status} />
              <Box
                as="p"
                textStyle={{ base: 'title6', md: 'title4' }}
                color="neutral.11"
              >
                {round.fundingRound.roundName}
              </Box>
            </HStack>
            <HStack>
              <RoundStatus
                startDate={round.fundingRound.startTime}
                endDate={round.fundingRound.endTime}
              />
            </HStack>
          </HStack>
          <AccordionIcon display={{ base: 'none', md: 'block' }} />
        </HStack>
      </AccordionButton>
      <AccordionPanel
        backgroundColor={'neutral.3'}
        borderBottomRightRadius={'12px'}
        borderBottomLeftRadius={'12px'}
      >
        {round.status === ProjectJoinRoundStatus.APPROVED ? (
          <Tabs variant={'cubik'}>
            <TabList gap="12px" height="2.5rem">
              <Tab height="2.5rem" fontSize={{ base: '14px', md: '17px' }}>
                Details
              </Tab>
              <Tab height="2.5rem" fontSize={{ base: '14px', md: '17px' }}>
                Contributors
              </Tab>
            </TabList>
            <TabPanels p={'0'}>
              <TabPanel>
                {round.fundingRound.Contribution.length > 0 && (
                  <Stack
                    gap={{ base: '64px', sm: '72px', md: '80px' }}
                    padding={{
                      base: '0px',
                      sm: '0px',
                      md: '0px 16px',
                    }}
                    direction={{ base: 'column', lg: 'row' }}
                  >
                    <FundingOverview
                      projectId={round.projectId as string}
                      roundId={round.fundingRound.id}
                    />
                    <ProjectInsights
                      projectId={round.projectId as string}
                      roundId={round.fundingRound.id}
                    />
                  </Stack>
                )}
              </TabPanel>
              <TabPanel p="0">
                <Flex
                  direction="column"
                  w="full"
                  gap="32px"
                  overflow={'scroll'}
                >
                  <ProjectContributorsAdminView
                    contributorsData={round.fundingRound.Contribution}
                  />
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
        ) : round.status === ProjectJoinRoundStatus.PENDING ? (
          <Center w="full" h="2rem">
            <Alert
              w="full"
              variant={'solid'}
              rounded="none"
              backgroundColor={'#AE7AFF10'}
              borderLeft={'2px solid'}
              borderColor={'#AE7AFF40'}
              status="info"
            >
              <Center h={'1.4rem'}>
                <Box as={AlertIcon} boxSize={'12px'} color="#AE7AFF" />
              </Center>
              <AlertDescription
                color="neutral.11"
                fontSize={{ base: '10px', md: '12px' }}
              >
                To start contributing on the platform you need to collect proofs
                by verifying your digital identity.
              </AlertDescription>
            </Alert>
          </Center>
        ) : (
          //  status = rejected
          <Center w="full" h="2rem">
            <Alert
              w="full"
              variant={'solid'}
              rounded="none"
              backgroundColor={'#AE7AFF10'}
              borderLeft={'2px solid'}
              borderColor={'#AE7AFF40'}
              status="info"
            >
              <Center h={'1.4rem'}>
                <Box as={AlertIcon} boxSize={'12px'} color="#AE7AFF" />
              </Center>
              <AlertDescription
                color="neutral.11"
                fontSize={{ base: '10px', md: '12px' }}
              >
                To start contributing on the platform you need to collect proofs
                by verifying your digital identity.
              </AlertDescription>
            </Alert>
          </Center>
        )}
      </AccordionPanel>
    </AccordionItem>
  );
};

export default AdminProjectRoundCard;
