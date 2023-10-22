"use client";

import { useUser } from "@/context/user";
import React from "react";

export const UserInteraction = () => {
  const { user } = useUser();
  return <div>{user?.username || "default"}</div>;
};
