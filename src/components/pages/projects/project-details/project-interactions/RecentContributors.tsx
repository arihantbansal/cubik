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

const transition = {
  type: 'spring',
  stiffness: 30,
  damping: 10,
  duration: 0.8,
};
const yTransition = { ...transition, y: { duration: 0.8 } };
const variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
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
          (contributorsData.indexOf(
            visibleContributors[visibleContributors.length - 1]
          ) +
            1) %
          contributorsData.length; // loop back to the start
        setVisibleContributors((prevVisibleContributors) => [
          ...prevVisibleContributors.slice(1),
          contributorsData[nextContributorIndex],
        ]);
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
      <HStack w="full" justify={'space-between'}>
        <Skeleton isLoaded={!isLoading}>
          <Box as="p" textStyle={'title3'} color="white">
            Recent Contributors
          </Box>
        </Skeleton>
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
      </HStack>
      <VStack align={'start'} w="full" gap="16px" color="#CBCBCB">
        <Skeleton isLoaded={!isLoading} w="full">
          {contributorsData?.map((contributor, i) => (
            <motion.div
              key={contributor.id}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={i === 0 ? yTransition : transition} // only apply y-transition for the first item
              style={{
                width: '100%',
              }}
            >
              <HStack
                // border="none"
                py="8px"
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
                    {contributor.user.mainWallet.slice(0, 4) +
                      '...' +
                      contributor.user.mainWallet.slice(-4)}
                  </Box>
                </VStack>
                <HStack gap="8px" align={'center'}>
                  <Center>
                    <SOL size={'22px'} />
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
        </Skeleton>
      </VStack>
    </VStack>
  ) : (
    <></>
  );
};
