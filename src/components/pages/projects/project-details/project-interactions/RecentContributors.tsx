import {
  Avatar,
  Box,
  Center,
  HStack,
  Button,
  VStack,
  Flex,
  Skeleton,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { formatNumberWithK } from '~/utils/formatWithK';
import { SOL } from '~/components/common/tokens/token';
import { BiChevronRight } from 'react-icons/bi';
import { motion, AnimatePresence } from 'framer-motion';
import { trpc } from '~/utils/trpc';
import { Contribution, UserModel } from '@prisma/client';

const variants = {
  enter: { opacity: 0, y: 50 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
};

const displayedItemsCount = 3; // number of items to display at once

export const RecentContributions = ({
  projectId,
  roundId,
  isLoading,
}: {
  projectId: string;
  roundId: string;
  isLoading?: boolean;
}) => {
  const {
    data: contributorsData,
    isLoading: loadingContributors,
    isError,
    error,
  } = trpc.contribution.getProjectContributors.useQuery({ projectId, roundId });
  const [visibleContributors, setVisibleContributors] = useState<
    (Contribution & {
      user: UserModel;
    })[]
  >([]);

  useEffect(() => {
    console.log(
      '🚀 ~ file: RecentContributions.tsx ~ line 150 ~ contributorsData',
      contributorsData,
      roundId,
      projectId
    );
    if (contributorsData && contributorsData.length >= displayedItemsCount) {
      setVisibleContributors(contributorsData?.slice(0, displayedItemsCount));
    }
  }, [contributorsData]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (contributorsData && visibleContributors.length > 0) {
        const nextContributorIndex =
          contributorsData.indexOf(
            visibleContributors[visibleContributors.length - 1]
          ) + 1;
        if (
          nextContributorIndex >= 0 &&
          nextContributorIndex < contributorsData.length
        ) {
          setVisibleContributors((prevVisibleContributors) => [
            ...prevVisibleContributors.slice(1),
            contributorsData[nextContributorIndex],
          ]);
        }
      }
    }, 1000); // Update every second
    return () => clearInterval(intervalId); // Clean up on unmount
  }, [contributorsData, visibleContributors]);

  return contributorsData && contributorsData?.length > 0 ? (
    <VStack
      gap="16px"
      align={'start'}
      w={{ base: 'auto', sm: 'auto', lg: 'full' }}
    >
      <Skeleton isLoaded={!isLoading}>
        <Box as="p" textStyle={'title3'} color="white">
          Recent Contributors
        </Box>
      </Skeleton>
      <VStack align={'start'} w="full" gap="16px" color="#CBCBCB">
        <Skeleton isLoaded={!isLoading}>
          <AnimatePresence>
            {visibleContributors?.map((contributor) => (
              <motion.div
                key={contributor.id}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{ width: '100%' }}
                transition={{ type: 'spring', stiffness: 30, damping: 10 }}
              >
                <HStack
                  border="1px solid red"
                  w="full"
                  direction={'row'}
                  gap="12px"
                  align={'start'}
                  justify={'center'}
                >
                  <Avatar
                    alignSelf={'center'}
                    size="sm"
                    name={contributor.user.username}
                    src={contributor.user.profilePicture}
                  />
                  <VStack
                    w="full"
                    alignItems={'start'}
                    textAlign="start"
                    spacing="4px"
                  >
                    <Box
                      as="p"
                      textStyle={{ sm: 'title6', md: 'title5' }}
                      color="white"
                    >
                      @{contributor.user.username}
                    </Box>
                    <Box
                      as="p"
                      color="#B4B0B2"
                      textStyle={{ base: 'body6', md: 'body5' }}
                    >
                      {'asd..asdf'}
                    </Box>
                  </VStack>
                  <HStack gap="8px" align={'center'}>
                    <Center>
                      <SOL size={28} />
                    </Center>
                    <HStack align={'baseline'} color="white">
                      <Box as="p" textStyle={{ base: 'title5', md: 'title4' }}>
                        {formatNumberWithK(contributor.currentusdTotal)}
                      </Box>
                      <Box as="p" textStyle={{ base: 'title6', md: 'title7' }}>
                        SOL
                      </Box>
                    </HStack>
                  </HStack>
                </HStack>
              </motion.div>
            ))}
          </AnimatePresence>
        </Skeleton>
      </VStack>
      <Flex w="full" alignItems={'end'} justify="end">
        <Button
          size="cubikMini"
          variant="cubikText"
          h="fit-content"
          p="0"
          px="0"
          rightIcon={<Box as={BiChevronRight} />}
        >
          View All
        </Button>
      </Flex>
    </VStack>
  ) : (
    <></>
  );
};
