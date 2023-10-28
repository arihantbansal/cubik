import React from 'react';
import { Stat, StatLabel, StatNumber, VStack } from '@/utils/chakra';
import { formatNumberWithK } from '@/utils/helpers/formatNumberWithK';

export const OverviewStatsCard = ({
  height,
  children,
  title,
  value,
}: {
  height?: string;
  title: string;
  value: number;
  isLoading?: boolean;
  children?: React.JSX.Element;
}) => {
  return (
    <Stat
      variant="cubik"
      w={'full'}
      maxW={{ base: '88vw', sm: '90vw' }}
      minW="12rem"
      overflow="hidden"
      h={height ? height : 'auto'}
      justifyContent={'space-between'}
    >
      <VStack p="24px" mb="12px" align="start" h="full">
        <StatLabel
          whiteSpace={'nowrap'}
          overflow="hidden"
          textStyle={{ base: 'title6', md: 'title5' }}
          color="neutral8"
        >
          {title}
        </StatLabel>
        <StatNumber>${formatNumberWithK(value)}</StatNumber>
      </VStack>
      {children}
    </Stat>
  );
};
