"use client";

import { useUser } from "@/app/context/user";
import { VisitorProjectEmptyState } from "./VisitorViewEmptyPage";
import { AdminProjectEmptyState } from "./AdminViewEmptyPage";

interface Props {
  username: string;
}
export const EmptyState = ({ username }: Props) => {
  const { user } = useUser();
  if (user && user?.username === username) {
    return <AdminProjectEmptyState />;
  }
  return <VisitorProjectEmptyState />;
};
