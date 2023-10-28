import React from 'react';
import type { HackathonHost } from '@/types/hackathon';
import { Avatar, Box, Center, HStack, Skeleton, VStack } from '@/utils/chakra';
import { formatNumberWithK } from '@/utils/helpers/formatWithK';

export const HackathonInteractions = ({
  host,
  prizePool,
}: {
  host: HackathonHost[];
  prizePool: number;
}) => {
  return (
    <>
      <VStack w="full" gap="48px">
        <VStack gap={{ base: '8px', md: '16px' }} align="start" w="full">
          <Box
            as="p"
            textStyle={{ base: 'title4', md: 'title3' }}
            color="white"
          >
            Organizer
          </Box>
          <VStack align="start" w="full" gap="12px" justify="space-between">
            <HStack w="full" gap="0.6rem">
              <Avatar
                border="2px solid #FFFFFF10"
                borderRadius={'8px'}
                size={{ base: 'sm', md: 'md' }}
                src={
                  'https://pbs.twimg.com/profile_images/1669101939164954624/AROCJGg5_400x400.jpg'
                }
              />
              <Box
                color={'white'}
                as="p"
                textStyle={{ base: 'title5', md: 'title4' }}
              >
                Lamport DAO
              </Box>
            </HStack>
          </VStack>
        </VStack>
        <VStack gap={{ base: '8px', md: '16px' }} align="start" w="full">
          <Box
            as="p"
            textStyle={{ base: 'title4', md: 'title3' }}
            color="white"
          >
            Prize Pool
          </Box>

          <VStack
            border="1px solid"
            borderColor={'surface.green.3'}
            rounded="16px"
            backgroundColor={'surface.green.0'}
            w="full"
            p="24px 32px"
            overflow={'hidden'}
            position={'relative'}
          >
            {' '}
            <Box
              as="svg"
              position="absolute"
              top="50%"
              left="0%"
              transform="translate(-50%, -50%)"
              zIndex={-1}
              width="22rem"
              height="22rem"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                filter: 'blur(45px)',
              }}
            >
              <circle cx="50" cy="50" r="50" fill="#31F57930" />
            </Box>
            <HStack w="full" align={'start'}>
              <VStack align={'start'} gap="8px">
                <Box
                  as="p"
                  textStyle={'headline4'}
                  textTransform={'uppercase'}
                  color={'neutral.11'}
                >
                  $ {formatNumberWithK(prizePool)}
                </Box>
              </VStack>
              <Center
                position={'absolute'}
                right="0"
                bottom="0"
                boxShadow="0px 4px 24px rgba(0, 0, 0, 0.16)"
              >
                <svg
                  width="101"
                  height="106"
                  viewBox="0 0 101 106"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_1363_21440)">
                    <path
                      d="M60.0472 117.591C61.135 117.783 62.1723 117.057 62.3641 115.969L63.5644 109.162C85.2513 111.092 99.1889 102.466 102.236 85.1849C104.839 70.4213 97.7263 59.8371 80.9811 52.9561L74.2603 50.3622C74.0819 50.2934 73.9772 50.1079 74.0104 49.9196L78.3481 25.3196C78.3903 25.0803 78.6354 24.9336 78.8646 25.0145C85.0046 27.1823 88.8912 32.3205 88.9551 37.9564C88.9673 39.0364 89.672 40.0375 90.7355 40.2251L105.737 42.8702C106.838 43.0643 107.892 42.3153 107.992 41.2016C109.323 26.3915 99.1384 13.9916 81.1991 9.15052L82.5073 1.7313C82.6991 0.643507 81.9728 -0.393808 80.885 -0.585614L75.2313 -1.58252C74.1435 -1.77432 73.1062 -1.04799 72.9144 0.0398027L71.6182 7.39099C50.9197 5.42491 37.0501 14.0631 34.111 30.7317C31.6158 44.883 38.7248 55.8874 54.4494 62.5885L61.0704 65.4359C61.2408 65.5092 61.3385 65.6901 61.3062 65.8728L56.7602 91.6549C56.7188 91.8896 56.481 92.036 56.2535 91.9652C48.7794 89.6366 44.1646 84.3615 43.9698 78.1243C43.937 77.0724 43.2372 76.1147 42.2007 75.9319L26.5619 73.1744C25.4709 72.982 24.4237 73.716 24.3056 74.8174C22.6208 90.5407 33.6616 102.748 53.9594 107.539L52.7712 114.278C52.5794 115.365 53.3057 116.403 54.3935 116.594L60.0472 117.591ZM82.5982 83.9671C81.3467 91.0647 75.4625 94.7634 66.6889 93.8994C66.4595 93.8768 66.2974 93.6625 66.3374 93.4355L70.5698 69.4325C70.6135 69.1844 70.8763 69.0392 71.1103 69.1326C80.1026 72.7206 83.7427 77.4763 82.5982 83.9671ZM54.0731 32.4978C55.1913 26.1561 61.1295 22.3527 68.4255 23.0613C68.654 23.0835 68.8135 23.2972 68.7736 23.5233L64.7941 46.0925C64.7499 46.3431 64.4838 46.4885 64.2493 46.3897C56.5783 43.1581 53.0378 38.369 54.0731 32.4978Z"
                      fill="#0B120C"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1363_21440"
                      x="0.136719"
                      y="-21.6133"
                      width="131.973"
                      height="167.234"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="4" />
                      <feGaussianBlur stdDeviation="12" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1363_21440"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1363_21440"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </Center>
            </HStack>
          </VStack>
        </VStack>
        <VStack gap={{ base: '8px', md: '16px' }} align="start" w="full">
          <Box
            as="p"
            textStyle={{ base: 'title4', md: 'title3' }}
            color="white"
          >
            Hosts
          </Box>
          <VStack gap={'2px'} align="start" w="full">
            {host.map((team) => {
              return (
                <>
                  <HStack py="8px" w="full" justify="space-between">
                    <HStack gap="0.6rem">
                      <Avatar
                        borderRadius={'8px'}
                        size={{ base: 'sm', md: 'sm' }}
                        border="1px solid #FFFFFF10"
                        src={team.avatar}
                        name={team.name}
                      />
                      <Box
                        color={'white'}
                        as="p"
                        textStyle={{ base: 'body4', md: 'body3' }}
                        fontWeight={'600 !important'}
                      >
                        @{team.name}
                      </Box>
                    </HStack>
                    <Skeleton isLoaded={!!team.wallet}>
                      <Box
                        color="#B4B0B2"
                        as="p"
                        textStyle={{ base: 'body5', md: 'body4' }}
                      >
                        {team.wallet.slice(0, 4)}...{team.wallet.slice(-4)}
                      </Box>
                    </Skeleton>
                  </HStack>
                </>
              );
            })}
          </VStack>
        </VStack>
        {/* <VStack gap={{ base: "8px", md: "16px" }} align="start" w="full">
          <Box
            as="p"
            textStyle={{ base: "title4", md: "title3" }}
            color="white"
          >
            Sponsors
          </Box>
          <HStack
            flexWrap={"wrap"}
            gap={{
              base: "12px",
              md: "12px",
            }}
          >
             {props.sponsors?.map((sponsor) => (
              <React.Fragment key={sponsor.name}>
                <Skeleton
                  isLoaded={!props.isLoading}
                  fadeDuration={2.5}
                  opacity={props.isLoading ? "0.4" : "1"}
                  rounded="full"
                >
                  <HStack
                    rounded="full"
                    backgroundColor={"neutral.4"}
                    p={["6px", "6px", "8px"]}
                    spacing={["10px", "14px", "16px"]}
                    pe={["12px", "16px", "24px"]}
                  >
                    <Avatar
                      width={[6, 8, 10]}
                      height={[6, 8, 10]}
                      src={sponsor.logo}
                      name={sponsor.name}
                    />
                    <Box
                      as="p"
                      textStyle={{ base: "title6", md: "title4" }}
                      color="neutral.11"
                    >
                      {sponsor.name}
                    </Box>
                  </HStack>
                </Skeleton>
              </React.Fragment>
            ))} 
          </HStack>
        </VStack> */}
      </VStack>
    </>
  );
};
