import ProfilePictureAvatar from '@/app/components/common/profile-picture';
import Username from '@/app/components/common/username';
import { WalletAddress } from '@/app/components/common/wallet';
import type { NFTProfile } from '@/types/NFTProfile';
import { Center, HStack, VStack } from '@/utils/chakra';

const User = ({
  username,
  profilePicture,
  mainWallet,
  NFTProfile,
}: {
  username: string;
  profilePicture: string;
  mainWallet: string;
  NFTProfile: NFTProfile;
}) => {
  return (
    <div>
      <HStack
        w="full"
        align={'center'}
        justify="start"
        gap={{ base: '12px', sm: '14px', md: '16px' }}
      >
        <Center
          width={{ base: '56px', sm: '72px', md: '84px' }}
          height={{ base: '56px', sm: '72px', md: '84px' }}
        >
          <ProfilePictureAvatar
            NFTProfile={NFTProfile}
            asNFT={NFTProfile?.name ? true : false}
            profilePicture={profilePicture}
            username={username}
            width={{
              base: '56px',
              sm: '72px',
              md: '84px',
              lg: '84px',
              xl: '84px',
            }}
            height={{
              base: '56px',
              sm: '72px',
              md: '84px',
              lg: '84px',
              xl: '84px',
            }}
          />
        </Center>
        <VStack
          m="0"
          marginInlineStart={'0 !important'}
          p={{ base: '0px', sm: '6px', md: '8px' }}
          gap={{ base: '12px', md: '16px' }}
          justifyContent={'center'}
          align={'start'}
        >
          <HStack gap="8px">
            <Username
              username={username}
              isLoading={false}
              // proofs={(user?.proof as unknown as UserProof[]) ?? []}
              size="lg"
            />
            {/* <HStack>
            <Box as="p">Get Verified</Box>
          </HStack> */}
          </HStack>
          <Center marginInline={'0 !important'} margin="0 !important">
            {/* <Skeleton
              w="6rem"
              h="18px"
              fadeDuration={3}
              opacity={isLoading ? "0.5" : "1"}
              isLoaded={!isLoading}
            > */}
            {/* <WalletAddress
                walletAddress={user?.mainWallet || ""}
                size="sm"
                copy={true}
              /> */}

            <WalletAddress walletAddress={mainWallet} size="sm" copy={true} />

            {/* </Skeleton> */}
          </Center>
        </VStack>
      </HStack>
    </div>
  );
};

export default User;
