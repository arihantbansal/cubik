import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import FlipNumbers from 'react-flip-numbers';
import GraphProps from '~/types/graphProps';
import { trpc } from '~/utils/trpc';
import { GraphLine } from './GraphLines';
import { useState, useEffect } from 'react';
import { calculateProjectMatchingFund } from '~/utils/calculateProjectMatchingFund';

const Graph: React.FC<GraphProps> = ({
  width,
  height,
  donationAmount,
  setValue,
  maximumDonationValue,
  projectId,
}) => {
  const router = useRouter();
  const [data, setData] = (useState<
    { donation: number; additionalMatch: number }[] | []
  > = []);
  const { data: graphData } = trpc.project.projectGraph.useQuery({
    id: router.query.projectId as string,
  });

  const { data: contributionMutationData } =
    trpc.contribution.create.useMutation();

  const exponent = 2;

  const handleSliderChange = (value: number) => {
    // setValue(Math.round(value));
  };

  useEffect(() => {
    if (graphData)
      setData(
        calculateProjectMatchingFund(
          projectId,
          10000,
          1,
          graphData.round,
          graphData.contributions,
          graphData.matchingFunds,
          graphData.rounds,
          graphData.teams
        )
      );
  }, [graphData]);

  console.log('graphData', graphData);
  return (
    <VStack flex="1" p="1rem" width={'100%'} gap="0">
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
        max={Math.pow(maximumDonationValue, 1 / exponent)}
        step={1}
        onChange={(value) => handleSliderChange(value)}
        w={'94%'}
        mt="-5px !important"
        transform={'translateX(18px)'}
        py="0"
        value={Math.round(Math.pow(donationAmount, 1 / exponent))}
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
          boxShadow={'xl'}
          bg="transparent"
          color="white"
          fontWeight={'700'}
          placement="bottom"
          label={
            <FlipNumbers
              height={16}
              width={12}
              color="white"
              //background="black"
              play
              perspective={300}
              numbers={'$' + String(donationAmount)}
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
