import { create } from "zustand";

const useConnectWalletModalStore = create(() => {
  const { isOpen, onOpen, onClose } = {
    isOpen: false,
    onOpen: () => null,
    onClose: () => null,
  };

  return {
    isOpen,
    onOpen,
    onClose,
  };
});
export default useConnectWalletModalStore;
