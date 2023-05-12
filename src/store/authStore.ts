import create from 'zustand';

type State = {
  authenticated: boolean;
  setAuthenticated: (value: boolean) => void;
};

export const useAuthStore = create<State>((set) => ({
  authenticated: false,
  setAuthenticated: (value: boolean) => set({ authenticated: value }),
}));
