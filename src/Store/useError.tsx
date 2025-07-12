import { create } from "zustand";
import type { ProductType } from "../type";

interface useError {
  apiError: string;
  setApiError: (apiError: string) => void;
}

export const useError = create<useError>((set) => ({
  apiError: "",
  setApiError: (apiError: string) => set(() => ({ apiError: apiError })),
}));
