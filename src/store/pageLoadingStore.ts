import produce, { Draft } from 'immer';
import {create} from 'zustand';

type loadingStoreState = {
  isLoading: boolean;
  setIsLoading: (_isLoading: boolean) => void;
};

const useLoadingStore = create<loadingStoreState>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) =>
    set(
      produce((state: Draft<loadingStoreState>) => {
        state.isLoading = isLoading;
      })
    ),
}));

export default useLoadingStore;
