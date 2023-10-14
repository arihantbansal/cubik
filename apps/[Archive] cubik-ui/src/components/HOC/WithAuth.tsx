import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { useUserStore } from "~/store/userStore";

interface WithAuthProps {
  redirect?: string;
}

const withAuth = (
  WrappedComponent: FC<any>,
  { redirect = "/" }: WithAuthProps
) => {
  const WithAuthWrapper: FC = (props: any) => {
    const router = useRouter();
    const { user } = useUserStore();
    const { publicKey } = useWallet();

    useEffect(() => {
      if (!user && !publicKey) {
        router.replace(redirect);
      }
    }, [user, publicKey, redirect]);

    return <WrappedComponent {...props} />;
  };

  WithAuthWrapper.displayName = `withAuth(${getDisplayName(WrappedComponent)})`;

  return WithAuthWrapper;
};

function getDisplayName(WrappedComponent: FC): string {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default withAuth;
