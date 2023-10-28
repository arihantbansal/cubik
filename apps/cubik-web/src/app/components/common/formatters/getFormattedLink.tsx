import { Box, HStack, Skeleton } from '@/utils/chakra';
//import { BiLink } from "react-icons/bi";
import { getDomain } from '@/utils/helpers/getDomain';

const GetFormattedLink = ({
  isLoading,
  link,
}: {
  isLoading?: boolean;
  link: string | undefined;
}) => {
  return (
    <Skeleton
      isLoaded={!isLoading}
      fadeDuration={2.5}
      opacity={isLoading ? 0.8 : 1}
      w="full"
    >
      <HStack
        w="full"
        as="button"
        align={'center'}
        justify="start"
        spacing="4px"
      >
        {/*  @todo  */}
        {/* <Box as={BiLink} boxSize={["14px", "16px", "18px"]} color={"#A8F0E6"} /> */}
        <Box
          noOfLines={1}
          textAlign="start"
          as="p"
          whiteSpace={'nowrap'}
          textStyle={{ base: 'body6', sm: 'body5', md: 'body4' }}
          color={'brand.teal5'}
          w="full"
        >
          {getDomain(link as string)}
        </Box>
      </HStack>
    </Skeleton>
  );
};

export default GetFormattedLink;
