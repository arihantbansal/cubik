import { VStack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { Stat, StatLabel, StatNumber } from "@chakra-ui/stat";
import { formatNumberWithK } from "~/utils/formatWithK";

export const OverviewStatsCard = ({
  height,
  children,
  title,
  value,
  isLoading,
}: {
  height?: string;
  title: string;
  value: number;
  isLoading?: boolean;
  children?: JSX.Element;
}) => {
  return (
    <Stat
      variant="cubik"
      w={"full"}
      maxW={{ base: "88vw", sm: "90vw" }}
      minW="12rem"
      overflow="hidden"
      h={height ? height : "auto"}
      justifyContent={"space-between"}
    >
      <VStack p="24px" mb="12px" align="start" h="full">
        <Skeleton isLoaded={!isLoading} fadeDuration={0.5}>
          <StatLabel
            whiteSpace={"nowrap"}
            overflow="hidden"
            textStyle={{ base: "title6", md: "title5" }}
            color="neutral8"
          >
            {title}
          </StatLabel>
        </Skeleton>
        <Skeleton isLoaded={!isLoading} fadeDuration={0.5}>
          <StatNumber>${formatNumberWithK(value)}</StatNumber>
        </Skeleton>
      </VStack>
      {children}
    </Stat>
  );
};
