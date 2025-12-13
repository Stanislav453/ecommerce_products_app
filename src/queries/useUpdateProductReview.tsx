import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProductReview } from "../api/shopRepository";
import { ReviewSubmission } from "../api/shopRepository";

export const useUpdateProductReview = (productId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (review: ReviewSubmission) =>
      addProductReview(productId, review),
    onSuccess: () => {
      // Invalidate the product query to refetch with new review
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
    },
  });
};

