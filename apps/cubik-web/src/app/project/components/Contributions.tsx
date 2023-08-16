import React from "react";

interface Props {
  id: string;
  eventId?: string;
  eventType?: "hackathon" | "round" | "preview";
}
const getContributions = async ({ id, eventId, eventType }: Props) => {
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
  }
  if (eventId && eventType === "hackathon") {
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
  return <div>Contributions {JSON.stringify(contributions)}</div>;
};
