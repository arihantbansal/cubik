import { Box, Center, HStack, Skeleton } from '@/utils/chakra';

// import { UserProof } from "~/types/user";

type size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined | null;

type usernameProps = {
  isLoading: boolean;
  username: string | null | undefined;
  size: size;
};

export const CheckMarkIcon = ({
  checkColor,
  bgColor,
}: {
  checkColor?: string;
  bgColor?: string;
}) => (
  <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.01625 1.7966C6.58251 0.728315 7.70566 0 9 0C10.2943 0 11.4175 0.728315 11.9837 1.79659C13.1395 1.44161 14.4487 1.7208 15.364 2.63604C16.2792 3.55127 16.5584 4.86046 16.2034 6.01625C17.2717 6.58251 18 7.70566 18 9C18 10.2943 17.2717 11.4175 16.2034 11.9837C16.5584 13.1395 16.2792 14.4487 15.364 15.364C14.4487 16.2792 13.1395 16.5584 11.9837 16.2034C11.4175 17.2717 10.2943 18 9 18C7.70566 18 6.58251 17.2717 6.01625 16.2034C4.86046 16.5584 3.55127 16.2792 2.63604 15.364C1.72081 14.4487 1.44162 13.1395 1.7966 11.9838C0.728316 11.4175 0 10.2943 0 9C0 7.70566 0.728315 6.58251 1.79659 6.01625C1.44161 4.86046 1.7208 3.55128 2.63604 2.63604C3.55127 1.7208 4.86046 1.44161 6.01625 1.7966ZM13.2862 6.74152C13.3521 6.80742 13.3521 6.91427 13.2862 6.98017L7.95641 12.31C7.89051 12.3759 7.78366 12.3759 7.71776 12.31L4.77443 9.36665C4.70852 9.30075 4.70852 9.19391 4.77443 9.12801L5.72902 8.17341C5.79492 8.10751 5.90177 8.10751 5.96767 8.17341L7.71776 9.9235C7.78366 9.9894 7.89051 9.9894 7.95641 9.9235L12.093 5.78693C12.1589 5.72102 12.2657 5.72102 12.3316 5.78693L13.2862 6.74152Z"
      fill={bgColor ? bgColor : 'white'}
    />
    <path
      d="M13.2862 6.98017C13.3521 6.91427 13.3521 6.80742 13.2862 6.74152L12.3316 5.78693C12.2657 5.72102 12.1589 5.72102 12.093 5.78693L7.95641 9.9235C7.89051 9.9894 7.78366 9.9894 7.71776 9.9235L5.96767 8.17341C5.90177 8.10751 5.79492 8.10751 5.72902 8.17341L4.77443 9.12801C4.70852 9.19391 4.70852 9.30075 4.77443 9.36665L7.71776 12.31C7.78366 12.3759 7.89051 12.3759 7.95641 12.31L13.2862 6.98017Z"
      fill={checkColor ? checkColor : '#14171A'}
    />
  </svg>
);

const Username = ({ isLoading, username, size }: usernameProps) => {
  return (
    <HStack
      align="baseline"
      justify="center"
      marginInline={'0 !important'}
      margin="0 !important"
      spacing={
        size === 'xs'
          ? { base: '2px', sm: '3px', md: '4px' }
          : size === 'sm'
          ? { base: '2px', sm: '3px', md: '6px' }
          : size === 'md'
          ? { base: '4px', sm: '5px', md: '6px' }
          : size === 'lg'
          ? { base: '6px', sm: '7px', md: '8px' }
          : { base: '4px', sm: '5px', md: '6px' }
      }
    >
      <Skeleton
        fadeDuration={2}
        w={isLoading ? '10rem' : 'fit-content'}
        opacity={isLoading ? '0.6' : '1'}
        isLoaded={!isLoading}
      >
        <Box
          as="p"
          textStyle={
            size === 'xs'
              ? { base: 'title6', sm: 'title5', md: 'title4' }
              : size === 'sm'
              ? { base: 'title5', sm: 'title4', md: 'title3' }
              : size === 'md'
              ? { base: 'title4', sm: 'title3', md: 'title2' }
              : size === 'lg'
              ? { base: 'title3', sm: 'title2', md: 'title1' }
              : { base: 'title4', sm: 'title3', md: 'title2' }
          }
          //  border="1px dashed"
          borderColor={
            size === 'xs'
              ? { base: 'green', sm: 'blue', md: 'red' }
              : size === 'sm'
              ? { base: 'purple', sm: 'blue', md: 'white' }
              : size === 'md'
              ? { base: 'pink', sm: 'red', md: 'purple' }
              : size === 'lg'
              ? { base: 'pink', sm: 'white', md: 'green' }
              : { base: 'yellow', sm: 'yellow', md: 'yellow' }
          }
          color={'neutral.11'}
        >
          @{username}
        </Box>
      </Skeleton>
      <Skeleton
        fadeDuration={2.5}
        w={isLoading ? '1rem' : 'fit-content'}
        opacity={isLoading ? '0.6' : '1'}
        isLoaded={!isLoading}
      >
        <Center pl="2px">{/* <CheckMark size={size} /> */}</Center>
      </Skeleton>
    </HStack>
  );
};

export default Username;
