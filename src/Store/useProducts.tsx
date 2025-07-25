import { create } from "zustand";
import type { ProductType } from "../type";

export interface useProductsType {
  products: ProductType[];
  setProducts: (products: ProductType[]) => void;
}

export const useProducts = create<useProductsType>((set) => ({
  products: [],
  setProducts: (products: ProductType[]) => set(() => ({ products: products })),
}));
