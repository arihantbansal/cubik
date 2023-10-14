import { Center } from "@chakra-ui/react";
import Image from "next/image";

const GithubLogo = ({ size }: { size: string }) => {
  return (
    <Center width={size} height={size}>
      <Image
        src="https://res.cloudinary.com/demonicirfan/image/upload/v1687295953/GITHUB_ga22dm.png"
        alt="Twitter Logo"
        width={"300"}
        height={"300"}
      />
    </Center>
  );
};

export default GithubLogo;
