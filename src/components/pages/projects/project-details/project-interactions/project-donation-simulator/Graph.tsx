import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import FlipNumbers from 'react-flip-numbers';
import GraphProps from '~/types/graphProps';
import { calculateProjectMatchingFund } from '~/utils/calculateProjectMatchingFund';
import { GraphLine } from './GraphLines';

const Graph: React.FC<GraphProps> = ({
  width,
  height,
  donationAmount,
  setDonationAmount,
  maximumDonationValue,
}) => {
  const data = useMemo(
    () =>
      calculateProjectMatchingFund(
        maximumDonationValue, // maxDonation
        1, // step
        [1, 3, 4, 5], // projectContributions
        [{ funding: [1, 2, 3, 4, 5, 6] }, { funding: [2, 1, 1, 6, 7] }], // grants
        1000 // availableMatch
      ),
    []
  );
  const bonkData = useMemo(
    () =>
      calculateProjectMatchingFund(
        maximumDonationValue, // maxDonation
        1, // step
        [1, 3, 4, 5], // projectContributions
        [{ funding: [1, 2, 3, 4, 5, 6] }, { funding: [2, 1, 1, 6, 7] }], // grants
        500 // availableMatch
      ),
    []
  );

  console.log('data -', data);
  return (
    <VStack width={'100%'} gap="0">
      <Box as="svg" viewBox={`0 0 ${width} ${height}`} width="100%">
        <GraphLine
          width={width}
          height={height}
          data={data}
          donationAmount={donationAmount}
        />
        {/* <BonkLine
          width={width}
          height={height}
          data={bonkData}
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
        onChange={(value) => {
          setDonationAmount(value);
        }}
        w={'94%'}
        mt="-5px !important"
        mx={10}
        py="0"
        value={donationAmount} // Add this line to sync the Slider with the donationAmount
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
