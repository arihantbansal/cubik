import { ProjectsModel } from "@cubik/database";
import { produce } from "immer";
import { create } from "zustand";

type Store = {
  projectList: ProjectsModel[];
  count: () => number;
  addProject: (_project: ProjectsModel) => void;
  removeProject: (_id: string) => void;
};

const useListStore = create<Store>((set, get) => ({
  projectList: [],
  count: () => get().projectList.length,
  addProject: (project) =>
    set(
      produce((state) => {
        state.projectList.push(project);
      })
    ),
  removeProject: (id) =>
    set(
      produce((state) => {
        state.projectList = state.projectList.filter(
          (project: ProjectsModel) => project.id !== id
        );
      })
    ),
}));

export default useListStore;
