"use client";
import { useUser } from "@/app/context/user";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { isFuture, isPast } from "date-fns";
import React from "react";
import { RoundEndedBanner, RoundStartingSoon } from "./CTAStatus";
import { Button } from "@chakra-ui/react";

interface Props {
  roundId?: string;
  hackathonId?: string;
  projectJoinId?: string;
  hackathonJoinId?: string;
  startTime: Date;
  endTime: Date;
  loading: boolean;
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
  }

  if (props.hackathonId && props.hackathonJoinId) {
    // hackathon is starting soon

    // if (isFuture(props.startTime)) {
    //   return (
    //     <RoundStartingSoon isHackathon={true} startDate={props.startTime} />
    //   );
    // }

    // round is live
    if (isPast(props.startTime) && isFuture(props.endTime)) {
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

      if (user?.mainWallet === props.owner) {
        return (
          <Button
            disabled={true}
            isDisabled={true}
            variant="cubikFilled"
            size="md"
            w="full"
          >
            Donate
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
    if (isPast(props.endTime)) {
      return <RoundEndedBanner isHackathon={true} endDate={props.endTime} />;
    }
    // default nothing
    return <>{props.startTime}</>;
  }

  return <></>;
};
