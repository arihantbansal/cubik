import { Center } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

const TwitterLogo = ({ size }: { size: string }) => {
  return (
    <Center width={size} height={size}>
      <Image
        src="https://res.cloudinary.com/demonicirfan/image/upload/v1686034986/Twitter_Badge_opfk1x.png"
        alt="Twitter Logo"
        width={"300"}
        height={"300"}
      />
    </Center>
  );
};

export default TwitterLogo;
