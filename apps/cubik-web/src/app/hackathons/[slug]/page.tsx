import { Center, Container, VStack } from "@/utils/chakra";
import Image from "next/image";
import React from "react";
import { HackathonHeader } from "../components/HackathonHeader";
import { prisma } from "@cubik/database";
import { HackathonBody } from "../components/HackathonBody";
interface Props {
  params: { slug: string };
}
const fetchHackathon = async (slug: string) => {
  const res = await prisma.hackathon.findFirst({
    where: {
      slug: slug,
    },
  });

  return res;
};
const HackathonPage = async ({ params: { slug } }: Props) => {
  const hackathon = await fetchHackathon(slug);
  return (
    <>
      <Container p={"0"} maxW={"full"}>
        <VStack>
          <Center
            alignItems={"end"}
            w="100vw"
            h={{ base: "16rem", md: "20rem", lg: "24rem" }}
            position={"relative"}
            overflow={"hidden"}
            _before={{
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: { base: "16rem", md: "20rem", lg: "24rem" },
              background:
                "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
              zIndex: 1,
            }}
          >
            <Image
              src={hackathon?.background as string}
              alt={hackathon?.name as string}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          </Center>
          <Container
            maxW="7xl"
            zIndex={"1"}
            transform={"translateY(-10rem)"}
            display="flex"
            flexDirection={"column"}
            gap="48px"
            px={{ base: "2rem", md: "3rem", xl: "1rem" }}
          >
            <HackathonHeader slug={slug} />
            <HackathonBody slug={slug} />
          </Container>
        </VStack>
      </Container>
    </>
  );
};

export default HackathonPage;
