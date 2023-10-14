import { Box, Center, HStack, Skeleton } from "@chakra-ui/react";
import { Player } from "@lottiefiles/react-lottie-player";
import Link from "next/link";
import { CgShapeHexagon } from "react-icons/cg";
import { CountdownTimer } from "~/components/pages/projects/project-explorer/header/FundingRoundBanner";
import moment from "moment";

export const RoundEndedBanner = ({
  endDate,
  isLoading,
  isHackathon = false,
}: {
  endDate: Date;
  isHackathon?: boolean;
  isLoading: boolean;
}) => {
  return (
    <Skeleton
      opacity={isLoading ? "0.5" : 1}
      fadeDuration={2}
      isLoaded={!isLoading}
      w="full"
    >
      <HStack p="16px" rounded="12px" gap="12px" bg="#33000260">
        <Center p="8px" bg="#330002" rounded="full">
          <Center>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.17504 0.00189399C7.01107 -0.0234371 5.85561 0.205589 4.78931 0.672984C3.72301 1.14038 2.77157 1.83488 2.00142 2.70799C1.23128 3.58111 0.660983 4.61179 0.330353 5.7281C-0.000276148 6.84441 -0.0832716 8.01942 0.0871616 9.17112C0.257595 10.3228 0.677349 11.4234 1.31712 12.3961C1.95689 13.3688 2.80126 14.1902 3.79127 14.8028C4.78128 15.4155 5.89309 15.8046 7.04905 15.9432C8.20502 16.0817 9.3773 15.9663 10.484 15.6049C10.6731 15.5431 10.8299 15.4087 10.92 15.2313C11.01 15.0539 11.0258 14.848 10.964 14.6589C10.9022 14.4698 10.7679 14.313 10.5904 14.223C10.413 14.133 10.2071 14.1171 10.018 14.1789C8.81534 14.5716 7.52418 14.6048 6.3029 14.2744C5.08162 13.944 3.98331 13.2643 3.14268 12.3188C2.30204 11.3733 1.75562 10.2029 1.57043 8.95139C1.38524 7.69983 1.56933 6.42143 2.10012 5.27297C2.63092 4.12451 3.48534 3.15592 4.5586 2.48599C5.63187 1.81606 6.87731 1.47391 8.1422 1.50151C9.40709 1.5291 10.6364 1.92524 11.6794 2.64134C12.7225 3.35745 13.5338 4.36238 14.014 5.53289C14.0895 5.71695 14.235 5.8635 14.4185 5.9403C14.5093 5.97832 14.6068 5.99808 14.7053 5.99844C14.8038 5.9988 14.9014 5.97976 14.9925 5.94239C15.0837 5.90503 15.1666 5.85009 15.2365 5.78069C15.3064 5.7113 15.3619 5.62882 15.3999 5.53795C15.438 5.44709 15.4577 5.34963 15.4581 5.25113C15.4584 5.15264 15.4394 5.05503 15.402 4.96389C14.8111 3.52319 13.8125 2.28627 12.5287 1.40486C11.245 0.523449 9.73188 0.0358595 8.17504 0.00189399ZM8.75004 3.74989C8.75004 3.55098 8.67102 3.36022 8.53037 3.21956C8.38972 3.07891 8.19895 2.99989 8.00004 2.99989C7.80113 2.99989 7.61036 3.07891 7.46971 3.21956C7.32906 3.36022 7.25004 3.55098 7.25004 3.74989V7.68989L5.21604 9.72289C5.14235 9.79156 5.08325 9.87436 5.04226 9.96636C5.00126 10.0584 4.97922 10.1577 4.97745 10.2584C4.97567 10.3591 4.99419 10.4591 5.03192 10.5525C5.06964 10.6459 5.12578 10.7307 5.197 10.8019C5.26822 10.8732 5.35305 10.9293 5.44644 10.967C5.53983 11.0047 5.63986 11.0233 5.74056 11.0215C5.84126 11.0197 5.94058 10.9977 6.03258 10.9567C6.12457 10.9157 6.20738 10.8566 6.27604 10.7829L8.53004 8.52989L8.75004 8.30989V3.74989ZM15 14.9999C15 15.2651 14.8947 15.5195 14.7071 15.707C14.5196 15.8945 14.2653 15.9999 14 15.9999C13.7348 15.9999 13.4805 15.8945 13.2929 15.707C13.1054 15.5195 13 15.2651 13 14.9999C13 14.7347 13.1054 14.4803 13.2929 14.2928C13.4805 14.1053 13.7348 13.9999 14 13.9999C14.2653 13.9999 14.5196 14.1053 14.7071 14.2928C14.8947 14.4803 15 14.7347 15 14.9999ZM14.75 8.74989C14.75 8.55098 14.671 8.36022 14.5304 8.21956C14.3897 8.07891 14.199 7.99989 14 7.99989C13.8011 7.99989 13.6104 8.07891 13.4697 8.21956C13.3291 8.36022 13.25 8.55098 13.25 8.74989V12.2499C13.25 12.4488 13.3291 12.6396 13.4697 12.7802C13.6104 12.9209 13.8011 12.9999 14 12.9999C14.199 12.9999 14.3897 12.9209 14.5304 12.7802C14.671 12.6396 14.75 12.4488 14.75 12.2499V8.74989Z"
                fill="#FF333D"
              />
            </svg>
          </Center>
        </Center>{" "}
        <Box as={"p"} textStyle={"body5"} color="white" textAlign={"start"}>
          Current {isHackathon ? "hackathon" : "Round"} has ended! Stay tuned
          till the next {isHackathon ? "hackathon" : "Round"} starts.{" "}
          <Link
            href="https://twitter.com/_cubik"
            target="_blank"
            style={{ textDecoration: "underline" }}
          >
            Learn more
          </Link>
        </Box>
      </HStack>
    </Skeleton>
  );
};
export const ProofsValidation = ({
  username,
  isLoading,
  isHackathon = false,
}: {
  username: string;
  isLoading: boolean;
  isHackathon?: boolean;
}) => {
  return (
    <Skeleton
      opacity={isLoading ? "0.5" : 1}
      fadeDuration={2}
      isLoaded={!isLoading}
      w="full"
    >
      <HStack p="16px" rounded="12px" gap="12px" bg="#2D2A14">
        <Center p="8px" bg="#FFD83D20" rounded="full">
          <Center>
            <Box as={CgShapeHexagon} boxSize={"20px"} color="#FFD83D" />
          </Center>
        </Center>{" "}
        <Box as={"p"} textStyle={"body5"} color="#FEF08A" textAlign={"start"}>
          At least two proofs are need to contribute to a project in this
          hackathon
          <Link href={`/${username}`}>
            <Box style={{ textDecoration: "underline" }}>collect Proofs</Box>
          </Link>
        </Box>
      </HStack>
    </Skeleton>
  );
};
export const RoundStartingSoon = ({
  startDate,
  isLoading,
  isHackathon = false,
}: {
  startDate: Date;
  isLoading: boolean;
  isHackathon?: boolean;
}) => {
  return (
    <Skeleton
      opacity={isLoading ? "0.5" : 1}
      fadeDuration={2}
      isLoaded={!isLoading}
      w="full"
    >
      <HStack p="16px" rounded="12px" gap="12px" bg="#31F57910">
        <Center p="8px" bg="#071A0F" rounded="full">
          <Player
            autoplay
            loop={true}
            src={"https://assets7.lottiefiles.com/packages/lf20_4htoEB.json"}
            style={{ height: `24px`, width: `24px` }}
          />
        </Center>
        <Box as={"p"} textStyle={"body5"} color="white" textAlign={"start"}>
          You can donate to the project once{" "}
          {isHackathon ? "voting" : "grant round"} starts -{" "}
          <Box as="span" display={"inline-block"}>
            {CountdownTimer({ date: new Date(startDate) })}
          </Box>{" "}
          to go
        </Box>
      </HStack>
    </Skeleton>
  );
};
export const HackathonEndSoon = ({
  endingDate,
  isLoading,
  isHackathon = false,
}: {
  endingDate: Date;
  isLoading: boolean;
  isHackathon?: boolean;
}) => {
  return (
    <Skeleton
      opacity={isLoading ? "0.5" : 1}
      fadeDuration={2}
      isLoaded={!isLoading}
      w="full"
    >
      <HStack p="16px" rounded="12px" gap="12px" bg="#31F57910">
        <Center p="8px" bg="#071A0F" rounded="full">
          <Player
            autoplay
            loop={true}
            src={"https://assets7.lottiefiles.com/packages/lf20_4htoEB.json"}
            style={{ height: `24px`, width: `24px` }}
          />
        </Center>
        <Box as={"p"} textStyle={"body5"} color="white" textAlign={"start"}>
          Submission ends in{"  "}
          <Box as="span" display={"inline-block"}>
            {CountdownTimer({ date: moment(endingDate).utc().toDate() })}
          </Box>{" "}
        </Box>
      </HStack>
    </Skeleton>
  );
};
export const HackathonVotingStartSoon = ({
  endingDate,
  isLoading,
  isHackathon = false,
}: {
  endingDate: Date;
  isLoading: boolean;
  isHackathon?: boolean;
}) => {
  return (
    <Skeleton
      opacity={isLoading ? "0.5" : 1}
      fadeDuration={2}
      isLoaded={!isLoading}
      w="full"
    >
      <HStack p="16px" rounded="12px" gap="12px" bg="#31F57910">
        <Center p="8px" bg="#071A0F" rounded="full">
          <Player
            autoplay
            loop={true}
            src={"https://assets7.lottiefiles.com/packages/lf20_4htoEB.json"}
            style={{ height: `24px`, width: `24px` }}
          />
        </Center>
        <Box as={"p"} textStyle={"body5"} color="white" textAlign={"start"}>
          Voting ending in{"  "}
          <Box as="span" display={"inline-block"}>
            {CountdownTimer({ date: moment(endingDate).utc().toDate() })}
          </Box>{" "}
        </Box>
      </HStack>
    </Skeleton>
  );
};
