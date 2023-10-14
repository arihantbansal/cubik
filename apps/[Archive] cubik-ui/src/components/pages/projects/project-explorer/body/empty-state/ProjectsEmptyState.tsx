import EmptyStateHOC from "~/components/HOC/EmptyState";

const EmptyProjectsState = () => (
  <EmptyStateHOC
    heading={"No Project Found"}
    subHeading={
      "We couldn`t find any projects matching your search. Please try a different query or check back later."
    }
  />
);

export default EmptyProjectsState;
