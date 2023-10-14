import { Box, Modal, useDisclosure, VStack } from "@chakra-ui/react";

import { formatNumberWithK } from "~/utils/formatWithK";

const VoteModalBody = () => {
  return <></>;
};
export const ProjectsDonation = ({
  projectDetails,
}: {
  projectDetails: any;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box display={{ base: "none", md: "block" }}>
      <Modal isOpen={isOpen} onClose={onClose}>
        {/* <ModalOverlay />
        <ModalContent
          mx={{ base: '2rem', md: 'none' }}
          rounded="8px"
          backgroundColor="#1D1D1D"
        >
          <ModalHeader>
            <HStack gap="0.4rem">
              <SkeletonCircle fadeDuration={0.8} size="20" isLoaded={loading}>
                <Avatar
                  size={{ base: 'sm', md: 'md' }}
                  src={projectDetails.logo}
                  name={projectDetails.name}
                />
              </SkeletonCircle>
              <VStack gap="0" spacing="0" alignItems={'start'} justify="center">
                <Skeleton isLoaded={!loading}>
                  <Heading color="white" fontSize={{ base: 'md', md: 'xl' }}>
                    {projectDetails.name}
                  </Heading>
                </Skeleton>
                <Skeleton isLoaded={!loading}>
                  <WalletAddress
                    walletAddress={projectDetails.owner_publickey}
                    size="xs"
                    copy={true}
                    color="#E2DBDB"
                  />
                </Skeleton>
              </VStack>
            </HStack>
          </ModalHeader>
          <ModalCloseButton
            _hover={{
              background: 'none',
            }}
            transform={{ base: 'scale(0.8)', md: 'none' }}
            size={{ base: '0.4rem', md: '1rem' }}
            m="1.3rem 0.6rem"
            color={'#999999'}
          />
          <ModalBody roundedBottom={'8px'} backgroundColor={'#141414'}>
            <VoteModalBody />
          </ModalBody>
        </ModalContent> */}
      </Modal>
      <VStack
        ml="auto"
        right="20rem"
        w={"fit-content"}
        alignItems={{ base: "center", md: "start" }}
      >
        <VStack align={"end"} gap="0" spacing="0" pb="0.5rem">
          <Box as="p" textStyle="display3" color="neutral.11">
            {formatNumberWithK(
              // Number(((projectDetails.usd_total as number) * 19).toFixed(2))
              10
            )}
            $
          </Box>
          <Box as="p" textStyle="body2" color="neutral.8">
            Estimated Funds Raised
          </Box>
        </VStack>
      </VStack>
    </Box>
  );
};
