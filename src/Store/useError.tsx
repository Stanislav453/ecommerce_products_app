import { create } from "zustand";

interface useError {
  apiError: string;
  setApiError: (apiError: string) => void;
}

export const useError = create<useError>((set) => ({
  apiError: "",
  setApiError: (apiError: string) => set(() => ({ apiError: apiError })),
}));
