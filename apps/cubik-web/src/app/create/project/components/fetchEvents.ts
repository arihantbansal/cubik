interface Event {
  name: string;
  id: string;
  shortDescription: string;
  tracks?: { label: string; value: string }[];
  type: "hackathon" | "round";
}
export const handleEvent = async (): Promise<Event[]> => {
  try {
    const res = await fetch("/api/core/events").then((res) => res.json());
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
