import { useQuery } from "@tanstack/react-query";
import { getProductDetail, getSummuryProducts } from "./shopApiCalls";

export const shopRepository = {
  shopProductsSummury: {
    useQuery: () =>
      useQuery({
        queryKey: ["products"],
        queryFn: () => getSummuryProducts(),
      }),
  },
  shopProductDetail: {
    useQuery: (id: string | null) =>
      useQuery({
        queryKey: ["productDetail"],
        queryFn: () => getProductDetail(id),
      }),
  },
};
