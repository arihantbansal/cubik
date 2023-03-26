import { Box, Center, HStack } from '@chakra-ui/react';
import { AiOutlineWarning } from 'react-icons/ai';
import { FiClock } from 'react-icons/fi';
import { RiDraftLine } from 'react-icons/ri';
import { RxLapTimer } from 'react-icons/rx';

const ProjectBanner = ({ status }: { status: string }) => {
  switch (status) {
    case 'active':
      return (
        <HStack
          w="full"
          gap="8px"
          backgroundColor={'#31F57908'}
          borderBottom="1px solid"
          borderColor="#31F57940"
          padding={'12px 24px'}
          borderTopRadius={'16px'}
        >
          <HStack rounded="full" bg="surface.green.3" p="6px 11px 6px 9px">
            <Center background="#31F57930" rounded="full" w="1rem" h="1rem">
              <Center
                background="surface.green.2"
                rounded="full"
                w="0.5rem"
                h="0.5rem"
              />
            </Center>
            <Box as="p" color="surface.green.2" textStyle={'body5'}>
              Live
            </Box>
          </HStack>
          <Box
            as="p"
            noOfLines={1}
            whiteSpace={'nowrap'}
            textStyle={'body5'}
            color="neutral.11"
            w="full"
          >
            Participating in Web3 Open Source Software Round
          </Box>
          <Center w="full">
            <HStack ml="auto">
              <RxLapTimer size={20} color="#FFE747" />
              <Box
                as="p"
                noOfLines={1}
                whiteSpace={'nowrap'}
                color="surface.yellow.2"
                textStyle={'title6'}
              >
                10 Days, 21 hours left
              </Box>
            </HStack>
          </Center>
        </HStack>
      );
    case 'pending':
      return (
        <HStack
          w="full"
          gap="8px"
          backgroundColor={'#FFD83D08'}
          borderBottom="1px solid"
          borderColor="#FFD83D40"
          padding={'12px 24px'}
          borderTopRadius={'16px'}
          boxShadow="0px 4px 20px rgba(0, 0, 0, 0.4)"
        >
          <HStack rounded="full" bg="#FEF08A08" p="6px 11px 6px 9px">
            <FiClock size={16} color="#FFE747" />
            <Box
              as="p"
              noOfLines={1}
              whiteSpace={'nowrap'}
              color="surface.yellow.2"
              textStyle={'body5'}
            >
              Approval Pending
            </Box>
          </HStack>
          <Box
            as="p"
            noOfLines={1}
            whiteSpace={'nowrap'}
            textStyle={'body5'}
            color="neutral.11"
          >
            Your project is under review and you will be notified soon.
          </Box>
          <HStack></HStack>
        </HStack>
      );
    case 'draft':
      return (
        <HStack
          w="full"
          gap="8px"
          backgroundColor={'neutral.3'}
          borderBottom="1px solid"
          borderColor="neutral.5"
          padding={'12px 24px'}
          borderTopRadius={'16px'}
        >
          <HStack rounded="full" bg="neutral.4" p="6px 11px 6px 9px">
            <RiDraftLine size={16} color="#D7E0DF" />
            <Box
              as="p"
              noOfLines={1}
              whiteSpace={'nowrap'}
              color="#D7E0DF"
              textStyle={'body5'}
            >
              Draft
            </Box>
          </HStack>
          <HStack></HStack>
        </HStack>
      );
    case 'rejected':
      return (
        <HStack
          w="full"
          gap="8px"
          backgroundColor={'#140001'}
          borderBottom="1px solid"
          borderColor="surface.red.1"
          padding={'12px 24px'}
          borderTopRadius={'16px'}
        >
          <HStack rounded="full" bg="surface.red.1" p="6px 11px 6px 9px">
            <AiOutlineWarning size={16} color="#FFCAC2" />
            <Box
              as="p"
              noOfLines={1}
              whiteSpace={'nowrap'}
              color="#FFCAC2"
              textStyle={'body5'}
            >
              Approval Failed
            </Box>
          </HStack>
          <Box
            as="p"
            noOfLines={1}
            whiteSpace={'nowrap'}
            textStyle={'body5'}
            color="surface.red.3"
          >
            Unfortunately your project did not meet the review criteria.
          </Box>
          <HStack></HStack>
        </HStack>
      );
    default:
      return null;
  }
};

export default ProjectBanner;
