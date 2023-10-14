import { Alert, AlertDescription, AlertIcon } from "@chakra-ui/alert";
import { Card } from "@chakra-ui/card";
import { Box, Center, HStack, VStack, Wrap } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { Tag } from "@chakra-ui/tag";
import { motion } from "framer-motion";
import { UserProof } from "~/types/user";
import { SuperteamMembers } from "~/utils/data/superteamMembers";
import { trpc } from "~/utils/trpc";
import CivicIDProof from "./proofs/CivicIDProof";
import CubikGrantee from "./proofs/CubikGrantee";
import DripProof from "./proofs/DripProof";
import GithubProof from "./proofs/github";
import GoogleProof from "./proofs/GoogleProof";
import MonkeDAOProof from "./proofs/MonkeDAOProof";
import SuperteamProof from "./proofs/SuperteamProof";

const MotionBox = motion(Box);

interface Props {
  isLoading: boolean;
  proofs: UserProof[];
  wallet: string;
}

type ColorType = {
  light: string;
  medium: string;
  semiDark?: string;
  dark: string;
};

const ProofsInfoBanner = ({
  color,
  isLoading,
  proofs,
}: {
  color: ColorType;
  isLoading: boolean;
  proofs: UserProof[];
}) => {
  if (proofs?.length < 2) {
    return (
      <Skeleton
        mt={{ base: "16px", sm: "20px", md: "24px" }}
        fadeDuration={2}
        isLoaded={!isLoading}
        opacity={isLoading ? 0.6 : 1}
        w="full"
      >
        {proofs?.length > 2 ? (
          <></>
        ) : (
          <Alert
            mt={{ base: "16px", sm: "20px", md: "24px" }}
            w="full"
            variant={"solid"}
            backgroundColor={"surface.red.3"}
            border={"2px solid"}
            borderColor={"whiteAlpha.200"}
            rounded="8px"
            status="info"
          >
            <Center h={"1.4rem"}>
              <Box
                as={AlertIcon}
                boxSize={"18px"}
                pt="3px"
                color={"sureface.red.1"}
                background={"transparent"}
              />
            </Center>
            <AlertDescription
              color={"sureface.red.1"}
              fontSize={{ base: "10px", md: "14px" }}
            >
              To start contributing on the platform you need to collect 2
              proofs. By collecting more proofs your voting power increases.
            </AlertDescription>
          </Alert>
        )}
      </Skeleton>
    );
  } else {
    return (
      <Skeleton
        mt={{ base: "16px", sm: "20px", md: "24px" }}
        fadeDuration={2}
        isLoaded={!isLoading}
        opacity={isLoading ? 0.6 : 1}
        w="full"
      >
        <Alert
          mt={{ base: "16px", sm: "20px", md: "24px" }}
          w="full"
          variant={"solid"}
          backgroundColor={color.dark}
          border={"2px solid"}
          borderColor={color.semiDark}
          rounded="8px"
          status="info"
        >
          <Center h={"1.4rem"}>
            <Box
              as={AlertIcon}
              boxSize={"18px"}
              pt="3px"
              color={color.light}
              background={"transparent"}
            />
          </Center>
          <AlertDescription
            color={color.light}
            fontSize={{ base: "10px", md: "14px" }}
          >
            To start contributing on the platform you need to collect proofs. By
            collecting more proofs your voting power increases.
          </AlertDescription>
        </Alert>
      </Skeleton>
    );
  }
};

const ProofsCollectedTag = ({
  color,
  proofs,
}: {
  color: ColorType;
  proofs: UserProof[];
}) => {
  if (proofs?.length < 2) {
    return (
      <Tag
        size={{ base: "sm", md: "sm" }}
        px="16px"
        py="6px"
        fontWeight={"700"}
        color={"surface.red.2"}
        background={"surface.red.3"}
        rounded="full"
      >
        {proofs?.length ?? 0} of 7 Collected
      </Tag>
    );
  } else if (proofs?.length === 2) {
    return (
      <Tag
        size={{ base: "sm", md: "sm" }}
        px="16px"
        py="6px"
        fontWeight={"700"}
        color={"surface.orange.1"}
        background={"surface.orange.3"}
        rounded="full"
      >
        {proofs?.length ?? 0} of 7 Collected
      </Tag>
    );
  } else {
    return (
      <Tag
        size={{ base: "sm", md: "sm" }}
        px="16px"
        py="6px"
        fontWeight={"700"}
        color={color.medium}
        background={color.dark}
        rounded="full"
      >
        {proofs?.length ?? 0} of 6 Collected
      </Tag>
    );
  }
};

