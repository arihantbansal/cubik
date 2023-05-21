import { produce } from 'immer';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';
import { env } from '~/env.mjs';

type IUserStore = {
  user: any;
};

export const useUserStore = create<IUserStore>((set, _get) => ({
  user: 'user',
  setUser: (data: any) => {
    set(
      produce((draft) => {
        draft.user = data;
      })
    );
  },
}));

if (env.NODE_ENV === 'development') {
  mountStoreDevtool('profileStore', useUserStore);
}
