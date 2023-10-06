import { Headers } from "@/components/Headers";
import React from "react";

interface Props {
  children: React.JSX.Element;
}
const EventLayout = ({ children }: Props) => {
  return (
    <>
      <div>
        <Headers />
        {children}
      </div>
    </>
  );
};

export default EventLayout;
