import { useQuery } from "@tanstack/react-query";
import { getProductDetail } from "./shopApiCalls";
import { Category} from "../type";
import { fetchShopArgs } from "../Components/Shop/fetchShopArgs";

export const shopRepository = {
  shopProductsSummury: {
    useQuery: (category: Category) =>
      useQuery({
        queryKey: ["products"],
        queryFn: () => fetchShopArgs(category),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: 1,
        staleTime: 10 * 60 * 1000,
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
