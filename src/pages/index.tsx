import { Button } from '@chakra-ui/react';
import type { NextPage } from 'next';
import LandingPage from '~/components/pages/landing-page/LandingPage';
import SEO from '~/components/SEO';
import { supabase } from '~/utils/supabase';

const Home: NextPage = () => {
  return (
    <>
      <SEO
        title={`Cubik`}
        description={`Fund Public Goods Through Community Voting On Solana `}
        image={`https://res.cloudinary.com/demonicirfan/image/upload/v1684179451/cubik%20og.png`}
      />

      <Button
        onClick={async () => {
          await supabase.auth.signInWithOAuth({
            provider: 'twitter',
          });
        }}
      >
        asfd
      </Button>

      {/* <LandingPage /> */}
    </>
  );
};

export default Home;
