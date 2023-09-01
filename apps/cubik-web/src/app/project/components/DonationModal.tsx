import {
  Box,
  Center,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@/utils/chakra";
import type { Dispatch, SetStateAction } from "react";
import React from "react";
import { PaymentModalBody } from "./PaymentModalBody";

interface Props {
  onClose: () => void;
  isOpen: boolean;
  donationSuccessful: boolean;
  setDonationSuccessful: Dispatch<SetStateAction<boolean>>;
  event: "hackathon" | "round" | "preview";
  eventId: string;
  projectName: string;
  projectLink: string;
  logo: string;
  ownerPublicKey: string;
  userCount: number;
  projectId: string;
  multiSig: string;
}
export const DonationModal = ({
  isOpen,
  onClose,
  setDonationSuccessful,
  donationSuccessful,
  event,
  eventId,
  projectName,
  logo,
  ownerPublicKey,
  projectLink,
  userCount,
  projectId,
  multiSig,
}: Props) => {
  return (
    <Modal
      variant={"cubik"}
      size="4xl"
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setDonationSuccessful(false);
      }}
    >
      <ModalOverlay />
      {donationSuccessful ? (
        <ModalContent
          width="fit-content"
          padding="40px"
          overflow="hidden"
          position={"relative"}
          _before={{
            content: '""',
            position: "absolute",
            top: "-10%",
            left: "50%",
            transform: "translateX(-50%)",
            rounded: "50%",
            filter: "blur(80px)",
            width: "6rem",
            height: "6rem",
            background: "linear-gradient(180deg, #A8F0E6 0%, #A8F0E6 100%)",
            borderRadius: "8px 8px 0px 0px",
            zIndex: "-1",
          }}
        >
          <VStack gap="18px">
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
                    fill="url(#paint0_linear_849_10088)"
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
                    d="M83.9942 48.6283C83.6472 68.5074 67.2507 84.3414 47.3715 83.9944C27.4924 83.6474 11.6584 67.2509 12.0054 47.3717C12.3524 27.4926 28.7489 11.6586 48.6281 12.0056C68.5073 12.3526 84.3412 28.7491 83.9942 48.6283Z"
                    fill="#007A6A"
                  />
                  <path
                    d="M83.9942 48.6283C83.6472 68.5074 67.2507 84.3414 47.3715 83.9944C27.4924 83.6474 11.6584 67.2509 12.0054 47.3717C12.3524 27.4926 28.7489 11.6586 48.6281 12.0056C68.5073 12.3526 84.3412 28.7491 83.9942 48.6283Z"
                    fill="url(#paint1_linear_849_10088)"
                  />
                  <path
                    d="M83.8942 48.6265C83.5482 68.4505 67.1972 84.2404 47.3733 83.8944C27.5493 83.5484 11.7594 67.1974 12.1054 47.3735C12.4514 27.5495 28.8024 11.7596 48.6264 12.1056C68.4503 12.4516 84.2403 28.8026 83.8942 48.6265Z"
                    stroke="white"
                    strokeOpacity="0.18"
                    strokeWidth="0.2"
                  />
                </g>
                <rect
                  x="25.0001"
                  y="25"
                  width="46"
                  height="46"
                  rx="23"
                  fill="url(#paint2_linear_849_10088)"
                />
                <g clipPath="url(#clip0_849_10088)">
                  <path
                    d="M55.8593 44.3091L55.8594 44.309C56.3557 43.8128 56.3557 43.0195 55.8594 42.5233C55.3632 42.027 54.5699 42.027 54.0737 42.5233L45.2499 51.3471L42.2927 48.3899C41.7965 47.8937 41.0032 47.8937 40.507 48.3899C40.0108 48.8862 40.0108 49.6794 40.507 50.1757L44.3478 54.0165C44.844 54.5127 45.6464 54.5128 46.1426 54.0166C46.1427 54.0166 46.1427 54.0166 46.1427 54.0165L55.8593 44.3091Z"
                    fill="#14665B"
                  />
                  <path
                    d="M55.8593 44.3091L55.8594 44.309C56.3557 43.8128 56.3557 43.0195 55.8594 42.5233C55.3632 42.027 54.5699 42.027 54.0737 42.5233L45.2499 51.3471L42.2927 48.3899C41.7965 47.8937 41.0032 47.8937 40.507 48.3899C40.0108 48.8862 40.0108 49.6794 40.507 50.1757L44.3478 54.0165C44.844 54.5127 45.6464 54.5128 46.1426 54.0166C46.1427 54.0166 46.1427 54.0166 46.1427 54.0165L55.8593 44.3091Z"
                    fill="url(#paint3_linear_849_10088)"
                    fillOpacity="0.48"
                  />
                  <path
                    d="M55.8593 44.3091L55.8594 44.309C56.3557 43.8128 56.3557 43.0195 55.8594 42.5233C55.3632 42.027 54.5699 42.027 54.0737 42.5233L45.2499 51.3471L42.2927 48.3899C41.7965 47.8937 41.0032 47.8937 40.507 48.3899C40.0108 48.8862 40.0108 49.6794 40.507 50.1757L44.3478 54.0165C44.844 54.5127 45.6464 54.5128 46.1426 54.0166C46.1427 54.0166 46.1427 54.0166 46.1427 54.0165L55.8593 44.3091Z"
                    stroke="#14665B"
                    strokeWidth="0.710526"
                  />
                  <path
                    d="M55.8593 44.3091L55.8594 44.309C56.3557 43.8128 56.3557 43.0195 55.8594 42.5233C55.3632 42.027 54.5699 42.027 54.0737 42.5233L45.2499 51.3471L42.2927 48.3899C41.7965 47.8937 41.0032 47.8937 40.507 48.3899C40.0108 48.8862 40.0108 49.6794 40.507 50.1757L44.3478 54.0165C44.844 54.5127 45.6464 54.5128 46.1426 54.0166C46.1427 54.0166 46.1427 54.0166 46.1427 54.0165L55.8593 44.3091Z"
                    stroke="url(#paint4_linear_849_10088)"
                    strokeOpacity="0.48"
                    strokeWidth="0.710526"
                  />
                </g>
                <rect
                  x="25.0001"
                  y="25"
                  width="46"
                  height="46"
                  rx="23"
                  stroke="#001F1B"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_849_10088"
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
                    id="paint1_linear_849_10088"
                    x1="47.9998"
                    y1="12"
                    x2="47.9998"
                    y2="84"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopOpacity="0" />
                    <stop offset="1" />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_849_10088"
                    x1="25.0001"
                    y1="25"
                    x2="71.0001"
                    y2="71"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#B3FFF5" />
                    <stop offset="1" stopColor="#5ACCBD" />
                  </linearGradient>
                  <linearGradient
                    id="paint3_linear_849_10088"
                    x1="48.1832"
                    y1="42.5063"
                    x2="48.1832"
                    y2="54.0334"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopOpacity="0" />
                    <stop offset="1" />
                  </linearGradient>
                  <linearGradient
                    id="paint4_linear_849_10088"
                    x1="48.1832"
                    y1="42.5063"
                    x2="48.1832"
                    y2="54.0334"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopOpacity="0" />
                    <stop offset="1" />
                  </linearGradient>
                  <clipPath id="clip0_849_10088">
                    <rect
                      width="22"
                      height="22"
                      fill="white"
                      transform="translate(37.0001 37)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </Center>
            <Box
              maxW="22rem"
              textAlign={"center"}
              as="p"
              textStyle={{ base: "title4", md: "title3" }}
              color="white"
            >
              Congratulations, your donation has been successfully processed!
            </Box>
            <VStack
              backgroundColor="#0C0D0D"
              rounded={"24px"}
              gap={"16px"}
              maxW="22rem"
              p="24px"
              alignItems={"start"}
            >
              <VStack spacing="12px" align="start">
                <Box as="p" textStyle={"title4"} color="white">
                  Spread the word!
                </Box>
                <Box as="p" textStyle={"body5"} color="neutral.8">
                  Share your contribution with others and inspire more support
                  for this project.
                </Box>
              </VStack>
              <HStack
                rounded="12px"
                border="1px solid"
                w="full"
                textAlign={"center"}
                align="center"
                justify={"center"}
                gap="8px"
                color="#1D9BF0"
                backgroundColor="#1D9BF016"
                borderColor="transparent"
                _hover={{
                  borderColor: "#1D9BF0",
                }}
                p="12px"
                as="a"
                href="https://twitter.com/intent/tweet?text=I%27ve%20just%20contributed%20to%20the%20OPOS%20on%20%40_cubik%20%0ALet%27s%20shape%20the%20future%20of%20Solana%20together%20and%20drive%20growth%20in%20the%20Solana%20ecosystem.%20Check%20it%20out%20here%20-%20https%3A%2F%2Fcubik.so%2Fprojects%20%0A%40LamportDAO"
                target="_blank"
              >
                {/* <BsTwitter size={20} color="#1D9BF0" /> */}
                <Box as="p" fontStyle={"body6"}>
                  Share on Twitter
                </Box>
              </HStack>
            </VStack>
          </VStack>
        </ModalContent>
      ) : (
        <ModalContent width="fit-content" paddingTop="0 !important">
          <ModalHeader
            bg="black"
            h="full"
            pt="24px !important"
            pb="24px !important"
            roundedTop={"24px"}
          >
            Donate to {projectName}
          </ModalHeader>
          <ModalCloseButton top="24px" />
          <ModalBody>
            {projectName && (
              <PaymentModalBody
                multiSig={multiSig}
                projectId={projectId}
                logo={logo}
                name={projectName}
                ownerPublicKey={ownerPublicKey}
                projectLink={projectLink}
                setDonationSuccessful={setDonationSuccessful}
                userCount={userCount}
                event={event}
                eventId={eventId}
              />
            )}
          </ModalBody>
        </ModalContent>
      )}
    </Modal>
  );
};
