import { VStack, HStack, Center, Box } from "@chakra-ui/layout";
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/skeleton";
import { Tooltip } from "@chakra-ui/tooltip";
import { FiInfo } from "react-icons/fi";

interface Props {
  isLoading: boolean;
  funding: number;
  contributors: number;
  communityContributions: number;
}

export const ProjectFundingData = ({
  isLoading,
  funding,
  contributors,
  communityContributions,
}: Props) => {
  return (
    <VStack gap="16px" align={"start"} w="full">
      <Box as="p" textStyle={{ base: "title4", md: "title3" }} color="white">
        Funding
      </Box>
      <Skeleton
        isLoaded={!isLoading}
        fadeDuration={2.5}
        opacity={isLoading ? 0.4 : 1}
        w="full"
      >
        <VStack
          border="1px solid"
          borderColor={"surface.green.3"}
          rounded="16px"
          backgroundColor={"surface.green.0"}
          w="full"
          p="24px 32px"
          overflow={"hidden"}
          position={"relative"}
        >
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
              filter: "blur(45px)",
            }}
          >
            <circle cx="50" cy="50" r="50" fill="#31F57930" />
          </Box>
          <HStack w="full" align={"start"}>
            <VStack align={"start"} gap="8px">
              <HStack>
                <Box as="p" textStyle={"headline4"} color={"neutral.11"}>
                  ${funding.toFixed(2)}
                </Box>
                <Tooltip label="The matching pool is in $RAIN + $USDC. The value of $RAIN is subject to change">
                  <Box as="p" textStyle={"body4"} color={"neutral.8"}>
                    <FiInfo />
                  </Box>
                </Tooltip>
              </HStack>
              <Box as="p" textStyle={"body4"} color={"neutral.8"}>
                Estimated Matching Funds
              </Box>
            </VStack>
            <Center
              position={"absolute"}
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
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
      </Skeleton>
      <Skeleton
        isLoaded={!isLoading}
        fadeDuration={2.5}
        opacity={isLoading ? 0.3 : 1}
        w="full"
      >
        <VStack
          border="1px solid"
          borderColor={"neutral.4"}
          rounded="16px"
          backgroundColor={"neutral.1"}
          w="full"
          p="24px 32px"
          overflow={"hidden"}
          position={"relative"}
        >
          <Box
            border={"1px solid red"}
            as="svg"
            position="absolute"
            top="50%"
            left="0%"
            transform="translate(-50%, -50%)"
            zIndex={0}
            width="22rem"
            height="22rem"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              filter: "blur(45px)",
            }}
          >
            <circle cx="50" cy="50" r="50" fill="#ADB8B640" />
          </Box>
          <HStack zIndex={1} w="full" align={"start"}>
            <VStack align={"start"} gap="8px">
              <Box as="p" textStyle={"headline4"} color={"neutral.11"}>
                ${communityContributions.toFixed(2)}
              </Box>
              <Box as="p" textStyle={"body4"} color={"neutral.8"}>
                Community Contributions
              </Box>
            </VStack>
            <Center position={"absolute"} right="0" bottom="0">
              <svg
                width="104"
                height="95"
                viewBox="0 0 104 95"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g style={{ mixBlendMode: "soft-light" }}>
                  <path
                    d="M29.6296 29.6296C33.5588 29.6296 37.327 28.0688 40.1053 25.2905C42.8836 22.5122 44.4444 18.7439 44.4444 14.8148C44.4444 10.8857 42.8836 7.11747 40.1053 4.33916C37.327 1.56084 33.5588 0 29.6296 0C25.7005 0 21.9323 1.56084 19.154 4.33916C16.3757 7.11747 14.8148 10.8857 14.8148 14.8148C14.8148 18.7439 16.3757 22.5122 19.154 25.2905C21.9323 28.0688 25.7005 29.6296 29.6296 29.6296ZM0 46.2963C0 43.8406 0.975526 41.4855 2.71197 39.749C4.44842 38.0126 6.80355 37.037 9.25926 37.037H32.8704C31.9497 39.398 31.4786 41.9103 31.4815 44.4444C31.4815 51.3333 34.9 57.4259 40.137 61.1111H31.4815C28.7731 61.1108 26.1164 61.8529 23.8002 63.2568C21.4841 64.6607 19.5971 66.6727 18.3444 69.0741C11.2481 67.2481 6.70741 63.6963 3.9037 59.6667C-4.76837e-07 54.0556 0 48.2444 0 47.2222V46.2963ZM85.3593 69.0741C92.4555 67.2481 96.9963 63.6963 99.8 59.6667C103.704 54.0556 103.704 48.2407 103.704 47.2222V46.2963C103.704 43.8406 102.728 41.4855 100.992 39.749C99.2553 38.0126 96.9001 37.037 94.4444 37.037H70.8333C71.7296 39.3333 72.2222 41.8296 72.2222 44.4444C72.2222 51.3333 68.8037 57.4259 63.5667 61.1111H72.2222C74.9306 61.1108 77.5873 61.8529 79.9035 63.2568C82.2196 64.6607 84.1066 66.6727 85.3593 69.0741ZM88.8889 14.8148C88.8889 18.7439 87.328 22.5122 84.5497 25.2905C81.7714 28.0688 78.0032 29.6296 74.0741 29.6296C70.1449 29.6296 66.3767 28.0688 63.5984 25.2905C60.8201 22.5122 59.2593 18.7439 59.2593 14.8148C59.2593 10.8857 60.8201 7.11747 63.5984 4.33916C66.3767 1.56084 70.1449 0 74.0741 0C78.0032 0 81.7714 1.56084 84.5497 4.33916C87.328 7.11747 88.8889 10.8857 88.8889 14.8148ZM22.2222 75.9259C22.2222 73.4702 23.1977 71.1151 24.9342 69.3786C26.6706 67.6422 29.0258 66.6667 31.4815 66.6667H72.2222C73.4382 66.6667 74.6422 66.9062 75.7656 67.3715C76.889 67.8368 77.9097 68.5188 78.7695 69.3786C79.6293 70.2384 80.3113 71.2592 80.7766 72.3826C81.242 73.5059 81.4815 74.71 81.4815 75.9259V76.8519C81.4815 77.8704 81.4815 83.6852 77.5778 89.2963C73.5037 95.1519 65.763 100 51.8518 100C37.9444 100 30.2 95.1519 26.1259 89.2963C22.2222 83.6852 22.2222 77.8741 22.2222 76.8519V75.9259ZM51.8518 59.2593C55.781 59.2593 59.5492 57.6984 62.3275 54.9201C65.1058 52.1418 66.6667 48.3736 66.6667 44.4444C66.6667 40.5153 65.1058 36.7471 62.3275 33.9688C59.5492 31.1905 55.781 29.6296 51.8518 29.6296C47.9227 29.6296 44.1545 31.1905 41.3762 33.9688C38.5979 36.7471 37.037 40.5153 37.037 44.4444C37.037 48.3736 38.5979 52.1418 41.3762 54.9201C44.1545 57.6984 47.9227 59.2593 51.8518 59.2593Z"
                    fill="#ADB8B630"
                  />
                </g>
              </svg>
            </Center>
          </HStack>
        </VStack>
      </Skeleton>
      {/* <Skeleton isLoaded={!isLoading} fadeDuration={2.5} opacity={isLoading ? 0.3 : 1} w="full">
        <VStack
          border="1px solid"
          borderColor={'surface.blue.3'}
          rounded="16px"
          backgroundColor={'surface.blue.0'}
          w="full"
          p="24px 32px"
          overflow={'hidden'}
          position={'relative'}
        >
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
            <circle cx="50" cy="50" r="50" fill="#33ADFF40" />
          </Box>
          <HStack w="full" align={'start'}>
            <VStack align={'start'} gap="8px">
              <Box as="p" textStyle={'headline4'} color={'neutral.11'}>
                {contributors}
              </Box>
              <Box as="p" textStyle={'body4'} color={'neutral.8'}>
                Contributors
              </Box>
            </VStack>
            <Center
              position={'absolute'}
              right="0"
              bottom="0"
              boxShadow="0px 4px 24px rgba(0, 0, 0, 0.16)"
            >
              <svg
                width="115"
                height="92"
                viewBox="0 0 115 92"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M92.8695 84.8883C93.3201 85.5823 93.5757 86.3856 93.6093 87.2134C93.6429 88.0411 93.4533 88.8627 93.0604 89.5912C92.6676 90.3196 92.0861 90.928 91.3774 91.352C90.6687 91.776 89.8592 91.9999 89.0343 92H4.57883C3.75395 91.9999 2.9444 91.776 2.23573 91.352C1.52706 90.928 0.945574 90.3196 0.552713 89.5912C0.159852 88.8627 -0.0297973 88.0411 0.00380092 87.2134C0.0373992 86.3856 0.292998 85.5823 0.743593 84.8883C7.18969 74.923 16.6712 67.3181 27.7735 63.2084C21.6359 59.1046 16.9762 53.126 14.4835 46.1568C11.9907 39.1875 11.7972 31.5976 13.9316 24.5093C16.066 17.4211 20.415 11.2108 26.3354 6.79698C32.2558 2.38313 39.4333 0 46.8066 0C54.1798 0 61.3574 2.38313 67.2778 6.79698C73.1982 11.2108 77.5471 17.4211 79.6815 24.5093C81.8159 31.5976 81.6224 39.1875 79.1297 46.1568C76.6369 53.126 71.9772 59.1046 65.8397 63.2084C76.9419 67.3181 86.4234 74.923 92.8695 84.8883ZM143.191 84.8021C136.744 74.8787 127.283 67.3065 116.213 63.2084C123.459 58.3064 128.572 50.8156 130.512 42.2606C132.453 33.7055 131.074 24.7294 126.658 17.1592C122.241 9.58899 115.118 3.99376 106.738 1.51239C98.3584 -0.968988 89.3522 -0.149992 81.5527 3.80267C81.2545 3.95733 80.9937 4.17595 80.789 4.44306C80.5842 4.71017 80.4404 5.01922 80.3678 5.34835C80.2951 5.67747 80.2954 6.0186 80.3686 6.3476C80.4418 6.67659 80.5862 6.9854 80.7914 7.25214C86.591 14.5179 89.9217 23.458 90.2956 32.7628C90.6696 42.0676 88.067 51.2482 82.8693 58.9598C82.5333 59.4637 82.4092 60.0806 82.5239 60.676C82.6386 61.2715 82.9829 61.7973 83.4818 62.139C90.2587 66.8894 96.0601 72.9074 100.569 79.8636C102.387 82.6603 103.13 86.026 102.658 89.3324C102.605 89.6613 102.624 89.9979 102.713 90.3188C102.802 90.6397 102.96 90.9373 103.175 91.191C103.39 91.4447 103.657 91.6485 103.958 91.7882C104.26 91.9278 104.587 92.0001 104.919 92H139.436C140.445 92.0003 141.425 91.6663 142.225 91.0499C143.025 90.4335 143.6 89.569 143.861 88.5908C144.02 87.9474 144.043 87.2776 143.928 86.6249C143.812 85.9721 143.561 85.3511 143.191 84.8021Z"
                  fill="#15154780"
                />
              </svg>
            </Center>
          </HStack>
        </VStack>
      </Skeleton> */}
    </VStack>
  );
};
