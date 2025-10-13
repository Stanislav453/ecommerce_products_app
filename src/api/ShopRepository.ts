import { useMutation, useQuery } from "@tanstack/react-query";
import { getProductDetail, updateReviews } from "./shopApiCalls";
import { Category, UserReview } from "../type";
import { fetchShopArgs } from "../Components/Shop/fetchShopArgs";
import { queryClient } from "../queryClient";

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
  updateProductReviews: {
    useMutation: (id: string) =>
      useMutation({
        mutationKey: ["updateProductReviews", id],
        mutationFn: (newReview: UserReview) => updateReviews(newReview),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["productDetail", id] });
        },
      }),
  },
};
