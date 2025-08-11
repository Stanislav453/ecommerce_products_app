import { create } from "zustand";
import { Product } from "../type";

export interface useProductsType {
  products: Product[];
  setProducts: (products: Product[]) => void;
}

export const useProducts = create<useProductsType>((set) => ({
  products: [],
  setProducts: (products: Product[]) => set(() => ({ products: products })),
}));
