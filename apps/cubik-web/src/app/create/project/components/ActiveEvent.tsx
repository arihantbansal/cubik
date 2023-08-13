import React from "react";
import { prisma } from "@cubik/database";
import { Box } from "@/utils/chakra";

const fetchHackathon = async () => {
  try {
    const res = await prisma.hackathon.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        shortDescription: true,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    return [];
  }
};
const fetchRounds = async () => {
  try {
    const res = await prisma.round.findMany({
      where: {
        registrationEndDate: {
          gte: new Date(),
        },
      },
      select: {
        id: true,
        name: true,
        shortDescription: true,
        startTime: true,
      },
    });

    return res;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const ActiveEvent = async () => {
  const hackathon = await fetchHackathon();
  const round = await fetchRounds();

  return (
    <>
      {hackathon.length > 0 && hackathon.map((el) => <Box>{el.name}</Box>)}
      {round.length > 0 && round.map((el) => <Box>{el.name}</Box>)}
    </>
  );
};
