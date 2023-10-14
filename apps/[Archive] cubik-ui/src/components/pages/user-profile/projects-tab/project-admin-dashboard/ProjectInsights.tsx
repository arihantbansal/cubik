import { Box, Center, VStack } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import ComponentErrors from "~/components/errors/ComponentErrors";
import { trpc } from "~/utils/trpc";
import { VisitorsChart } from "./Charts";

const ProjectInsights = ({
  projectId,
  roundId,
  roundStartDate,
  roundEndDate,
}: {
  projectId: string;
  roundId: string;
  roundStartDate: Date;
  roundEndDate: Date;
}) => {
  const { data, isError, isLoading, error } =
    trpc.contribution.getProjectContributors.useQuery({
      projectId,
      roundId,
    });
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <ComponentErrors error={error} />;
  }
  // calculate total no of unique contributors
  const totalNoOfUniqueContributors = () => {
    const contributors = data.map((item) => item.user.id);
    const uniqueContributors = new Set(contributors);
    // now calculate no of unique ids
    return uniqueContributors.size;
  };

  return (
    <VStack
      flex={"50%"}
      align={"start"}
      width="full"
      gap={{ base: "16px", sm: "20px", md: "24px" }}
      position={"relative"}
    >
      {/* <Box
        zIndex="8"
        h="full"
        w="full"
        position={'absolute'}
        bgGradient="linear(to-t,rgb(20, 20, 20,1), rgb(20, 20, 20,0.9))"
      >
        <Center w="full" h="full">
          <Box
            as="p"
            textStyle={{ base: 'title3', md: 'title2' }}
            color="white"
          >
            Coming Soon...
          </Box>
        </Center>{' '}
      </Box> */}
      <Box
        as="p"
        textStyle={{ base: "title3", md: "title2" }}
        color={"neutral.11"}
      >
        Project Insights
      </Box>
      <VStack align={"start"} w="full">
        <Box
          as="p"
          textStyle={{ base: "body6", md: "body5" }}
          color={"neutral.8"}
        >
          Conversion Rate
        </Box>
        <Box
          as="p"
          textStyle={{ base: "title4", md: "title3" }}
          color="neutral.11"
        >
          --
        </Box>
      </VStack>
      <Center
        gap={{ base: "16px", sm: "20px", md: "24px" }}
        w={"full"}
        flexDir={{ base: "column", md: "row" }}
      >
        <VStack align={"start"} flex="50%" w="full">
          <Box as="p" textStyle="body5" color={"neutral.8"}>
            Unique Visitors
          </Box>
          <Box
            as="p"
            textStyle={{ base: "title4", md: "title3" }}
            color="neutral.11"
          >
            --
          </Box>
        </VStack>
        <VStack align={"start"} flex="50%" w="full">
          <Box as="p" textStyle="body5" color={"neutral.8"}>
            Unique Contributors
          </Box>
          <Box
            as="p"
            textStyle={{ base: "title4", md: "title3" }}
            color="neutral.11"
          >
            {totalNoOfUniqueContributors() === 0
              ? 0
              : totalNoOfUniqueContributors()}
          </Box>
        </VStack>
      </Center>
      <VisitorsChart
        data={data}
        startDate={roundStartDate}
        endDate={roundEndDate}
      />
    </VStack>
  );
};

export default ProjectInsights;
