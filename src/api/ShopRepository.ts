import { useQuery } from "@tanstack/react-query";
import { getProductDetail } from "./shopApiCalls";
import { ProductSummaryResponse } from "../type";

export const shopRepository = {
  shopProductsSummury: {
    useQuery: (fetchData: Promise<ProductSummaryResponse>) =>
      useQuery({
        queryKey: ["products"],
        queryFn: () => fetchData,
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
