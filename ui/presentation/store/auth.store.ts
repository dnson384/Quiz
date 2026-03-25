import { create } from "zustand";

interface authState {
  authMethod: string;
  setAuthMethod: (method: string) => void;
}

export const useAuthStore = create<authState>((set) => ({
  authMethod: "login",
  setAuthMethod: (method: string) => set({ authMethod: method }),
}));

interface roleState {
  authRole: string | null;
  setRole: (role: string | null) => void;
}

export const useRoleStore = create<roleState>((set) => ({
  authRole: null,
  setRole: (role: string | null) => set({ authRole: role }),
}));
