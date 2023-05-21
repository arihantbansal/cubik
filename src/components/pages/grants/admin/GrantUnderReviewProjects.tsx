import {
  Alert,
  AlertDescription,
  AlertIcon,
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Center,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import * as anchor from '@coral-xyz/anchor';
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { FailureToast, SuccessToast } from '~/components/common/toasts/Toasts';
import { TruncatedAddr } from '~/components/common/wallet/WalletAdd';
import GetFormattedLink from '~/components/HOC/GetLink';
import {
  connection,
  updateProjectRoundVerified,
} from '~/utils/program/contract';
import { trpc } from '~/utils/trpc';

const GrantUnderReviewProjects = ({
  roundId,
  setProjectsNumberByStatus,
}: any) => {
  const {
    data: roundData,
    isLoading,
    isError,
    error,
  } = trpc.round.findInReview.useQuery({ id: roundId });
  const toast = useToast();
  const anchorWallet = useAnchorWallet();
  const updateRound = trpc.round.updateStatus.useMutation({
    onSuccess: () => {
      SuccessToast({ toast, message: 'Project Accepted in Round' });
    },
    onError: (error) => {
      FailureToast({ toast, message: 'Something went wrong!' });
    },
  });
  const [transactionLoading, setTransactionLoading] = useState(false);
  const {
    isOpen: isRejectModalOpen,
    onOpen: onRejectModelOpen,
    onClose: onRejectModelClose,
  } = useDisclosure();
  const {
    isOpen: isAcceptModalOpen,
    onOpen: onAcceptModalOpen,
    onClose: onAcceptModelClose,
  } = useDisclosure();
  const [transactionSignError, setTransactionSignError] = useState<
    string | null
  >();

  useEffect(() => {
    if (roundData?.ProjectJoinRound) {
      setProjectsNumberByStatus((prev: any) => ({
        ...prev,
        review: roundData.ProjectJoinRound.length,
      }));
    }
  }, [roundData?.ProjectJoinRound, setProjectsNumberByStatus]);

  const markVerified = async (
    projectId: string,
    walletAddress: string,
    projectCount: number
  ) => {
    const ix = await updateProjectRoundVerified(
      anchorWallet as NodeWallet,
      roundData?.roundName as string,
      projectCount,
      walletAddress
    );
    const { blockhash } = await connection.getLatestBlockhash();
    const tx = new anchor.web3.Transaction();
    tx.recentBlockhash = blockhash;
    tx.feePayer = anchorWallet?.publicKey;
    tx.add(ix);

    const signed = await anchorWallet?.signTransaction(tx);
    const txid = await connection.sendRawTransaction(signed!.serialize());
    if (!txid) return;
    updateRound.mutate({
      roundId: roundId,
      projectId: projectId,
      status: 'ACCEPTED',
    });
  };

  const markUnverified = async (
    projectId: string,
    walletAddress: string,
    projectCount: number
  ) => {
    const ix = await updateProjectRoundVerified(
      anchorWallet as NodeWallet,
      roundData?.roundName as string,
      projectCount,
      walletAddress
    );
    const { blockhash } = await connection.getLatestBlockhash();
    const tx = new anchor.web3.Transaction();
    tx.recentBlockhash = blockhash;
    tx.feePayer = anchorWallet?.publicKey;
    tx.add(ix);

    const signed = await anchorWallet?.signTransaction(tx);
    const txid = await connection.sendRawTransaction(signed!.serialize());

    if (!txid) {
      throw new Error('txid is null');
    }
    updateRound.mutate({
      roundId,
      projectId,
      status: 'REJECTED',
    });
  };

  console.log('projects under review - ', roundData);

  return (
    <VStack spacing={4} w="full">
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <>There is some error - {error.message}</>
      ) : (
        <>
          {roundData?.ProjectJoinRound.map((projectJoinRound) => (
            <>
              <Card
                key={projectJoinRound.project.id}
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
                          src={projectJoinRound.project.logo}
                          name={projectJoinRound.project.name}
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
                          {projectJoinRound.project.name}
                        </Box>
                        <GetFormattedLink
                          link={projectJoinRound.project.project_link}
                        />
                      </VStack>
                    </Stack>
                    <HStack justifyContent={'end'}>
                      <Button
                        variant={'cubikDanger'}
                        maxW={{ base: 'full', sm: '8rem', md: '10rem' }}
                        onClick={onRejectModelOpen}
                      >
                        Reject
                      </Button>
                      <Button
                        variant={'cubikFilled'}
                        maxW={{ base: 'full', sm: '8rem', md: '20rem' }}
                        onClick={onAcceptModalOpen}
                      >
                        Accept
                      </Button>
                    </HStack>
                  </Stack>
                </CardBody>
              </Card>
              {/* Accept Model */}
              <Modal
                key={'accept' + projectJoinRound.project.id}
                variant={'cubik'}
                isOpen={isAcceptModalOpen}
                onClose={() => {
                  onAcceptModalOpen();
                  setTransactionLoading(false);
                  setTransactionSignError(null);
                }}
              >
                <ModalOverlay opacity={'1%'} />
                <ModalContent
                  minW={{ base: '24rem', md: '36rem' }}
                  overflow={'hidden'}
                  position={'relative'}
                  gap={{ base: '32px', md: '48px' }}
                  textAlign={'center'}
                  _before={{
                    content: '""',
                    position: 'absolute',
                    top: '-10%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    rounded: '50%',
                    filter: 'blur(80px)',
                    width: '6rem',
                    height: '6rem',
                    background:
                      'linear-gradient(180deg, #A8F0E6 0%, #A8F0E6 100%)',
                    borderRadius: '8px 8px 0px 0px',
                    zIndex: '-1',
                  }}
                >
                  <ModalHeader>
                    <VStack
                      w="full"
                      spacing="8px"
                      align={'center'}
                      justify="center"
                    >
                      <Box as="p" textStyle="title1" color="neutral.11">
                        Accept Project
                      </Box>
                      <Box as="p" textStyle="body4" color="neutral.9">
                        Sign transaction to Perform the action
                      </Box>
                    </VStack>
                  </ModalHeader>
                  <ModalBody>
                    <VStack textAlign={'start'} align={'start'} spacing="24px">
                      <VStack align={'start'} spacing="16px">
                        <HStack align={'start'} gap="16px">
                          <Avatar
                            src={projectJoinRound.project.logo}
                            name={projectJoinRound.project.name}
                            borderRadius="8px"
                            width={{ base: '60px', md: '80px' }}
                            height={{ base: '60px', md: '80px' }}
                          />
                          <VStack textAlign={'start'} align={'start'} gap="8px">
                            <Box
                              as="p"
                              textStyle={{ base: 'title3', md: 'title2' }}
                              color="neutral.11"
                            >
                              {projectJoinRound.project.name}
                            </Box>
                            <Box
                              as="p"
                              textStyle={{ base: 'title6', md: 'title5' }}
                              color="neutral.8"
                            >
                              {projectJoinRound.project.short_description}
                            </Box>
                          </VStack>
                        </HStack>
                      </VStack>
                      <Stack
                        justify={'start'}
                        gap="32px"
                        direction={{ base: 'column', md: 'row' }}
                      >
                        <VStack align={'start'} textAlign="start" spacing="8px">
                          <Box
                            as="p"
                            textStyle={{ base: 'title6', md: 'title5' }}
                            color="neutral.6"
                            textTransform={'uppercase'}
                          >
                            Email Address
                          </Box>
                          <Box
                            as="p"
                            textStyle={{ base: 'title6', md: 'title5' }}
                            color="neutral.11"
                          >
                            {projectJoinRound.project.email}
                          </Box>
                        </VStack>
                        <VStack align={'start'} textAlign="start" spacing="8px">
                          <Box
                            as="p"
                            textStyle={{ base: 'title6', md: 'title5' }}
                            color="neutral.6"
                            textTransform={'uppercase'}
                          >
                            Creator
                          </Box>
                          <Box
                            as="p"
                            textStyle={{ base: 'title6', md: 'title5' }}
                            color="neutral.11"
                          >
                            @{projectJoinRound.project.owner.username}{' '}
                            <Box px="0.5rem" as="span" color="neutral.6">
                              {TruncatedAddr({
                                walletAddress:
                                  projectJoinRound.project.owner_publickey,
                              })}
                            </Box>
                          </Box>
                        </VStack>
                      </Stack>
                      <VStack w="full" align={'start'} spacing="32px">
                        {transactionSignError ? (
                          <Alert w="full" status="error" variant="cubik">
                            <AlertIcon />
                            <AlertDescription
                              fontSize={{
                                base: '10px',
                                md: '11px',
                                xl: '12px',
                              }}
                              lineHeight={{
                                base: '14px',
                                md: '14px',
                                xl: '16px',
                              }}
                            >
                              {transactionSignError}
                            </AlertDescription>
                          </Alert>
                        ) : (
                          <Alert status={'info'} variant="cubik">
                            <AlertIcon />
                            <AlertDescription
                              fontSize={{
                                base: '10px',
                                md: '11px',
                                xl: '12px',
                              }}
                              lineHeight={{
                                base: '14px',
                                md: '14px',
                                xl: '16px',
                              }}
                            >
                              By signing the transaction, the project will be
                              approved and verified to for participating in this
                              grant round
                            </AlertDescription>
                          </Alert>
                        )}
                      </VStack>
                    </VStack>
                  </ModalBody>
                  <ModalFooter
                    display="flex"
                    h={'fit-content'}
                    justifyContent="space-between"
                  >
                    <Button
                      w="8rem"
                      variant="cubikOutlined"
                      size={'cubikSmall'}
                      onClick={() => {
                        onAcceptModelClose();
                        setTransactionLoading(false);
                        setTransactionSignError(null);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      px="32px"
                      variant="cubikFilled"
                      loadingText="Signing"
                      size={'cubikSmall'}
                      onClick={() =>
                        markVerified(
                          projectJoinRound.project.id,
                          projectJoinRound.project.owner_publickey,
                          projectJoinRound.project.projectUserCount
                        )
                      }
                      isLoading={transactionLoading}
                    >
                      Sign Transaction
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              {/* Reject Model */}
              <Modal
                key={'reject' + projectJoinRound.project.id}
                variant={'cubik'}
                isOpen={isRejectModalOpen}
                onClose={() => {
                  onRejectModelClose();
                  setTransactionLoading(false);
                  setTransactionSignError(null);
                }}
              >
                <ModalOverlay opacity={'1%'} />
                <ModalContent
                  minW={{ base: '24rem', md: '36rem' }}
                  overflow={'hidden'}
                  position={'relative'}
                  gap={{ base: '32px', md: '48px' }}
                  textAlign={'center'}
                  _before={{
                    content: '""',
                    position: 'absolute',
                    top: '-10%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    rounded: '50%',
                    filter: 'blur(80px)',
                    width: '6rem',
                    height: '6rem',
                    background:
                      'linear-gradient(180deg, #A8F0E6 0%, #A8F0E6 100%)',
                    borderRadius: '8px 8px 0px 0px',
                    zIndex: '-1',
                  }}
                >
                  <ModalHeader>
                    <VStack
                      w="full"
                      spacing="8px"
                      align={'center'}
                      justify="center"
                    >
                      <Box as="p" textStyle="title1" color="neutral.11">
                        Reject Project
                      </Box>
                      <Box as="p" textStyle="body4" color="neutral.9">
                        Sign transaction to Perform the action
                      </Box>
                    </VStack>
                  </ModalHeader>
                  <ModalBody>
                    <VStack textAlign={'start'} align={'start'} spacing="24px">
                      <VStack align={'start'} spacing="16px">
                        <HStack align={'start'} gap="16px">
                          <Avatar
                            src={projectJoinRound.project.logo}
                            name={projectJoinRound.project.name}
                            borderRadius="8px"
                            width={{ base: '60px', md: '80px' }}
                            height={{ base: '60px', md: '80px' }}
                          />
                          <VStack textAlign={'start'} align={'start'} gap="8px">
                            <Box
                              as="p"
                              textStyle={{ base: 'title3', md: 'title2' }}
                              color="neutral.11"
                            >
                              {projectJoinRound.project.name}
                            </Box>
                            <Box
                              as="p"
                              textStyle={{ base: 'title6', md: 'title5' }}
                              color="neutral.8"
                            >
                              {projectJoinRound.project.short_description}
                            </Box>
                          </VStack>
                        </HStack>
                      </VStack>
                      <Stack
                        justify={'start'}
                        gap="32px"
                        direction={{ base: 'column', md: 'row' }}
                      >
                        <VStack align={'start'} textAlign="start" spacing="8px">
                          <Box
                            as="p"
                            textStyle={{ base: 'title6', md: 'title5' }}
                            color="neutral.6"
                            textTransform={'uppercase'}
                          >
                            Email Address
                          </Box>
                          <Box
                            as="p"
                            textStyle={{ base: 'title6', md: 'title5' }}
                            color="neutral.11"
                          >
                            {projectJoinRound.project.email}
                          </Box>
                        </VStack>
                        <VStack align={'start'} textAlign="start" spacing="8px">
                          <Box
                            as="p"
                            textStyle={{ base: 'title6', md: 'title5' }}
                            color="neutral.6"
                            textTransform={'uppercase'}
                          >
                            Creator
                          </Box>
                          <Box
                            as="p"
                            textStyle={{ base: 'title6', md: 'title5' }}
                            color="neutral.11"
                          >
                            @{projectJoinRound.project.owner.username}{' '}
                            <Box px="0.5rem" as="span" color="neutral.6">
                              {TruncatedAddr({
                                walletAddress:
                                  projectJoinRound.project.owner_publickey,
                              })}
                            </Box>
                          </Box>
                        </VStack>
                      </Stack>
                      <VStack w="full" align={'start'} spacing="32px">
                        {transactionSignError ? (
                          <Alert w="full" status="error" variant="cubik">
                            <AlertIcon />
                            <AlertDescription
                              fontSize={{
                                base: '10px',
                                md: '11px',
                                xl: '12px',
                              }}
                              lineHeight={{
                                base: '14px',
                                md: '14px',
                                xl: '16px',
                              }}
                            >
                              {transactionSignError}
                            </AlertDescription>
                          </Alert>
                        ) : (
                          <Alert status={'error'} variant="cubik">
                            <AlertIcon />
                            <AlertDescription
                              fontSize={{
                                base: '10px',
                                md: '11px',
                                xl: '12px',
                              }}
                              lineHeight={{
                                base: '14px',
                                md: '14px',
                                xl: '16px',
                              }}
                            >
                              By signing the transaction, the project will be
                              rejected from this round.
                            </AlertDescription>
                          </Alert>
                        )}
                      </VStack>
                    </VStack>
                  </ModalBody>
                  <ModalFooter
                    display="flex"
                    h={'fit-content'}
                    justifyContent="space-between"
                  >
                    <Button
                      w="8rem"
                      variant="cubikOutlined"
                      size={'cubikSmall'}
                      onClick={() => {
                        onRejectModelClose();
                        setTransactionLoading(false);
                        setTransactionSignError(null);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      px="32px"
                      variant="cubikFilled"
                      loadingText="Signing"
                      size={'cubikSmall'}
                      onClick={() =>
                        markUnverified(
                          projectJoinRound.project.id,
                          projectJoinRound.project.owner_publickey,
                          projectJoinRound.project.projectUserCount
                        )
                      }
                      isLoading={transactionLoading}
                    >
                      Sign Transaction
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>
          ))}
        </>
      )}
    </VStack>
  );
};

export default GrantUnderReviewProjects;
