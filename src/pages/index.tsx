import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import LandingPage from '~/components/pages/Home/LandingPage';

const Home: NextPage = () => {
  const { data, status } = useSession();

  return <LandingPage />;
};

export default Home;
