import { Box, Container, HStack } from '@chakra-ui/layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import ProfileHeader from '~/components/pages/user-profile/ProfileHeader';
interface Props {
  profilePicture?: string | undefined;
  mainWallet?: string | undefined;
  username: string;
  id: string;
  children: React.ReactNode;
}
export const UserPageLayout = (props: Props) => {
  const router = useRouter();
  return (
    <>
      <Container
        maxW="7xl"
        w="full"
        p={{ base: '23px 20px', sm: '32px', md: '48px', lg: '48px 20px' }}
      >
        <ProfileHeader
          isLoading={false}
          mainWallet={props.mainWallet}
          profilePicture={props.profilePicture}
          username={props.username}
        />
        <HStack gap={5} my={5}>
          <Box
            borderBottom={router.asPath === `/${props.username}` ? '2px solid' : 0}
            p={2}
            fontWeight={700}
            color={router.asPath === `/${props.username}` ? 'brand.teal6' : 'neutral.7'}
            fontSize={20}
          >
            <Link href={'/' + props.username}>Details</Link>
          </Box>
          <Box
            borderBottom={router.asPath === `/${props.username}/projects` ? '2px solid' : 0}
            p={2}
            fontWeight={700}
            color={router.asPath === `/${props.username}/projects` ? 'brand.teal6' : 'neutral.7'}
            fontSize={20}
          >
            <Link href={'/' + props.username + '/projects'}>Projects</Link>
          </Box>
          <Box
            borderBottom={router.asPath === `/${props.username}/contributor` ? '2px solid' : 0}
            p={2}
            fontWeight={700}
            color={router.asPath === `/${props.username}/contributor` ? 'brand.teal6' : 'neutral.7'}
            fontSize={20}
          >
            <Link href={'/' + props.username + '/contributor'}>Contributor</Link>
          </Box>
        </HStack>
        {props.children}
      </Container>
    </>
  );
};
