import { create } from "zustand";

export const useProducts = create((set) => ({
  products: [],
  setProducts: (products: any) => set(() => ({ products: products })),
}));
