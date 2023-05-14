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
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  useToast,
  VStack,
} from '@chakra-ui/react';
import * as anchor from '@coral-xyz/anchor';
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { SuccessToast } from '~/components/common/toasts/Toasts';
import { TruncatedAddr } from '~/components/common/wallet/WalletAdd';
import GetFormattedLink from '~/components/HOC/GetLink';
import {
  connection,
  updateProjectRoundVerified,
} from '~/utils/program/contract';
import { trpc } from '~/utils/trpc';

type ActionType = 'REJECTED' | 'ACCEPTED';

interface CurrentAction {
  type: ActionType;
  id: string;
  roundName: string;
  count: number;
  owner: string;
}

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
  console.log('round id - ', roundId);
  const toast = useToast();
  const anchorWallet = useAnchorWallet();
  const roundUpdateMutation = trpc.round.updateStatus.useMutation();
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [transactionLoading, setTransactionLoading] = useState(false);
  const [currentAction, setCurrentAction] = useState<CurrentAction | null>(
    null
  );

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

  const handleRoundAction = async (
    action: ActionType,
    id: string,
    roundName: string,
    count: number,
    owner: string
  ) => {
    try {
      setTransactionLoading(true);
      // Depending on the action, we'll call a different function
      const ix =
        action === 'ACCEPTED'
          ? await updateProjectRoundVerified(
              anchorWallet as NodeWallet,
              roundName,
              count,
              owner
            )
          : await updateProjectRoundVerified(
              anchorWallet as NodeWallet,
              roundName,
              count,
              owner
            );

      const { blockhash } = await connection.getLatestBlockhash();
      const tx = new anchor.web3.Transaction();
      tx.recentBlockhash = blockhash;
      tx.feePayer = anchorWallet?.publicKey;
      tx.add(ix);
      const signedTx = await anchorWallet?.signTransaction(tx);
      if (!signedTx) throw new Error('Error signing transaction');
      const txid = await connection.sendRawTransaction(signedTx.serialize());

      // We'll also update the round status according to the action
      roundUpdateMutation.mutate({
        id: id,
        status: action,
      });

      const toastMessage =
        action === 'ACCEPTED'
          ? 'Round Accepted'
          : 'Round Rejected Successfully';
      SuccessToast({ toast, message: toastMessage });
    } catch (error: any) {
      setTransactionSignError(error.message || 'An error occurred');
    } finally {
      setTransactionLoading(false);
    }
  };

  const markApproved = (
    roundName: string,
    roundId: string,
    owner: string,
    count: number
  ) => {
    setCurrentAction({
      type: 'ACCEPTED',
      id: roundId,
      roundName: roundName,
      count,
      owner,
    });
    onActionModalOpen();
  };

  const markRejected = (
    roundName: string,
    roundId: string,
    owner: string,
    count: number
  ) => {
    setCurrentAction({
      type: 'REJECTED',
      id: roundId,
      roundName: roundName,
      count,
      owner,
    });
    onActionModalOpen();
  };

  const onActionModalOpen = () => setIsActionModalOpen(true);
  const onActionModalClose = () => setIsActionModalOpen(false);

  if (isLoading)
    <Center w="full" h="10rem">
      <Spinner />
    </Center>;

  if (isError)
    <Center w="full" h="10rem">
      There was an Error {error?.message}
    </Center>;

  return (
    <VStack spacing={4} w="full">
      {isLoading ? (
        <>Loading...</>
      ) : isError ? (
        <>There is some error</>
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
                        variant={'unstyled'}
                        px="2rem"
                        h="full"
                        minH="2.4rem"
                        w="full"
                        backgroundColor="surface.red.1"
                        border="1px solid transparent"
                        rounded="8px"
                        _hover={{
                          border: '1px solid #FF333D',
                        }}
                        color={'surface.red.2'}
                        maxW={{ base: 'full', sm: '8rem', md: '10rem' }}
                        onClick={() => {
                          markRejected(
                            roundData?.roundName as string,
                            roundData?.id as string,
                            projectJoinRound.project.owner_publickey,
                            projectJoinRound.project.projectUserCount
                          );
                        }}
                      >
                        Reject
                      </Button>
                      <Button
                        variant={'unstyled'}
                        px="2rem"
                        h="full"
                        minH="2.4rem"
                        w="full"
                        backgroundColor="brand.teal2"
                        color="brand.teal5"
                        border="1px solid"
                        borderColor={'brand.teal2'}
                        rounded="8px"
                        _hover={{
                          border: '1px solid',
                          borderColor: 'brand.teal5',
                        }}
                        maxW={{ base: 'full', sm: '8rem', md: '20rem' }}
                        onClick={() => {
                          markApproved(
                            roundData?.roundName as string,
                            roundData?.id as string,
                            projectJoinRound.project.owner.mainWallet,
                            projectJoinRound.project.projectUserCount
                          );
                        }}
                      >
                        Accept
                      </Button>
                    </HStack>
                  </Stack>
                </CardBody>
              </Card>
              <Modal
                variant={'cubik'}
                isOpen={isActionModalOpen}
                onClose={onActionModalClose}
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
                        {currentAction &&
                          (currentAction.type === 'ACCEPTED'
                            ? 'Accept Project'
                            : 'Reject Project')}
                      </Box>
                      <Box as="p" textStyle="body4" color="neutral.9">
                        Sign transaction to Perform the action
                      </Box>
                    </VStack>
                  </ModalHeader>
                  <ModalCloseButton />
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
                            hashtag.irfan@gmail.com
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
                      <VStack align={'start'} spacing="32px">
                        {transactionSignError ? (
                          <Alert status="error" variant="cubik">
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
                          <Alert
                            status={
                              currentAction?.type === 'ACCEPTED'
                                ? 'info'
                                : 'error'
                            }
                            variant="cubik"
                          >
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
                              {currentAction &&
                                (currentAction.type === 'ACCEPTED'
                                  ? 'By signing the transaction, the project will be approved and verified to be listed on cubik. The project will be able to apply for grants and visible to all users'
                                  : 'By signing the transaction, the project will be rejected which means that there was something wrong with the project and it did not get verified')}
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
                      variant="close_modal"
                      onClick={() => {
                        onActionModalClose();
                        setTransactionSignError(null);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      px="32px"
                      variant="apply_for_grant"
                      onClick={() => {
                        if (currentAction) {
                          handleRoundAction(
                            currentAction.type,
                            currentAction.id,
                            currentAction.roundName,
                            currentAction.count,
                            currentAction.owner
                          );
                        }
                      }}
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
