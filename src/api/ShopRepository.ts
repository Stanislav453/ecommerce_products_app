import { useQuery } from "@tanstack/react-query";
import { getSummuryProducts } from "./ShopApiCalls";

export const ShopRepository = {
  ShopProductsSummury: {
    useQuery: () =>
      useQuery({
        queryKey: ["products"],
        queryFn: () => getSummuryProducts(),
      }),
  },
};
