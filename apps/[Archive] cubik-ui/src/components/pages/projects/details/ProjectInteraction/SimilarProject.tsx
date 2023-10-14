import { Avatar } from "@chakra-ui/avatar";
import { Card } from "@chakra-ui/card";
import { Box, VStack } from "@chakra-ui/layout";
import { ProjectVerifyStatus, ProjectsModel, UserModel } from "@prisma/client";
import Link from "next/link";
import ComponentErrors from "~/components/errors/ComponentErrors";
import { trpc } from "~/utils/trpc";

const getRandomProjects = (
  arr:
    | (ProjectsModel & {
        owner: UserModel;
      })[]
    | undefined,
  n: number
):
  | (ProjectsModel & {
      owner: UserModel;
    })[]
  | undefined => {
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

export const SimilarProject = () => {
  const { data, isLoading, isError } =
    trpc.project.findSimilarProjects.useQuery({
      industry: [],
    });

  const randomProjects = getRandomProjects(data, 3);

  if (isError) {
    return <ComponentErrors />;
  }

  return (
    <VStack
      gap="16px"
      align={"start"}
      w={{ base: "auto", sm: "auto", lg: "full" }}
    >
      <Box as="p" textStyle={"title3"} color="white">
        Similar Projects
      </Box>
      <VStack align={"start"} w="full" gap="16px" color="#CBCBCB">
        {randomProjects?.map((project) => (
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
                {project.short_description}
              </Box>
            </VStack>
          </Card>
        ))}
      </VStack>
    </VStack>
  );
};
