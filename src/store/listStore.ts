// store.ts
import { ProjectsModel } from '@prisma/client';
import produce from 'immer';
import create from 'zustand';

type Store = {
  projectList: ProjectsModel[];
  count: number;
  addProject: (project: ProjectsModel) => void;
  removeProject: (id: string) => void;
};

const useListStore = create<Store>((set, get) => ({
  projectList: [],
  count: 0,
  addProject: (project) =>
    set(
      produce((state) => {
        state.projectList.push(project);
        state.count = state.projectList.length;
      })
    ),
  removeProject: (id) =>
    set(
      produce((state) => {
        state.projectList = state.projectList.filter(
          (project: ProjectsModel) => project.id !== id
        );
        state.count = state.projectList.length;
      })
    ),
}));

export default useListStore;
