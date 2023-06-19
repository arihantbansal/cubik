import { Box, HStack, Skeleton } from '@chakra-ui/react';
import { MdVerified } from 'react-icons/md';
import useCheckVerifiedProfile from '~/hooks/useCheckVerifiedProfile';
import { UserProof } from '~/types/user';

type size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined | null;

type usernameProps = {
  isLoading: boolean;
  username: string | null | undefined;
  proofs?: UserProof[] | null | undefined;
  size: size;
};

const Username = ({ isLoading, username, proofs, size }: usernameProps) => {
  const CheckMark = ({ size }: { size?: size }) => {
    if (proofs?.length === 0) return <></>;
    else if (proofs?.length === 1) {
      return <></>;
    } else if (proofs?.length === 2) {
      return (
        <Box
          as={MdVerified}
          transform="translateY(0px)"
          color="surface.yellow.1"
          boxSize={
            size === 'xs'
              ? { base: '8px', sm: '9px', md: '15px' }
              : size === 'sm'
              ? { base: '10px', sm: '11px', md: '15px' }
              : size === 'md'
              ? { base: '12px', sm: '13px', md: '18px' }
              : size === 'lg'
              ? { base: '14px', sm: '15px', md: '20px' }
              : { base: '12px', sm: '13px', md: '18px' }
          }
        />
      );
    }
    return <></>;
  };

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
        fadeDuration={3}
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
        fadeDuration={4}
        w={isLoading ? '1rem' : 'fit-content'}
        opacity={isLoading ? '0.6' : '1'}
        isLoaded={!isLoading}
      >
        <CheckMark size={size} />
      </Skeleton>
    </HStack>
  );
};

export default Username;
