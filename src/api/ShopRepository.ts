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
        fetchBuilder<ProductSummaryResponse>({
          method: "GET",
          variant: "category",
          categoryName: category,
          params: "id,title,thumbnail,price,rating",
        }),
    }),
  shopProductDetail: (id: string) =>
    useQuery({
      queryKey: ["productDetail", id],
      queryFn: () =>
        fetchBuilder<ProductDetailResponse>({
          method: "GET",
          variant: "product",
          id: id,
          params:
            "id,title,images,price,rating,description,category,tags,reviews",
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
