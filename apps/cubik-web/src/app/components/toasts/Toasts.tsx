import { Center, HStack, Text } from '@/utils/chakra';
import { Player } from '@lottiefiles/react-lottie-player';

export const Toast = ({
  url,
  text,
  color,
  speed,
  size,
}: {
  url: String;
  text: String;
  color: any;
  speed: number;
  size: number;
}) => {
  return (
    <HStack
      gap="0.1rem"
      padding="1rem"
      bg="white"
      m="1rem"
      rounded="6px"
      alignItems={'center'}
      justify="center"
    >
      <Player
        autoplay
        keepLastFrame
        speed={speed}
        src={url}
        style={{ height: `${size}px`, width: `${size}px` }}
      />
      <Text fontSize="sm" color={color} fontWeight={'md'}>
        {text}
      </Text>
    </HStack>
  );
};

const SuccessToast = ({ toast, message }: any) => {
  return toast({
    position: 'bottom',
    duration: 2100,

    render: () => (
      <Center>
        <HStack
          gap="0.1rem"
          padding="1rem"
          bg="white"
          m="1rem"
          maxW="fit-content"
          rounded="6px"
          alignItems={'center'}
          justify="center"
        >
          <Player
            autoplay
            keepLastFrame
            speed={0.7}
            src={'https://assets7.lottiefiles.com/packages/lf20_cyqip6dr.json'}
            style={{ height: `22px`, width: `22px` }}
          />
          <Text fontSize="sm" color={'black'} fontWeight={'500'}>
            {message}
          </Text>
        </HStack>
      </Center>
    ),
  });
};
const RemoveToast = ({ toast, message }: any) => {
  return toast({
    position: 'bottom',
    duration: 2100,

    render: () => (
      <Center>
        <HStack
          gap="0.1rem"
          padding="1rem"
          bg="white"
          m="1rem"
          maxW="fit-content"
          rounded="6px"
          alignItems={'center'}
          justify="center"
        >
          <Player
            autoplay
            keepLastFrame
            speed={0.7}
            src={'https://assets10.lottiefiles.com/packages/lf20_bga6c7jv.json'}
            style={{ height: `22px`, width: `22px` }}
          />
          <Text fontSize="sm" color={'black'} fontWeight={'500'}>
            {message}
          </Text>
        </HStack>
      </Center>
    ),
  });
};
const FailureToast = ({ toast }: any) => {
  return toast({
    position: 'bottom',
    duration: 5000,
    render: () => (
      <HStack
        gap="0.1rem"
        padding="1rem"
        bg="white"
        mx="auto"
        rounded="6px"
        width={'15rem'}
        alignItems={'center'}
        justify="center"
      >
        <Player
          autoplay
          keepLastFrame
          speed={1}
          src={'https://assets8.lottiefiles.com/packages/lf20_bmtax5uq.json'}
          style={{ height: '32px', width: '32px' }}
        />
        <Text w="fit-content" fontSize="md" color={'black'} fontWeight={'500'}>
          There was an error
        </Text>
      </HStack>
    ),
  });
};

export { SuccessToast, RemoveToast, FailureToast };
