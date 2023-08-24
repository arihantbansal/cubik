import React from "react";
import { Prisma, prisma } from "@cubik/database";
import { Button, Center } from "@/utils/chakra";
import { ContributorRow } from "./ContributionRow";
import { EmptyStateHOC } from "@/app/components/common/empty-state/EmptyStateHOC";
import Link from "next/link";
import { ContributionTable } from "./ContributionTable";
import { revalidatePath } from "next/cache";
interface Props {
  id: string;
  eventId?: string;
  eventType?: "hackathon" | "round" | "preview";
}
export type ContributionRowType = Prisma.ContributionGetPayload<{
  include: {
    user: true;
  };
}>;
const getContributions = async ({
  id,
  eventId,
  eventType,
}: Props): Promise<ContributionRowType[]> => {
  if (eventId && eventType === "preview") {
    return [];
  }
  if (eventId && eventType === "round") {
    const res = await prisma.contribution.findMany({
      where: {
        projectId: id,
        roundId: eventId,
      },
      include: {
        user: true,
      },
    });
    return res;
  } else {
    const res = await prisma.contribution.findMany({
      where: {
        projectId: id,
        hackathonId: eventId,
      },
      include: {
        user: true,
      },
    });
    return res;
  }
};

export const Contributions = async ({
  id,
  eventId,
  eventType = "preview",
}: Props) => {
  const contributions = await getContributions({ id, eventId, eventType });
  if (contributions?.length === 0) {
    return (
      <Center
        w="full"
        border="1px dashed"
        borderColor={"neutral.3"}
        rounded="12px"
      >
        <EmptyStateHOC
          heading={"No Contributions Yet"}
          subHeading={
            "This project hasn`t received any contributions yet. Be the first to support this project!"
          }
          CTA={
            <Link href="/projects">
              <Button
                variant="cubikFilled"
                size={{ base: "cubikMini", md: "cubikSmall" }}
              >
                Make a contribution
              </Button>
            </Link>
          }
        />
      </Center>
    );
  }
  return <ContributionTable contribution={contributions} />;
};
