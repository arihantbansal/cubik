'use client';

import type { Dispatch, SetStateAction } from 'react';
import React from 'react';
import { TruncatedAddr } from '@/app/components/common/wallet';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Avatar,
  Box,
  Button,
  Center,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@/utils/chakra';
import { useWallet } from '@solana/wallet-adapter-react';

interface Props {
  isTransactionModalOpen: boolean;
  profileCreated: boolean;
  onTransactionModalClose: () => void;
  userName: string;
  pfp: string;
  setTransactionError: Dispatch<SetStateAction<string | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  transactionError: string | null;
  signingTransaction: boolean;
  handleTx: () => void;
}
export const TransactionModel = ({
  profileCreated,
  isTransactionModalOpen,
  onTransactionModalClose,
  userName,
  pfp,
  setTransactionError,
  transactionError,
  signingTransaction,
  handleTx,
  setIsLoading,
}: Props) => {
  const { publicKey } = useWallet();
  return (
    <Modal
      closeOnOverlayClick={!profileCreated}
      variant={'cubik'}
      isOpen={isTransactionModalOpen}
      onClose={onTransactionModalClose}
    >
      <ModalOverlay />
      <ModalContent
        mx={{ base: '1rem', md: '0rem' }}
        overflow={'hidden'}
        position={'relative'}
        gap={{ base: '28px', md: '40px' }}
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
          background: 'linear-gradient(180deg, #A8F0E6 0%, #A8F0E6 100%)',
          borderRadius: '8px 8px 0px 0px',
          zIndex: '-1',
        }}
      >
        <ModalHeader>
          {profileCreated ? (
            <VStack w="full" gap={{ base: '18px', md: '24px' }}>
              <Center>
                <svg
                  width="96"
                  height="96"
                  viewBox="0 0 96 96"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.24">
                    <path
                      d="M95.9925 48.8377C95.5299 75.3433 73.6678 96.4552 47.1623 95.9925C20.6567 95.5299 -0.455195 73.6678 0.00746113 47.1623C0.470117 20.6567 22.3322 -0.455195 48.8377 0.00746113C75.3433 0.470117 96.4552 22.3322 95.9925 48.8377Z"
                      fill="#007A6A"
                    />
                    <path
                      d="M95.9925 48.8377C95.5299 75.3433 73.6678 96.4552 47.1623 95.9925C20.6567 95.5299 -0.455195 73.6678 0.00746113 47.1623C0.470117 20.6567 22.3322 -0.455195 48.8377 0.00746113C75.3433 0.470117 96.4552 22.3322 95.9925 48.8377Z"
                      fill="url(#paint0_linear_3032_41056)"
                    />
                    <path
                      d="M95.8925 48.836C95.4309 75.2863 73.6144 96.3542 47.164 95.8925C20.7137 95.4309 -0.354246 73.6144 0.107446 47.164C0.569138 20.7137 22.3856 -0.354246 48.836 0.107446C75.2863 0.569138 96.3542 22.3856 95.8925 48.836Z"
                      stroke="white"
                      strokeOpacity="0.18"
                      strokeWidth="0.2"
                    />
                  </g>
                  <g opacity="0.24">
                    <path
                      d="M83.9942 48.628C83.6472 68.5072 67.2506 84.3411 47.3715 83.9942C27.4923 83.6472 11.6584 67.2506 12.0054 47.3715C12.3523 27.4923 28.7489 11.6584 48.628 12.0054C68.5072 12.3523 84.3411 28.7489 83.9942 48.628Z"
                      fill="#007A6A"
                    />
                    <path
                      d="M83.9942 48.628C83.6472 68.5072 67.2506 84.3411 47.3715 83.9942C27.4923 83.6472 11.6584 67.2506 12.0054 47.3715C12.3523 27.4923 28.7489 11.6584 48.628 12.0054C68.5072 12.3523 84.3411 28.7489 83.9942 48.628Z"
                      fill="url(#paint1_linear_3032_41056)"
                    />
                    <path
                      d="M83.8942 48.6263C83.5481 68.4502 67.1972 84.2402 47.3732 83.8942C27.5493 83.5481 11.7593 67.1972 12.1053 47.3732C12.4514 27.5493 28.8024 11.7593 48.6263 12.1053C68.4502 12.4514 84.2402 28.8024 83.8942 48.6263Z"
                      stroke="white"
                      strokeOpacity="0.18"
                      strokeWidth="0.2"
                    />
                  </g>
                  <rect
                    x="25"
                    y="25"
                    width="46"
                    height="46"
                    rx="23"
                    fill="url(#paint2_linear_3032_41056)"
                  />
                  <g clipPath="url(#clip0_3032_41056)">
                    <path
                      d="M55.8592 44.3094L55.8593 44.3093C56.3556 43.813 56.3556 43.0197 55.8593 42.5235C55.3631 42.0273 54.5698 42.0273 54.0736 42.5235L45.2498 51.3473L42.2927 48.3902C41.7964 47.8939 41.0031 47.8939 40.5069 48.3902C40.0107 48.8864 40.0107 49.6797 40.5069 50.1759L44.3477 54.0168C44.8439 54.513 45.6463 54.513 46.1425 54.0169C46.1426 54.0168 46.1426 54.0168 46.1427 54.0168L55.8592 44.3094Z"
                      fill="#14665B"
                    />
                    <path
                      d="M55.8592 44.3094L55.8593 44.3093C56.3556 43.813 56.3556 43.0197 55.8593 42.5235C55.3631 42.0273 54.5698 42.0273 54.0736 42.5235L45.2498 51.3473L42.2927 48.3902C41.7964 47.8939 41.0031 47.8939 40.5069 48.3902C40.0107 48.8864 40.0107 49.6797 40.5069 50.1759L44.3477 54.0168C44.8439 54.513 45.6463 54.513 46.1425 54.0169C46.1426 54.0168 46.1426 54.0168 46.1427 54.0168L55.8592 44.3094Z"
                      fill="url(#paint3_linear_3032_41056)"
                      fillOpacity="0.48"
                    />
                    <path
                      d="M55.8592 44.3094L55.8593 44.3093C56.3556 43.813 56.3556 43.0197 55.8593 42.5235C55.3631 42.0273 54.5698 42.0273 54.0736 42.5235L45.2498 51.3473L42.2927 48.3902C41.7964 47.8939 41.0031 47.8939 40.5069 48.3902C40.0107 48.8864 40.0107 49.6797 40.5069 50.1759L44.3477 54.0168C44.8439 54.513 45.6463 54.513 46.1425 54.0169C46.1426 54.0168 46.1426 54.0168 46.1427 54.0168L55.8592 44.3094Z"
                      stroke="#14665B"
                      strokeWidth="0.710526"
                    />
                    <path
                      d="M55.8592 44.3094L55.8593 44.3093C56.3556 43.813 56.3556 43.0197 55.8593 42.5235C55.3631 42.0273 54.5698 42.0273 54.0736 42.5235L45.2498 51.3473L42.2927 48.3902C41.7964 47.8939 41.0031 47.8939 40.5069 48.3902C40.0107 48.8864 40.0107 49.6797 40.5069 50.1759L44.3477 54.0168C44.8439 54.513 45.6463 54.513 46.1425 54.0169C46.1426 54.0168 46.1426 54.0168 46.1427 54.0168L55.8592 44.3094Z"
                      stroke="url(#paint4_linear_3032_41056)"
                      strokeOpacity="0.48"
                      strokeWidth="0.710526"
                    />
                  </g>
                  <rect
                    x="25"
                    y="25"
                    width="46"
                    height="46"
                    rx="23"
                    stroke="#001F1B"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_3032_41056"
                      x1="48"
                      y1="0"
                      x2="48"
                      y2="96"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopOpacity="0" />
                      <stop offset="1" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_3032_41056"
                      x1="47.9998"
                      y1="11.9998"
                      x2="47.9998"
                      y2="83.9998"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopOpacity="0" />
                      <stop offset="1" />
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear_3032_41056"
                      x1="25"
                      y1="25"
                      x2="71"
                      y2="71"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#B3FFF5" />
                      <stop offset="1" stopColor="#5ACCBD" />
                    </linearGradient>
                    <linearGradient
                      id="paint3_linear_3032_41056"
                      x1="48.1831"
                      y1="42.5066"
                      x2="48.1831"
                      y2="54.0337"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopOpacity="0" />
                      <stop offset="1" />
                    </linearGradient>
                    <linearGradient
                      id="paint4_linear_3032_41056"
                      x1="48.1831"
                      y1="42.5066"
                      x2="48.1831"
                      y2="54.0337"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopOpacity="0" />
                      <stop offset="1" />
                    </linearGradient>
                    <clipPath id="clip0_3032_41056">
                      <rect
                        width="22"
                        height="22"
                        fill="white"
                        transform="translate(37 37)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </Center>
              <VStack spacing={{ base: '4px', md: '8px' }} w="full">
                <Box
                  textAlign={'center'}
                  as="p"
                  textStyle={{ base: 'title2', md: 'headline4' }}
                >
                  Welcome to Cubik @{userName}
                </Box>
                <Box
                  as="p"
                  textStyle={{ base: 'title4', md: 'body3' }}
                  color="neutral.8"
                >
                  You are all set to help your favorite projects.
                </Box>
              </VStack>
              <Link href={`/${userName}`}>
                <Button
                  size={{ base: 'cubikMini', md: 'cubikSmall' }}
                  variant="cubikFilled"
                >
                  Go to profile
                </Button>
              </Link>
            </VStack>
          ) : (
            <VStack
              w="full"
              spacing={{ base: '4px', md: '8px' }}
              align={'center'}
              justify="center"
            >
              <Box
                as="p"
                textStyle={{ base: 'title2', md: 'title1' }}
                color="neutral.11"
              >
                Review & Sign
              </Box>
              <Box
                as="p"
                textStyle={{ base: 'body5', md: 'body4' }}
                color="neutral.9"
              >
                Sign transaction to create Profile
              </Box>
            </VStack>
          )}
        </ModalHeader>
        {!profileCreated && (
          <>
            <ModalBody>
              <VStack align={'start'} spacing={{ base: '16px', md: '32px' }}>
                <Avatar
                  outline="1px solid white"
                  src={pfp}
                  width={{ base: '64px', md: '84px' }}
                  height={{ base: '64px', md: '84px' }}
                  borderRadius={'8px'}
                />
                <VStack align={'start'} spacing={{ base: '4px', md: '8px' }}>
                  <Box
                    as="p"
                    textStyle={{ base: 'title6', md: 'title5' }}
                    color={'neutral.6'}
                  >
                    Username
                  </Box>
                  <Box
                    as="p"
                    textStyle={{ base: 'title5', md: 'title4' }}
                    color={'neutral.11'}
                  >
                    @{userName}
                  </Box>
                </VStack>
                <VStack align={'start'} spacing={{ base: '4px', md: '8px' }}>
                  <Box
                    as="p"
                    textStyle={{ base: 'title6', md: 'title5' }}
                    color={'neutral.6'}
                  >
                    Wallet Address
                  </Box>
                  {publicKey && (
                    <Box
                      as="p"
                      textStyle={{ base: 'title5', md: 'title4' }}
                      color={'neutral.11'}
                    >
                      {TruncatedAddr({
                        walletAddress: publicKey?.toBase58(),
                      })}
                    </Box>
                  )}
                </VStack>
                {transactionError && (
                  <Alert status="error" variant="cubik">
                    <AlertIcon />
                    <AlertDescription
                      fontSize={{ base: '10px', md: '11px', xl: '12px' }}
                      lineHeight={{ base: '14px', md: '14px', xl: '16px' }}
                    >
                      {transactionError}
                    </AlertDescription>
                  </Alert>
                )}
              </VStack>
            </ModalBody>
            <ModalFooter
              display="flex"
              h={'fit-content'}
              justifyContent={profileCreated ? 'center' : 'space-between'}
              w="full"
            >
              <Button
                size={{ base: 'cubikMini', md: 'cubikSmall' }}
                variant="cubikOutlined"
                onClick={() => {
                  onTransactionModalClose();
                  setIsLoading(false);
                  setTransactionError(null);
                }}
              >
                Cancel
              </Button>
              <Button
                size={{ base: 'cubikMini', md: 'cubikSmall' }}
                variant="cubikFilled"
                px="32px"
                loadingText="Confirming"
                onClick={handleTx}
                isLoading={signingTransaction}
              >
                Sign Transaction
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
