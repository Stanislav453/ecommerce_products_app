import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Category,
  ProductDetailResponse,
  ProductSummaryResponse,
  UserReview,
} from "../type";
import { queryClient } from "../queryClient";
import { fetchBuilder } from "../fetchBuilder";

export const shopRepository = {
  shopProductsSummury: (category: Category) =>
    useQuery({
      queryKey: ["products", category],
      queryFn: () =>
        fetchBuilder({
          method: "GET",
          category,
          params: {
            select: "id,title,thumbnail,price,rating",
          },
        }),
    }),
  shopProductDetail: (id: string) =>
    useQuery({
      queryKey: ["productDetail", id],
      queryFn: () =>
        fetchBuilder<ProductDetailResponse>({
          method: "GET",
          id,
          params: {
            select:
              "id,title,images,price,rating,description,category,tags,reviews",
          },
        }),
      enabled: !!id,
    }),
  updateProductReviews: (id: string) =>
    useMutation({
      mutationKey: ["updateProductReviews", id],
      mutationFn: (newReview: UserReview) =>
        fetchBuilder({ method: "PUT", id, body: newReview }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["productDetail", id] });
      },
    }),
};
