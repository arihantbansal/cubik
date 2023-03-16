import { Button } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { signIn, useSession } from 'next-auth/react';

const Home: NextPage = () => {
  const { data, status } = useSession();

  return (
    <>
      <Button
        onClick={async () => {
          const res = await signIn('credentials', {
            callbackUrl: '',
            redirect: false,
            wallet: 'test',
          });
          console.log(res);
        }}
      >
        sign in
      </Button>
      <Button
        onClick={async () => {
          console.log(data, status);
        }}
      >
        data
      </Button>
    </>
  );
};

export default Home;
