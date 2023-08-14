"use client";
import React, { useState } from "react";
import { Box, Button, VStack } from "@/utils/chakra";
import { useQuery } from "@tanstack/react-query";
import { handleEvent } from "./fetchEvents";
import { Tile } from "./ActiveTile";

interface Props {
  projectId: string;
}
export const ActiveEvent = ({ projectId }: Props) => {
  const event = useQuery({
    queryFn: () => handleEvent(),
    queryKey: ["event"],
  });
  const [selectedEventId, setSelectedEventId] = useState<string>("");

  return (
    <>
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
        >
          Apply
        </Button>
      </VStack>
    </>
  );
};
