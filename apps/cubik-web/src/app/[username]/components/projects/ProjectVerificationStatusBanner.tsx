import Spinner from '@/theme/icons/spinner.svg';
import { Box, Center, Flex, HStack, Link } from '@/utils/chakra';

import { ProjectVerifyStatus } from '@cubik/database';

export const ProjectVerificationStatusBanner = ({
  status,
  projectJoinRoundStatus,
}: {
  status: string | null | undefined;
  projectJoinRoundStatus: boolean | null | undefined;
}) => {
  if (status === null || status === undefined) return null;
  switch (status) {
    case ProjectVerifyStatus.REVIEW:
      return (
        <Flex
          flexDirection={{ base: 'column', sm: 'row' }}
          padding={{ base: '10px 16px', md: '12px 24px' }}
          w="full"
          align={{ base: 'start', sm: 'center' }}
          gap={{ base: '6px', md: '8px' }}
          borderBottom="1px solid"
          borderTopRadius={'16px'}
          backgroundColor={'#FFD83D08'}
          borderColor="#FFD83D40"
          boxShadow="0px 4px 20px rgba(0, 0, 0, 0.4)"
        >
          <HStack w="fit-content" rounded="full" p="6px 10px" bg="#110F0A">
            {/* <Box
              //   as={TbListSearch}
              color="#FFE747"
              boxSize={["10px", "12px", "13px", "14px"]}
            /> */}
            <Center
              width={['10px', '12px', '13px', '14px']}
              height={['10px', '12px', '13px', '14px']}
            >
              <Spinner color="#FFE74790" />
            </Center>
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
      if (projectJoinRoundStatus) return <></>;
      return (
        <Flex
          zIndex="9"
          flexDirection={{ base: 'column', sm: 'row' }}
          padding={{ base: '10px 16px', md: '12px 24px' }}
          w="full"
          align={{ base: 'start', sm: 'center' }}
          gap={{ base: '6px', md: '8px' }}
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
          <HStack>
            <Box
              as="p"
              noOfLines={{ base: 2, md: 1 }}
              whiteSpace={{ base: 'normal', md: 'nowrap' }}
              textStyle={{ base: 'body6', md: 'body5' }}
              color="surface.blue.1"
            >
              Your project has successfully passed Cubik verification process.
              You can now submit in a{' '}
              <Link href="/grants" style={{ textDecoration: 'underline' }}>
                <b>grants round</b>
              </Link>{' '}
              or a{' '}
              <Link href="/hackathons" style={{ textDecoration: 'underline' }}>
                <b>hackathon</b>
              </Link>
            </Box>{' '}
            {/* <InfoPopover /> */}
          </HStack>
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
          gap={{ base: '6px', md: '8px' }}
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
      return null;
  }
};
