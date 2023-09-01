"use client";
import { useUser } from "@/app/context/user";
import React from "react";
import { VisitorViewCard } from "./VisitorViewCards";
import type { ProjectCommonType } from "./type";
import { AdminViewCards } from "./AdminViewCards";

interface Props {
  username: string;
  projects: ProjectCommonType[];
}
export const ProjectCards = ({ username, projects }: Props) => {
  const { user } = useUser();
  if (user && user.username === username) {
    return projects.map((project) => (
      <AdminViewCards key={project.id} project={project} />
    ));
  }
  return projects.map((project) => (
    <VisitorViewCard key={project.id} projects={project} />
  ));
};
