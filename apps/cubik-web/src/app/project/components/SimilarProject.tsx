import { Avatar, Box, Card, Link, VStack } from "@/utils/chakra";
import { ProjectVerifyStatus, User } from "@cubik/database";
import React from "react";

interface ReturnType {
  id: string;
  name: string;
  shortDescription: string;
  logo: string;
  status: ProjectVerifyStatus;
  owner: User;
}
const getProjects = async () => {
  const res = await prisma.project.findMany({
    where: {
      isArchive: false,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      logo: true,
      status: true,
      shortDescription: true,
      owner: true,
    },
  });
  return res;
};
const getRandomProjects = (arr: ReturnType[], n: number): ReturnType[] => {
  // filter the array by verified projects
  arr = arr?.filter(
    (project) => project.status === ProjectVerifyStatus.VERIFIED
  );
  let len = arr?.length || 0;
  if (len <= n) return arr; // If array length is less than or equal to 3, return the whole array

  let result = new Array(n),
    taken = new Array(len);
  while (n--) {
    const x = Math.floor(Math.random() * len);
    result[n] = arr![x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};
export const SimilarProject = async () => {
  const projects = getRandomProjects(await getProjects(), 3);
  return (
    <>
      <VStack
        gap="16px"
        align={"start"}
        w={{ base: "auto", sm: "auto", lg: "full" }}
      >
        <Box as="p" textStyle={"title3"} color="white">
          Similar Projects
        </Box>
        <VStack align={"start"} w="full" gap="16px" color="#CBCBCB">
          {projects?.map((project) => (
            <Card
              as={Link}
              href={`/${project.owner.username}/${project.id}`}
              key={project.id}
              w="full"
              direction={"row"}
              gap="16px"
              p="16px"
              align={"start"}
            >
              <Avatar size="md" src={project.logo} />
              <VStack w="full" alignItems={"start"} textAlign="start">
                <Box as="p" textStyle={"title4"} color="white">
                  {project.name}
                </Box>
                <Box noOfLines={2} as="p" color="#B4B0B2" textStyle={"body5"}>
                  {project.shortDescription}
                </Box>
              </VStack>
            </Card>
          ))}
        </VStack>
      </VStack>
    </>
  );
};
