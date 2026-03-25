import { create } from "zustand";

interface showFullMenuState {
  showFullMenu: boolean;
  setShowFullMenu: (show: boolean) => void;
}

export const useShowFullMenu = create<showFullMenuState>((set) => ({
  showFullMenu: false,
  setShowFullMenu: (showFull: boolean) => set({ showFullMenu: showFull }),
}));