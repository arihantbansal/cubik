"use client";
// /import { Button } from "@chakra-ui/button";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { isFuture, isPast } from "date-fns";
import { RoundEndedBanner, RoundStartingSoon } from "./CTAStatus";
import { useUser } from "@/app/context/user";
import { Box, Button } from "@/utils/chakra";

interface Props {
  roundId?: string;
  hackathonId?: string;
  projectJoinId?: string;
  hackathonJoinId?: string;
  startTime: Date;
  endTime: Date;
  onDonateHandler?: () => void;
  owner: string;
}
