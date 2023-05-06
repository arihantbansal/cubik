import { Button } from '@chakra-ui/react';
import type { NextPage } from 'next';
import LandingPage from '~/components/pages/landing-page/LandingPage';
import SEO from '~/components/SEO';

const Home: NextPage = () => {
  return (
    <>
      <SEO
        title={`Cubik`}
        description={`Fund Public Goods Through Community Voting On Solana `}
        image={`https://solana.ghost.io/content/images/2022/06/solana-network-upgrades.png`}
      />

      <LandingPage />
    </>
  );
};

export default Home;
