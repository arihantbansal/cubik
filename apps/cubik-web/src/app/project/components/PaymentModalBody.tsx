import { Stack } from "@/utils/chakra";
import React, { Dispatch, SetStateAction } from "react";
import { ProjectDonationSimulator } from "./ProjectDonationSimulator";

interface Props {
  event: "hackathon" | "round" | "preview";
  eventId: string;
  name: string;
  projectLink: string;
  setDonationSuccessful: Dispatch<SetStateAction<boolean>>;
  logo: string;
  ownerPublicKey: string;
  userCount: number;
  projectId: string;
  multiSig: string;
}
export const PaymentModalBody = ({
  event,
  eventId,
  name,
  projectLink,
  setDonationSuccessful,
  logo,
  ownerPublicKey,
  userCount,
  projectId,
  multiSig,
}: Props) => {
  return (
    <>
      <Stack direction="row">
        <ProjectDonationSimulator
          multiSig={multiSig}
          projectId={projectId}
          ownerPublicKey={ownerPublicKey}
          userCount={userCount}
          eventType={event}
          eventId={eventId}
          logo={logo}
          name={name}
          projectLink={projectLink}
          setDonationSuccessful={setDonationSuccessful}
        />
      </Stack>
    </>
  );
};
