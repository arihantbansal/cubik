import { UserModel } from '@prisma/client';
import { create } from 'zustand';

type State = {
  user: UserModel | null;
  setUser: (user: UserModel | null) => void;
};

export const useUserStore = create<State>((set) => ({
  user: null,
  setUser: (user: UserModel | null) => set({ user }),
}));
