import { useWallet } from '@solana/wallet-adapter-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

interface WithAuthProps {
  redirect?: string;
}

const withAuth = (
  WrappedComponent: FC<any>,
  { redirect = '/' }: WithAuthProps
) => {
  const WithAuthWrapper: FC = (props: any) => {
    const router = useRouter();
    const { data: session } = useSession();
    const { publicKey } = useWallet();

    useEffect(() => {
      if (!session && !publicKey) {
        router.replace(redirect);
      }
    }, [session, publicKey, redirect]);

    return <WrappedComponent {...props} />;
  };

  WithAuthWrapper.displayName = `withAuth(${getDisplayName(WrappedComponent)})`;

  return WithAuthWrapper;
};

function getDisplayName(WrappedComponent: FC): string {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withAuth;
