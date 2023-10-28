import type { User } from '@/types/auth';
import { create } from 'zustand';

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUser = create<UserState>()((set) => ({
  setUser: (user) => {
    return set({
      user,
    });
  },
  user: null,
}));
