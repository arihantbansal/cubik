import { Center, HStack, Skeleton } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { signIn, signOut, useSession } from 'next-auth/react';
import { FC, useEffect } from 'react';
import { createMessage, verifyMessage } from '~/utils/getsignMessage';
import { WalletAddress } from '../common/wallet/WalletAdd';
import IconButtonBadge from './ListButton';
import UserNavMenu from './navbar-menu/UserNavMenu';
import * as anchor from '@coral-xyz/anchor';
import { useRouter } from 'next/router';

const NavbarCTA: FC = () => {
  const { publicKey, disconnect, connecting, connected, signMessage } =
    useWallet();
  const router = useRouter();
  const { status, data } = useSession();

  let CTA;

  useEffect(() => {
    const check = async () => {
      if (connected && signMessage && publicKey) {
        try {
          const msg = await createMessage();
          const sig = await signMessage(msg);
          console.log(publicKey);

          const final = await verifyMessage(
            anchor.utils.bytes.bs58.encode(sig),
            publicKey
          );
          console.log(final, '--client final', publicKey);

          const signInResponse = await signIn('credentials', {
            callbackUrl: '/',
            redirect: false,
            wallet: publicKey.toBase58(),
            signature: anchor.utils.bytes.bs58.encode(sig),
          });
          if (signInResponse?.status === 401) {
            console.log('now redirect to create-profile which is prefetched');
            router.push('/create-profile');
          }
        } catch (error) {
          if ((error as Error).message === 'User rejected the request.') {
            disconnect()
              .then(() => {
                signOut({
                  redirect: false,
                });
              })
              .catch((e) => {
                console.log(e);
              });
            // show a banner for reject
          } else {
            // some error
          }
        }
      }
    };
    check();
  }, [connecting]);

  switch (status) {
    case 'loading':
      CTA = (
        <Skeleton
          isLoaded
          fadeDuration={1}
          rounded={'md'}
          w="8rem"
          height="full"
          startColor="#121219"
          endColor="#37383E"
        />
      );
      break;
    case 'authenticated':
      CTA = (
        <HStack gap={{ base: '2px', md: '16px' }}>
          <>
            <IconButtonBadge />
            <UserNavMenu />
          </>
        </HStack>
      );
      break;
    default:
      CTA = publicKey ? (
        <Center as="button" onClick={disconnect}>
          <WalletAddress walletAddress={publicKey.toBase58()} />
        </Center>
      ) : (
        <Center w="10rem">
          <WalletMultiButton
            onClick={(e) => {
              console.log(e, 'dfd');
            }}
          />
        </Center>
      );
  }

  return <>{CTA}</>;
};

export default NavbarCTA;
