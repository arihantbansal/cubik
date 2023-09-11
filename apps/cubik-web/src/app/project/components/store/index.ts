"use client";

import type { ProjectPageEventType } from "@/types/project";
import { create } from "zustand";

interface ProjectEventStore {
  event: ProjectPageEventType | null;
  setEvent: (event: ProjectPageEventType) => void;
}

export const useProjectEventStore = create<ProjectEventStore>((set) => ({
  event: null,
  setEvent: (event) => set({ event }),
}));
