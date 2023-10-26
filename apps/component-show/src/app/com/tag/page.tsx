"use client";
import { Tag } from "@cubik/ui";
import React from "react";

const Tags = () => {
  return (
    <div className="flex justify-start px-10 flex-col gap-5">
      <div className="font-2xl font-semibold">Tag</div>

      <div className="space-y-2">
        <div className="font-lg font-semibold"></div>
        <Tag text="Pending" iconName="spinner" color="#000" />
      </div>
    </div>
  );
};

export default Tags;
