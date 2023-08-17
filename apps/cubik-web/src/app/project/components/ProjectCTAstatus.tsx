// /import { Button } from "@chakra-ui/button";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { isFuture, isPast } from "date-fns";
import { RoundEndedBanner, RoundStartingSoon } from "./CTAStatus";
import { useUser } from "@/app/context/user";
import { Button } from "@/utils/chakra";

interface Props {
  roundId?: string;
  hackathonId?: string;
  projectJoinId?: string;
  hackathonJoinId?: string;
  startTime: Date;
  endTime: Date;
  onDonateHandler: () => void;
  owner: string;
}

export const DonationStatus = (props: Props) => {
  const { user } = useUser();
  const { setVisible } = useWalletModal();
  if (props.roundId && props.projectJoinId) {
    // hackathon is starting soon
    if (isFuture(new Date(props.startTime))) {
      return <RoundStartingSoon startDate={props.startTime} />;
    }

    // hackathon is live
    if (
      isPast(new Date(props.startTime)) &&
      isFuture(new Date(props.endTime))
    ) {
      // when no user is connected
      if (!user) {
        return (
          <Button
            onClick={() => setVisible(true)}
            variant="cubikFilled"
            size="md"
            w="full"
          >
            Connect Wallet
          </Button>
        );
      }

      return (
        <Button
          onClick={props.onDonateHandler}
          variant="cubikFilled"
          size="md"
          w="full"
        >
          Donate
        </Button>
      );
    }

    // hackathon has ended
    if (isPast(new Date(props.endTime))) {
      return <RoundEndedBanner endDate={props.endTime} />;
    }
    return <></>;
  }

  if (props.hackathonId && props.hackathonJoinId) {
    // hackathon has ended
    if (isPast(props.endTime)) {
      return <RoundEndedBanner isHackathon={true} endDate={props.endTime} />;
    }
    // default nothing
    return <></>;
  }

  return <></>;
};
