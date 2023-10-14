import { Box, Center, HStack, VStack } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import ComponentErrors from "~/components/errors/ComponentErrors";
import { trpc } from "~/utils/trpc";
import { FundingChart } from "./Charts";

const FundingOverview = ({
  projectId,
  roundId,
  roundStartDate,
  roundEndDate,
  amountRaise,
}: {
  projectId: string;
  roundId: string;
  roundStartDate: Date;
  roundEndDate: Date;
  amountRaise: number;
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

  const totalCommunityDonation = data?.reduce(
    (acc, curr) => acc + curr.usdTotal,
    0
  );

  return (
    <VStack
      flex={"50%"}
      align={"start"}
      width="full"
      gap={{ base: "16px", sm: "20px", md: "24px" }}
    >
      <Box
        as="p"
        textStyle={{ base: "title3", md: "title2" }}
        color={"neutral.11"}
      >
        Funding Overview
      </Box>
      <VStack align={"start"} w="full">
        <HStack>
          <Box
            as="p"
            textStyle={{ base: "body5", md: "body4" }}
            color={"neutral.8"}
          >
            Total Amount Raised
          </Box>
        </HStack>
        <Box
          as="p"
          textStyle={{ base: "title4", md: "title3" }}
          color="neutral.11"
        >
          $
          {parseInt(
            (amountRaise + totalCommunityDonation).toFixed(2)
          ).toLocaleString()}
        </Box>
      </VStack>
      <Center
        gap={{ base: "16px", sm: "20px", md: "24px" }}
        w={"full"}
        flexDir={{ base: "column", md: "row" }}
      >
        <VStack align={"start"} flex="50%" w="full">
          <Box
            as="p"
            textStyle={{ base: "body5", md: "body4" }}
            color={"neutral.8"}
          >
            Community Donation
          </Box>
          <Box
            as="p"
            textStyle={{ base: "title4", md: "title3" }}
            color="neutral.11"
          >
            ${totalCommunityDonation.toFixed(2)}
          </Box>
        </VStack>
        <VStack align={"start"} flex="50%" w="full">
          <Box
            as="p"
            textStyle={{ base: "body5", md: "body4" }}
            color={"neutral.8"}
          >
            Estimated Match
          </Box>
          <Box
            as="p"
            textStyle={{ base: "title4", md: "title3" }}
            color="neutral.11"
          >
            ${parseInt(amountRaise.toFixed(2)).toLocaleString()}
          </Box>
        </VStack>
      </Center>
      <FundingChart
        data={data}
        startDate={roundStartDate}
        endDate={roundEndDate}
      />
    </VStack>
  );
};

export default FundingOverview;
