"use client";
import React, { useState } from "react";
import { Box, Button, VStack } from "@/utils/chakra";
import { useQuery } from "@tanstack/react-query";
import { handleEvent } from "./fetchEvents";
import { Tile } from "./ActiveTile";
import { createJoinHackathon } from "./joinEvent";

interface Props {
  projectId: string;
}
export const ActiveEvent = ({ projectId }: Props) => {
  const event = useQuery({
    queryFn: () => handleEvent(),
    queryKey: ["event"],
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const handleEventSubmit = async () => {
    try {
      const selectedEvent = event.data?.find((e) => e.id === selectedEventId);

      if (!selectedEvent) return;
      const res = await createJoinHackathon(selectedEvent.id, projectId);
      console.log(res);
      setSubmitted(true);
    } catch (error) {
      console.log(error);
      setSubmitted(false);
    }
  };
  return (
    <>
      {submitted ? (
        <>submitted</>
      ) : (
        <VStack w="full">
          {event.isLoading && <Box>loading...</Box>}
          {event.data?.map((el) => (
            <Tile
              key={el.id}
              selectedEventId={selectedEventId}
              tileIndex={el.id}
              name={el.name}
              setSelectedEventId={setSelectedEventId}
            />
          ))}
          <Button
            w="full"
            isDisabled={event.isError || event.isLoading}
            variant={"cubikFilled"}
            onClick={handleEventSubmit}
          >
            Apply
          </Button>
        </VStack>
      )}
    </>
  );
};
