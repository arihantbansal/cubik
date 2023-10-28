import { Center, Avatar as ChakraAvatar } from '@/utils/chakra';

//import { BiUpArrowAlt } from "react-icons/bi";

const ProfilePicture = ({
  onOpen,
  onClose,
  isOpen,
  pfp,
}: {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
  pfp: string;
}) => {
  return (
    <Center
      cursor={'pointer'}
      w="fit-content"
      transform={{ base: 'scale(0.9)', md: 'scale(1)' }}
      position="relative"
      onClick={() => {
        if (isOpen) {
          onClose();
        } else {
          onOpen();
        }
      }}
    >
      <Center
        cursor={'pointer'}
        position={'absolute'}
        bottom="-4px"
        right="-4px"
        rounded="full"
        bg="white"
        p="0.3rem"
        pl="0.35rem"
        zIndex={'10'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="14"
          height="14"
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        >
          <path d="M6 8.83a30.23 30.23 0 0 1 5.406-5.62A.949.949 0 0 1 12 3m6 5.83a30.233 30.233 0 0 0-5.406-5.62A.949.949 0 0 0 12 3m0 0v18" />
        </svg>
      </Center>
      <ChakraAvatar src={pfp} width="84px" height="84px" borderRadius={'8px'} />
    </Center>
  );
};

export default ProfilePicture;
