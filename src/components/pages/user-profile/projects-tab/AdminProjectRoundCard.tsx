import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
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

const FundingRoundStatus = ({ status }: { status: string }) => {
  if (status === ProjectJoinRoundStatus.PENDING) {
    return (
      <HStack w="fit-content" rounded="full" p="6px 10px" bg="#470E47">
        <FiClock size={14} color="#FFCCFF" />
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
        <ImCheckboxChecked size={14} color="#E6D6FF" />
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
  console.log('round - ', round);
  return (
    <AccordionItem w="full" mt="24px" outline="none" border="none">
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
            <HStack gap="8px">
              <FundingRoundStatus status={round.status} />
              <Box as="p" textStyle="title4" color="neutral.11">
                {round.fundingRound.roundName} Round
              </Box>
            </HStack>
            <RoundStatus
              startDate={round.fundingRound.startTime}
              endDate={round.fundingRound.endtime}
            />
          </HStack>
          <AccordionIcon />
        </HStack>
      </AccordionButton>
      <AccordionPanel
        backgroundColor={'neutral.3'}
        borderBottomRightRadius={'12px'}
        borderBottomLeftRadius={'12px'}
      >
        {round.status === ProjectJoinRoundStatus.APPROVED && (
          <ProjectContributorsAdminView
            contributorsData={round.fundingRound.Contribution}
          />
        )}
      </AccordionPanel>
    </AccordionItem>
  );
};

export default AdminProjectRoundCard;
