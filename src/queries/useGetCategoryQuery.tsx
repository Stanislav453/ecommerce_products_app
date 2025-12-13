import { useQuery } from "@tanstack/react-query";
import { getProductsCategory } from "../api/apiRequestRepository";
import { Category } from "../type";

/**
 * ✅ FIXED: Standardized query key for consistency
 *
 * WHY THE ORIGINAL IMPLEMENTATION WAS INCORRECT:
 * The original code had: queryKey: ["product", category]
 *
 * PROBLEMS:
 * 1. Inconsistent: Used singular "product" while other queries use plural "products"
 * 2. Naming convention: Should use plural form for resource collections
 *
 * WHY THE NEW IMPLEMENTATION WORKS:
 * - Consistent naming: Uses plural "products" to match resource naming conventions
 * - Simple structure: ["products", category] is clear and straightforward
 * - Matches pattern: Consistent with other product queries using ["products", ...]
 *
 * QUERY KEY STRUCTURE:
 * ["products", category]
 * - "products": Resource type (plural for consistency)
 * - category: Query parameter (e.g., "electronics", "all")
 *
 * LEARN MORE:
 * - React Query keys: https://tanstack.com/query/latest/docs/react/guides/query-keys
 * - Query invalidation: https://tanstack.com/query/latest/docs/react/guides/query-invalidation
 */
export const useGetCategoryQuery = (category: Category) => {
  return useQuery({
    queryKey: ["products", category],
    queryFn: () => getProductsCategory(category),
  });
};
