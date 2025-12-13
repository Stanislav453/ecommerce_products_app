import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProductReview } from "../api/shopRepository";
import { ReviewSubmission } from "../api/shopRepository";

/**
 * ✅ FIXED: Standardized query key for invalidation
 * 
 * WHY THE ORIGINAL IMPLEMENTATION WAS INCORRECT:
 * The original code had: queryKey: ["product", productId]
 * 
 * PROBLEMS:
 * 1. Inconsistent: Used singular "product" while useGetProduct uses plural "products"
 * 2. Risk of mismatch: If useGetProduct key changes, this invalidation might not work
 * 
 * WHY THE NEW IMPLEMENTATION WORKS:
 * - Matches useGetProduct structure: ["products", productId]
 * - Consistent naming: Uses plural "products" for consistency
 * - Ensures proper invalidation: Same key structure means invalidation works correctly
 * 
 * HOW IT WORKS:
 * When a review is successfully submitted, we invalidate the product query
 * This causes React Query to refetch the product data, which includes the new review
 * 
 * LEARN MORE:
 * - Query invalidation: https://tanstack.com/query/latest/docs/react/guides/query-invalidation
 * - Mutations: https://tanstack.com/query/latest/docs/react/guides/mutations
 */
export const useUpdateProductReview = (productId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (review: ReviewSubmission) =>
      addProductReview(productId, review),
    onSuccess: () => {
      // ✅ Use standardized query key for invalidation
      // This matches the key used in useGetProduct: ["products", id]
      // Ensures proper cache invalidation when review is added
      queryClient.invalidateQueries({ queryKey: ["products", productId] });
    },
  });
};

