import {
  Avatar,
  Box,
  HStack,
  Skeleton,
  SkeletonText,
  Stack,
  VStack,
} from "@/utils/chakra";
import React from "react";
import { HackathonStatus } from "./HackathonStatus";
import { prisma } from "@cubik/database";
import Image from "next/image";
interface Props {
  slug: string;
}
const fetchHackathon = async (slug: string) => {
  const res = await prisma.hackathon.findFirst({
    where: {
      slug: slug,
    },
    select: {
      name: true,
      logo: true,
      shortDescription: true,
      hackathonEndDate: true,
      hackathonStartDate: true,
      votingEndDate: true,
      votingStartDate: true,
      resultDate: true,
      registrationEndDate: true,
      registrationStartDate: true,
    },
  });

  return res;
};
export const HackathonHeader = async ({ slug }: Props) => {
  const hackathon = await fetchHackathon(slug);
  return (
    <>
      <VStack w="full" gap="24px" align={"start"}>
        <Image
          alt="hackathon logo"
          loading="lazy"
          style={{
            borderRadius: "12px",
            backgroundColor: "#1C1C1C",
          }}
          width={100}
          height={100}
          src={hackathon?.logo as string}
        />
        <Stack
          gap={{ base: "16px", md: "24px", lg: "12vw" }}
          w="full"
          alignItems="end"
          direction={{ base: "column", lg: "row" }}
        >
          <VStack flex={3} alignItems="start" w="full" spacing="16px">
            <HStack>
              <Box
                as="p"
                textStyle={{ base: "title1", md: "headline3" }}
                textTransform="capitalize"
                color="neutral.11"
                noOfLines={1}
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
              >
                {hackathon?.name}
              </Box>
              <HackathonStatus
                hackathonStartDate={hackathon?.hackathonStartDate as Date}
                registrationEndDate={hackathon?.registrationEndDate as Date}
                registrationStartDate={hackathon?.registrationStartDate as Date}
                resultDate={hackathon?.resultDate as Date}
                votingEndDate={hackathon?.votingEndDate as Date}
                votingStartDate={hackathon?.votingStartDate as Date}
                hackathonEndDate={hackathon?.hackathonEndDate as Date}
                show={true}
              />
            </HStack>

            <Box
              as="p"
              textStyle={{ base: "body4", md: "body2" }}
              color="neutral.9"
              noOfLines={2}
              textOverflow="ellipsis"
            >
              {hackathon?.shortDescription}
            </Box>
          </VStack>
          <VStack w={"full"} alignItems="start" flex={1.5} spacing="16px">
            s
          </VStack>
        </Stack>
      </VStack>
    </>
  );
};
