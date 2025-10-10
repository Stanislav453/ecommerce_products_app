import { useQuery } from "@tanstack/react-query";
import { getProductDetail } from "./shopApiCalls";
import { Category } from "../type";
import { fetchShopArgs } from "../Components/Shop/fetchShopArgs";

export const shopRepository = {
  shopProductsSummury: {
    useQuery: (category: Category) =>
      useQuery({
        queryKey: ["products", category],
        queryFn: () => fetchShopArgs(category),
      }),
  },
  shopProductDetail: {
    useQuery: (id: string | null) =>
      useQuery({
        queryKey: ["productDetail", id],
        queryFn: () => getProductDetail(id),
        enabled: !!id,
      }),
  },
};
