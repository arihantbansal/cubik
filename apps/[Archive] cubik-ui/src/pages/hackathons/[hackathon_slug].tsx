import { Center, Container, VStack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import HackathonDetails from "~/components/pages/hackathons/hackathonDetails/HackathonDetails";
import HackathonStatus from "~/components/pages/hackathons/HackathonStatus";
import SEO from "~/components/SEO";
import {
  HackathonHost,
  HackathonSchedule,
  HackathonSocial,
  HackathonTracks,
} from "~/types/hackathon";
import { trpc } from "~/utils/trpc";

const HackathonDetail = (props: { slug: string; share: boolean }) => {
  const { data, isLoading } = trpc.hackathon.get.useQuery(
    {
      slug: props.slug,
    },
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      <SEO
        title={data?.name || "Hackathon"}
        description={data?.short_description || "Quadratically Voted Hackathon"}
        image={
          props.share
            ? "https://res.cloudinary.com/demonicirfan/image/upload/v1688145530/OG-Grant_11_mchdyq.png"
            : data?.background ||
              "https://res.cloudinary.com/demonicirfan/image/upload/v1688128772/OG-Grant_10_jlqdjx.png"
        }
      />
      <Container p={"0"} maxW={"full"}>
        <VStack>
          <Skeleton
            isLoaded={!isLoading}
            opacity={isLoading ? "0.1" : "1"}
            fadeDuration={2}
          >
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
                src={data?.background as string}
                alt={data?.name as string}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </Center>
          </Skeleton>
          <HackathonDetails
            team={data?.team ?? []}
            id={(data?.id as string) ?? ""}
            isLoading={isLoading}
            logo={data?.logo}
            name={data?.name}
            short_description={data?.short_description}
            background={data?.background}
            description={data?.description}
            host={data?.host as unknown as HackathonHost[]}
            prize_pool={data?.prize_pool}
            timeline={data?.timeline as unknown as HackathonSchedule}
            social={data?.social as unknown as HackathonSocial[]}
            tracks={data?.track as unknown as HackathonTracks[]}
          />
        </VStack>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const hackathon_slug = context.params?.hackathon_slug;
  const hasShare = context.query.share;

  return {
    props: {
      slug: hackathon_slug,
      share: hasShare ?? false,
    },
  };
};

export default HackathonDetail;
