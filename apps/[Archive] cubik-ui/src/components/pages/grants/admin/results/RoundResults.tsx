import React from "react";
import NoInformation from "~/components/common/empty-state/NoInformation";

const RoundResults = ({
  roundData,
  isLoading,
}: {
  roundData?: any;
  isLoading?: boolean;
}) => {
  return <NoInformation />;
};

export default RoundResults;
