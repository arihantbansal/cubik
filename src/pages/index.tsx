import { Container } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import LandingPage from '~/components/pages/Home/LandingPage';
import { signIn, useSession } from "next-auth/react";
import { trpc } from "~/utils/trpc";

const Home: NextPage = () => {
  const { data, status } = useSession();

  return <LandingPage />;
};

export default Home;
