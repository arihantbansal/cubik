import { Center } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

const GoogleLogo = ({ size }: { size: string }) => {
  return (
    <Center width={size} height={size}>
      <Image
        src="https://res.cloudinary.com/demonicirfan/image/upload/v1686469723/google_proof_tlsuyi.png"
        alt="Twitter Logo"
        width={"300"}
        height={"300"}
      />
    </Center>
  );
};

export default GoogleLogo;
