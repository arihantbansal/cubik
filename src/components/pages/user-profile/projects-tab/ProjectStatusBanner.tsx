import { Box, Center, HStack } from '@chakra-ui/react';
import { AiOutlineWarning } from 'react-icons/ai';
import { FiClock } from 'react-icons/fi';
import { MdVerified } from 'react-icons/md';
import { RiDraftLine } from 'react-icons/ri';
import { RxLapTimer } from 'react-icons/rx';
import { TbListSearch } from 'react-icons/tb';
import { ImCheckboxChecked } from 'react-icons/im';
import { HiBan } from 'react-icons/hi';
import { ProjectVerifyStatus } from '@prisma/client';

//todo: use enums for status
const ProjectStatusBanner = ({ status }: { status: string }) => {
  switch (status) {
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
    case ProjectVerifyStatus.review:
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
            <TbListSearch size={16} color="#FFE747" />
            <Box
              as="p"
              noOfLines={1}
              whiteSpace={'nowrap'}
              color="surface.yellow.2"
              textStyle={'body5'}
            >
              Under Review
            </Box>
          </HStack>
          <Box
            display={{ base: 'none', md: 'block' }}
            as="p"
            noOfLines={1}
            whiteSpace={'nowrap'}
            textStyle={'body5'}
            color="surface.yellow.1"
          >
            Thank you for submitting. Your project is under review.
          </Box>
          <HStack></HStack>
        </HStack>
      );
    case ProjectVerifyStatus.verified:
      return (
        <HStack
          w="full"
          gap="8px"
          backgroundColor={'#1C7CEB08'}
          borderBottom="1px solid"
          borderColor="#1C7CEB22"
          padding={'12px 24px'}
          borderTopRadius={'16px'}
        >
          <HStack rounded="full" bg="#1C7CEB" p="6px 11px 6px 9px">
            <MdVerified size={16} color="#fff" />
            <Box
              as="p"
              noOfLines={1}
              whiteSpace={'nowrap'}
              color="white"
              textStyle={'body5'}
            >
              Verified
            </Box>{' '}
          </HStack>{' '}
          <Box
            as="p"
            noOfLines={1}
            display={{ base: 'none', md: 'block' }}
            whiteSpace={'nowrap'}
            textStyle={'body5'}
            color="surface.blue.1"
          >
            Congratulations! Your project has been verified. You can now apply
            for grants.
          </Box>
          <HStack></HStack>
        </HStack>
      );
    case ProjectVerifyStatus.failed:
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
          <HStack rounded="full" bg="#660005" p="6px 11px 6px 9px">
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
            display={{ base: 'none', md: 'block' }}
            whiteSpace={'nowrap'}
            textStyle={'body5'}
            color="#FFCAC2"
          >
            Unfortunately your project did not meet the review criteria.
          </Box>
          <HStack></HStack>
        </HStack>
      );
    case 'live':
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
            display={{ base: 'none', md: 'block' }}
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
    case 'selected':
      return (
        <HStack
          w="full"
          gap="8px"
          backgroundColor={'#0A001A'}
          borderBottom="1px solid"
          borderColor="#8F47FF16"
          padding={'12px 24px'}
          borderTopRadius={'16px'}
        >
          <HStack rounded="full" bg="#6D28D9" p="6px 11px 6px 9px">
            <ImCheckboxChecked size={14} color="#E6D6FF" />
            <Box
              as="p"
              noOfLines={1}
              whiteSpace={'nowrap'}
              color="#E6D6FF"
              textStyle={'body5'}
            >
              Selected
            </Box>
          </HStack>
          <Box
            as="p"
            noOfLines={1}
            display={{ base: 'none', md: 'block' }}
            whiteSpace={'nowrap'}
            textStyle={'body5'}
            color="#E6D6FF"
          >
            Congratulations your project has been selected to participate in
            Round Name
          </Box>
          <HStack></HStack>
        </HStack>
      );
    case 'not_selected':
      return (
        <HStack
          w="full"
          gap="8px"
          backgroundColor={'#0F0A00'}
          borderBottom="1px solid"
          borderColor="#FFA50010"
          padding={'12px 24px'}
          borderTopRadius={'16px'}
        >
          <HStack rounded="full" bg="#EB7626" p="6px 11px 6px 9px">
            <HiBan size={16} color="#FFE3CC" />
            <Box
              as="p"
              noOfLines={1}
              whiteSpace={'nowrap'}
              color="#FFE3CC"
              textStyle={'body5'}
            >
              Not Selected
            </Box>
          </HStack>
          <Box
            as="p"
            noOfLines={1}
            display={{ base: 'none', md: 'block' }}
            whiteSpace={'nowrap'}
            textStyle={'body5'}
            color="surface.red.3"
          >
            Thank you for your submission, but unfortunately it did not meet our
            review criteria.
          </Box>
          <HStack></HStack>
        </HStack>
      );
    case 'approval_pending':
      return (
        <HStack
          w="full"
          gap="8px"
          backgroundColor={'#0F030F'}
          borderBottom="1px solid"
          borderColor="#330A33"
          padding={'12px 24px'}
          borderTopRadius={'16px'}
        >
          <HStack rounded="full" bg="#470E47" p="6px 11px 6px 9px">
            <FiClock size={16} color="#FFCCFF" />
            <Box
              as="p"
              noOfLines={1}
              whiteSpace={'nowrap'}
              color="#FFCCFF"
              textStyle={'body5'}
            >
              Approval Pending
            </Box>
          </HStack>
          <Box
            as="p"
            noOfLines={1}
            display={{ base: 'none', md: 'block' }}
            whiteSpace={'nowrap'}
            textStyle={'body5'}
            color="#FFCCFF"
          >
            Your project is currently under review by Grant Provider. Check your
            mail for more information.
          </Box>
          <HStack></HStack>
        </HStack>
      );
    default:
      return null;
  }
};

export default ProjectStatusBanner;
