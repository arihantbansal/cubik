'use client';

import type { Dispatch, SetStateAction } from 'react';
import React from 'react';
import { WalletAddress } from '@/app/components/common/wallet';
import { useUser } from '@/app/context/user';
import {
  Avatar,
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  VStack,
} from '@/utils/chakra';
import type { UseFormGetValues } from 'react-hook-form';

import type { FormData } from './Form';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
  imageURL: string;
  getValues: UseFormGetValues<FormData>;
  isLoading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}
export const ConfirmUpdateModal = ({
  isOpen,
  onClose,
  imageURL,
  onUpdate,
  getValues,
  isLoading,
}: Props) => {
  const { user } = useUser();
  return (
    <Modal variant={'cubik'} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        minW={{ base: '80vw', sm: '26rem', md: '36rem' }}
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
          background: 'linear-gradient(180deg, #A8F0E6 0%, #A8F0E6 100%)',
          borderRadius: '8px 8px 0px 0px',
          zIndex: '-1',
        }}
      >
        <ModalHeader>Confirm Update</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack textAlign={'start'} align={'start'} spacing="24px">
            <VStack align={'start'} spacing={{ base: '14px', md: '16px' }}>
              <HStack align={'start'} gap={{ base: '14px', md: '16px' }}>
                <Avatar
                  src={imageURL}
                  name={getValues('projectName')}
                  borderRadius="8px"
                  width={{ base: '60px', md: '80px' }}
                  height={{ base: '60px', md: '80px' }}
                />
                <VStack textAlign={'start'} align={'start'} spacing={'8px'}>
                  <Box
                    as="p"
                    textStyle={{ base: 'title4', md: 'title2' }}
                    color="neutral.11"
                  >
                    {getValues('projectName')}
                  </Box>
                  <Box
                    as="p"
                    textStyle={{ base: 'title7', md: 'title5' }}
                    color="neutral.8"
                  >
                    {getValues('tagline')}
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
                  {getValues('email')}
                </Box>
              </VStack>
              <VStack align={'start'} textAlign="start" spacing="8px">
                <Box
                  as="p"
                  textStyle={{ base: 'title6', md: 'title5' }}
                  color="neutral.6"
                  textTransform={'uppercase'}
                >
                  Wallet Address
                </Box>
                <Box
                  as="p"
                  textStyle={{ base: 'title6', md: 'title5' }}
                  color="neutral.11"
                >
                  <WalletAddress
                    size="sm"
                    color="#fff"
                    walletAddress={user?.mainWallet as string}
                  />
                </Box>
              </VStack>
            </Stack>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            size={{ base: 'cubikMini', md: 'cubikSmall' }}
            variant="cubikOutlined"
            mr={3}
            w={'8rem'}
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            px="32px"
            isLoading={isLoading}
            onClick={onUpdate}
            size={{ base: 'cubikMini', md: 'cubikSmall' }}
            variant="cubikFilled"
          >
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
