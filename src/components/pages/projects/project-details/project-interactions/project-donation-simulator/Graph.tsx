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
import { useMemo } from 'react';
import FlipNumbers from 'react-flip-numbers';
import GraphProps from '~/types/graphProps';
import { calculateProjectMatchingFund } from '~/utils/calculateProjectMatchingFund';
import { trpc } from '~/utils/trpc';
import { GraphLine } from './GraphLines';

const Graph: React.FC<GraphProps> = ({
  width,
  height,
  donationAmount,
  setDonationAmount,
  maximumDonationValue,
}) => {
  const router = useRouter();
  const a = trpc.project.projectGraph.useQuery({
    id: router.query.projectId as string,
  });

  console.log(a.data?.round, 's');

  const contributionMutation = trpc.contribution.create.useMutation();
  const data = useMemo(
    () =>
      calculateProjectMatchingFund(
        maximumDonationValue, // maxDonation
        1, // step
        [1, 1, 10], // projectContributions
        [
          { funding: [10, 10, 1] },
          { funding: [10, 10, 1] },
          //{ funding: [4, 100, 1, 1, 1, 1, 6] },
          //{ funding: [2, 1, 1, 6, 7] },
        ], // grants
        40000 // availableMatch
      ),
    []
  );
  const bonkData = useMemo(
    () =>
      calculateProjectMatchingFund(
        maximumDonationValue, // maxDonation
        1, // step
        [1, 1], // projectContributions
        [{ funding: [6, 7] }, { funding: [2, 1, 1, 6, 7] }], // grants
        20000 // availableMatch
      ),
    []
  );

  const exponent = 2;

  const handleSliderChange = (value: number) => {
    setDonationAmount(Math.round(Math.pow(value, exponent)));
  };

  // console.log('data -', data);
  // console.log('contribution - ', contributionMutation.data);
  return (
    <VStack flex="1" p="1rem" width={'100%'} gap="0">
      <Box
        ml="0.8rem"
        as="svg"
        viewBox={`-5 0 ${width} ${height}`}
        width="100%"
      >
        <GraphLine
          width={width}
          height={height}
          data={data}
          availableMatch={1000}
          maximumDonationValue={maximumDonationValue}
          donationAmount={donationAmount}
        />
        {/* <BonkLine
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