const UserProofs = ({ isLoading, proofs, wallet }: Props) => {
  const color = {
    dark: "#091F12",
    semiDark: "#31F57940",
    medium: "#31F579",
    light: "#D6FFE5",
  };
  const checkProofs = trpc.user.checkProof.useQuery();

  return (
    <VStack align="start" w="full">
      <HStack gap="8px">
        <Skeleton
          isLoaded={!isLoading}
          opacity={isLoading ? "0.6" : 1}
          fadeDuration={2}
        >
          <Box
            as="p"
            textStyle={{ base: "title4", md: "title3" }}
            color="neutral.11"
          >
            Proofs
          </Box>
        </Skeleton>
        <Skeleton
          fadeDuration={2}
          isLoaded={!isLoading}
          opacity={isLoading ? 0.6 : 1}
          rounded="full"
        >
          <ProofsCollectedTag color={color} proofs={proofs} />
        </Skeleton>
      </HStack>
      <ProofsInfoBanner color={color} isLoading={isLoading} proofs={proofs} />
      <Wrap
        direction={{ base: "column", md: "row" }}
        spacing={{ base: "24px", md: "32px" }}
        pt={{ base: "16px", sm: "20px", md: "24px" }}
      >
        <Skeleton
          fadeDuration={2.5}
          isLoaded={!isLoading}
          opacity={isLoading ? 0.4 : 1}
          rounded="12px"
        >
          <MotionBox
            as={Card}
            cursor="pointer"
            w={{ base: "full", sm: "full", md: "17.8rem" }}
            height="fit-content"
            h="full"
            whileHover={{ y: -8, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <GoogleProof
              minted={
                proofs?.find((e) => e.name.toLocaleLowerCase() === "google")
                  ? true
                  : false
              }
              isLoading={isLoading}
            />
          </MotionBox>
        </Skeleton>
        {/* <Skeleton
          fadeDuration={2.5}
          isLoaded={!isLoading}
          opacity={isLoading ? 0.4 : 1}
          rounded="12px"
        >
          <MotionBox
            as={Card}
            cursor="pointer"
            w={{ base: 'full', sm: 'full', md: '17.8rem' }}
            height="fit-content"
            h="full"
            whileHover={{ y: -8, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <LamportDAOProof />
          </MotionBox>
        </Skeleton> */}
        <Skeleton
          fadeDuration={2.5}
          isLoaded={!isLoading}
          opacity={isLoading ? 0.4 : 1}
          rounded="12px"
        >
          <MotionBox
            as={Card}
            cursor="pointer"
            w={{ base: "full", sm: "full", md: "17.8rem" }}
            height="fit-content"
            h="full"
            whileHover={{ y: -8, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <SuperteamProof
              claimed={
                proofs?.find((e) => e.name === "SUPERTEAM") ? true : false
              }
              isClaimAble={
                SuperteamMembers.find((e) => e === wallet) ? true : false
              }
            />
          </MotionBox>
        </Skeleton>
        <Skeleton
          fadeDuration={2.5}
          isLoaded={!isLoading}
          opacity={isLoading ? 0.4 : 1}
          rounded="12px"
        >
          <MotionBox
            as={Card}
            cursor="pointer"
            w={{ base: "full", sm: "full", md: "17.8rem" }}
            height="fit-content"
            h="full"
            whileHover={{ y: -8, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <GithubProof
              minted={false}
              // minted={proofs?.find(e => e.name.toLocaleLowerCase() === 'github') ? true : false}
              isLoading={isLoading}
            />
          </MotionBox>
        </Skeleton>
        {/* <Skeleton
          fadeDuration={2.6}
          isLoaded={!isLoading}
          opacity={isLoading ? 0.4 : 1}
          rounded="12px"
        >
          <MotionBox
            as={Card}
            cursor="pointer"
            w={{ base: 'full', sm: 'full', md: '17.8rem' }}
            height="fit-content"
            h="full"
            whileHover={{ y: -8, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <DripProof
              claimed={proofs?.find(e => e.name.toLocaleLowerCase() === 'drips01') ? true : false}
            />
          </MotionBox>
        </Skeleton> */}
        <Skeleton
          fadeDuration={2.6}
          isLoaded={!isLoading}
          opacity={isLoading ? 0.4 : 1}
          rounded="12px"
        >
          <MotionBox
            as={Card}
            cursor="pointer"
            w={{ base: "full", sm: "full", md: "17.8rem" }}
            height="fit-content"
            h="full"
            whileHover={{ y: -8, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <CubikGrantee
              canMint={(checkProofs.data as boolean) ?? false}
              minted={
                proofs?.find(
                  (e) => e.name.toLocaleLowerCase() === "cubikgrantee"
                )
                  ? true
                  : false
              }
              isLoading={isLoading}
            />
          </MotionBox>
        </Skeleton>
        {/* <Skeleton
          fadeDuration={2.6}
          isLoaded={!isLoading}
          opacity={isLoading ? 0.4 : 1}
          rounded="12px"
        >
          <MotionBox
            as={Card}
            cursor="pointer"
            w={{ base: 'full', sm: 'full', md: '17.8rem' }}
            height="fit-content"
            h="full"
            whileHover={{ y: -8, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <DripProof />
          </MotionBox>
        </Skeleton> */}
        <Skeleton
          fadeDuration={2.6}
          isLoaded={!isLoading}
          opacity={isLoading ? 0.4 : 1}
          rounded="12px"
        >
          <MotionBox
            as={Card}
            cursor="pointer"
            w={{ base: "full", sm: "full", md: "17.8rem" }}
            height="fit-content"
            h="full"
            // whileHover={{ y: -8, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <MonkeDAOProof />
          </MotionBox>
        </Skeleton>
        <Skeleton
          fadeDuration={2}
          isLoaded={!isLoading}
          opacity={isLoading ? 0.4 : 1}
          rounded="12px"
        >
          <MotionBox
            as={Card}
            cursor="pointer"
            w={{ base: "full", sm: "full", md: "17.8rem" }}
            height="fit-content"
            h="full"
            //  whileHover={{ y: -8, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <CivicIDProof />
          </MotionBox>
        </Skeleton>
      </Wrap>
    </VStack>
  );
};

export default UserProofs;
