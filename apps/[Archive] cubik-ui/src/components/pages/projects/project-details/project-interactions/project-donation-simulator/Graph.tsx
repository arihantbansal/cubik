import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FlipNumbers from "react-flip-numbers";
import GraphProps from "~/types/graphProps";
import { calculateProjectMatchingFund } from "~/utils/calculateProjectMatchingFund";
import { trpc } from "~/utils/trpc";
import { GraphLine } from "./GraphLines";

const Graph: React.FC<GraphProps> = ({
  width,
  height,
  donationAmount,
  maximumDonationValue,
  projectId,
}) => {
  const router = useRouter();
  const [data, setData] = useState<any>([]);
  const [value, setValue] = useState(100);
  // const { data: graphData } = trpc.project.projectGraph.useQuery({
  //   id: router.query.projectId as string,
  // });

  const { data: contributionMutationData } =
    trpc.contribution.create.useMutation();

  const handleSliderChange = (value: number) => {
    setValue(Math.round(value));
  };

  // useEffect(() => {
  // contribution: number[] | undefined;
  // round: Grant[];
  // matchingPool: number | undefined;

  //   if (graphData) {
  //     setData(
  //       calculateProjectMatchingFund(
  //         projectId,
  //         10,
  //         1,
  //         graphData.round,
  //         graphData.matchingPool as number
  //       )
  //     );
  //   }
  // }, [graphData]);

  return (
    <VStack flex="1" p="1rem" width={"100%"} gap="0">
      <Box
        ml="0.8rem"
        as="svg"
        viewBox={`-5 0 ${width} ${height}`}
        width="100%"
      >
        <GraphLine
          key={1}
          width={width}
          height={height}
          data={data}
          availableMatch={1000}
          maximumDonationValue={maximumDonationValue}
          donationAmount={donationAmount}
        />
        {/* <BonkLine
          key={2}
          width={width}
          height={height}
          data={bonkData}
          availableMatch={2000}
          donationAmount={donationAmount}
        /> */}
      </Box>
      <Slider
        variant="cubik"
        aria-label="donation-amount"
        defaultValue={donationAmount}
        min={0}
        max={maximumDonationValue}
        step={1}
        onChange={(value) => handleSliderChange(value)}
        w={"94%"}
        mt="-5px !important"
        transform={"translateX(18px)"}
        py="0"
        value={Math.round(donationAmount)}
      >
        {/* <SliderMark
          fontSize={'sm'}
          bg="transparent"
          value={maximumDonationValue}
        >
          ${formatNumberWithK(maximumDonationValue)}
        </SliderMark>
        <SliderMark fontSize={'sm'} bg="transparent" value={0}>
          ${0}
        </SliderMark> */}
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
        <Tooltip
          isOpen
          boxShadow={"xl"}
          bg="transparent"
          color="white"
          fontWeight={"700"}
          placement="bottom"
          label={
            <FlipNumbers
              height={16}
              width={12}
              color="white"
              //background="black"
              play
              perspective={300}
              numbers={"$" + String(donationAmount)}
            />
          }
        >
          <SliderThumb />
        </Tooltip>
      </Slider>
    </VStack>
  );
};

export default Graph;
