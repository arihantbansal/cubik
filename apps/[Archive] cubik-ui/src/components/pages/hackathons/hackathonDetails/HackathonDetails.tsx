import { Container } from "@chakra-ui/react";
import HackathonBody from "./HackathonBody";
import HackathonHeader from "./HackathonHeader";
import { JSONValue } from "superjson/dist/types";
import { Team, UserModel } from "@cubik/database";
import {
  HackathonHost,
  HackathonSchedule,
  HackathonSocial,
  HackathonTracks,
} from "~/types/hackathon";

type HackathonDetailsPropsType = {
  id: string;
  isLoading: boolean;
  logo?: string;
  name?: string;
  short_description?: string;
  background?: string;
  description?: string;
  prize_pool?: number;
  tracks: HackathonTracks[];
  host?: HackathonHost[];
  timeline?: HackathonSchedule;
  social?: HackathonSocial[];
  team: (Team & {
    user: UserModel;
  })[];
};

const HackathonDetails = (props: HackathonDetailsPropsType) => {
  return (
    <Container
      maxW="7xl"
      zIndex={"1"}
      transform={"translateY(-10rem)"}
      display="flex"
      flexDirection={"column"}
      gap="48px"
      px={{ base: "2rem", md: "3rem", xl: "1rem" }}
    >
      <HackathonHeader
        timeline={props.timeline as HackathonSchedule}
        hackathonId={props.id}
        isLoading={props.isLoading}
        logo={props.logo}
        name={props.name}
        tracks={props.tracks}
        short_description={props.short_description}
      />
      <HackathonBody
        hackathonId={props.id}
        team={props.team}
        isLoading={props.isLoading}
        description={props.description}
        host={props.host}
        prize_pool={props.prize_pool}
        timeline={props.timeline}
        tracks={props.tracks}
        social={props.social}
      />
    </Container>
  );
};

export default HackathonDetails;
