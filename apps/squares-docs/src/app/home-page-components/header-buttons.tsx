"use client";
import { Icon } from "@cubik/ui";
import React from "react";

const HeaderButtons = () => {
  return (
    <div className="flex flex-row gap-8 items-center justify-center h-fit">
      <button
        onClick={() => {
          const ele = document.querySelector("html");
          if (!ele?.className) return;
          if (ele.className === "dark") {
            ele.className = "light";
          } else {
            ele.className = "dark";
          }
        }}
      >
        <Icon
          name={"github"}
          stroke={"var(--color-fg-primary)"}
          strokeWidth={2}
          fill="none"
          height={26}
          width={26}
        />
      </button>
      <Icon
        name={"github"}
        stroke={"var(--color-fg-primary)"}
        strokeWidth={2}
        fill="none"
        height={26}
        width={26}
      />
      <Icon
        name={"figma"}
        stroke={"var(--color-fg-primary)"}
        strokeWidth={2}
        fill="none"
        height={26}
        width={26}
      />
    </div>
  );
};

export default HeaderButtons;
