import { Box, Flex, HStack } from '@chakra-ui/react';

import { ProjectVerifyStatus } from '@cubik/database';

export const StatusBanner = ({
  status,
}: {
  status: string;
  roundName?: string;
  startTime?: Date;
  endTime?: Date;
}) => {
  // check if projects is live and receiving donation in a live round
  switch (status) {
    case ProjectVerifyStatus.REVIEW:
      return (
        <Flex
          flexDirection={{ base: 'column', sm: 'row' }}
          padding={{ base: '10px 16px', md: '12px 24px' }}
          w="full"
          align={{ base: 'start', sm: 'center' }}
          gap="8px"
          borderBottom="1px solid"
          borderTopRadius={'16px'}
          backgroundColor={'#FFD83D08'}
          borderColor="#FFD83D40"
          boxShadow="0px 4px 20px rgba(0, 0, 0, 0.4)"
        >
          <HStack w="fit-content" rounded="full" p="6px 10px" bg="#110F0A">
            <Box
              //   as={TbListSearch}
              color="#FFE747"
              boxSize={['10px', '12px', '13px', '14px']}
            />
            <Box
              as="p"
              noOfLines={1}
              whiteSpace={'nowrap'}
              textStyle={{ base: 'body6', md: 'body5' }}
              color="surface.yellow.2"
            >
              Under Review
            </Box>
          </HStack>
          <Box
            as="p"
            noOfLines={{ base: 2, md: 1 }}
            display={{ base: 'none', md: 'block' }}
            whiteSpace={{ base: 'normal', md: 'nowrap' }}
            textStyle={{ base: 'body6', md: 'body5' }}
            color="surface.yellow.1"
          >
            Thank you for submitting. Your project is under review.
          </Box>
        </Flex>
      );
    case ProjectVerifyStatus.VERIFIED:
      return (
        <Flex
          zIndex="9"
          flexDirection={{ base: 'column', sm: 'row' }}
          padding={{ base: '10px 16px', md: '12px 24px' }}
          w="full"
          align={{ base: 'start', sm: 'center' }}
          gap="8px"
          borderBottom="1px solid"
          borderTopRadius={'16px'}
          borderColor="#1C7CEB22"
          backgroundColor={'#1C7CEB08'}
        >
          <HStack w="fit-content" rounded="full" p="6px 10px" bg="#1C7CEB">
            <Box
              //   as={MdVerified}
              color="#fff"
              boxSize={['10px', '12px', '13px', '14px']}
            />
            <Box
              as="p"
              noOfLines={1}
              whiteSpace={'nowrap'}
              textStyle={{ base: 'body6', md: 'body5' }}
              color="white"
            >
              Verified
            </Box>{' '}
          </HStack>{' '}
          <Box
            as="p"
            noOfLines={{ base: 2, md: 1 }}
            display={{ base: 'none', md: 'block' }}
            whiteSpace={{ base: 'normal', md: 'nowrap' }}
            textStyle={{ base: 'body6', md: 'body5' }}
            color="surface.blue.1"
          >
            Congratulations! Your project has been verified. You can now apply
            for grants.
          </Box>
        </Flex>
      );
    case ProjectVerifyStatus.FAILED:
      return (
        <Flex
          zIndex="9"
          flexDirection={{ base: 'column', sm: 'row' }}
          padding={{ base: '10px 16px', md: '12px 24px' }}
          w="full"
          align={{ base: 'start', sm: 'center' }}
          gap="8px"
          borderBottom="1px solid"
          borderTopRadius={'16px'}
          borderColor="surface.red.1"
          backgroundColor={'#140001'}
        >
          <HStack w="fit-content" rounded="full" p="6px 10px" bg="#660005">
            <Box
              //   as={AiOutlineWarning}
              color="#FFCAC2"
              boxSize={['10px', '12px', '13px', '14px']}
            />
            <Box
              as="p"
              noOfLines={1}
              whiteSpace={'nowrap'}
              textStyle={{ base: 'body6', md: 'body5' }}
              color="#FFCAC2"
            >
              Approval Failed
            </Box>
          </HStack>
          <Box
            as="p"
            noOfLines={{ base: 2, md: 1 }}
            display={{ base: 'none', md: 'block' }}
            whiteSpace={{ base: 'normal', md: 'nowrap' }}
            textStyle={{ base: 'body6', md: 'body5' }}
            color="#FFCAC2"
          >
            Unfortunately your project did not meet the review criteria.
          </Box>
        </Flex>
      );

    default:
      return <></>;
  }
};
