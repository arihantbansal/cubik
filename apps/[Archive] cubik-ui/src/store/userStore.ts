import { UserModel } from "@cubik/database";
import axios from "axios";
import { create } from "zustand";

type State = {
  user: UserModel | null;
  setUser: (user: UserModel | null) => void;
  resetUser: (id: string) => void;
};

export const useUserStore = create<State>((set) => ({
  user: null,
  setUser: (user: UserModel | null) => set({ user }),
  resetUser: async (token: string) => {
    const res = await axios.get(`/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = res.data.data as UserModel;
    set({ user });
  },
}));
