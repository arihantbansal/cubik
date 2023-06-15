import { Button } from '@chakra-ui/react';
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import type { NextPage } from 'next';
import LandingPage from '~/components/pages/landing-page/LandingPage';
import SEO from '~/components/SEO';
import { admin_proof, connection } from '~/utils/program/contract';
import * as anchor from '@coral-xyz/anchor';
const Home: NextPage = () => {
  const anchorWallet = useAnchorWallet();
  return (
    <>
      <SEO
        title={`Cubik`}
        description={`Fund Public Goods Through Community Voting On Solana `}
        image={`https://res.cloudinary.com/demonicirfan/image/upload/v1684179451/cubik%20og.png`}
      />

      <LandingPage />
    </>
  );
};

export default Home;
