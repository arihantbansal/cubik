import LandingPage from "@/app/components/landing-page/landingPage";
import type { Metadata } from 'next'
// import { createAdmin } from "@/utils/contract";
// import { connection } from "@/utils/contract/sdk";
// import { Button } from "@chakra-ui/react";
// import { web3 } from "@coral-xyz/anchor";
// import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
// import { useAnchorWallet } from "@solana/wallet-adapter-react";


export const metadata: Metadata = {
  title: 'Cubik',
  description: '.Fund Public Goods Through Community Voting On Solana',
  openGraph:{
    images:['https://res.cloudinary.com/demonicirfan/image/upload/v1684179451/cubik%20og.png']
  }
}


export default function Home() {
  return (
    <>
      {/* <Button
        mt={"10rem"}
        onClick={async () => {
          const ix = await createAdmin(anchorWallet as NodeWallet);
          const tx = new web3.Transaction();
          tx.add(ix);
          const { blockhash } = await connection.getLatestBlockhash();
          tx.recentBlockhash = blockhash;
          tx.feePayer = anchorWallet?.publicKey;
          const signTx = await anchorWallet?.signTransaction(tx);
          if (!signTx) return;
          const serialized_transaction = signTx.serialize();
          const sig = await connection.sendRawTransaction(
            serialized_transaction
          );
          console.log(sig);
        }}
      >
        Admin
      </Button> */}
      <LandingPage />
    </>
  );
}
