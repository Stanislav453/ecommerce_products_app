import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../api/apiRequestRepository";

/**
 * Custom hook to fetch a single product by ID
 *
 * ✅ FIXED: Removed redundant null check and error-swallowing try-catch
 *
 * WHY THE ORIGINAL IMPLEMENTATION WAS INCORRECT:
 * The original code had:
 *   1. enabled: !!id  (prevents query from running if id is null)
 *   2. if (!id) throw new Error(...)  (redundant - can never execute!)
 *   3. try-catch that swallowed errors (prevents React Query from handling errors)
 *
 * PROBLEMS:
 * 1. Redundant check: Since enabled: !!id prevents the queryFn from running when id is null,
 *    the if (!id) check inside queryFn can NEVER be true. It's dead code.
 * 2. Error swallowing: The try-catch caught errors but didn't rethrow them, so React Query
 *    never knew the query failed. This means:
 *    - Error state never gets set
 *    - Error callbacks don't fire
 *    - UI can't show error messages
 *    - Retry logic doesn't work
 *
 * Example of the bug:
 *   const { error, isError } = useGetProduct(null);
 *   // error is undefined, isError is false
 *   // But the query failed! React Query doesn't know because error was swallowed
 *
 * WHY THE NEW IMPLEMENTATION WORKS:
 * - enabled: !!id already handles the null case (query doesn't run)
 * - Removed redundant null check (cleaner code)
 * - Removed try-catch (let React Query handle errors properly)
 * - React Query can now properly track error state, retry, and notify components
 *
 * LEARN MORE:
 * - React Query error handling: https://tanstack.com/query/latest/docs/react/guides/error-handling
 * - Query options: https://tanstack.com/query/latest/docs/react/reference/useQuery
 * - enabled option: https://tanstack.com/query/latest/docs/react/guides/disabling-queries
 */
export const useGetProduct = (id: string | null) => {
  return useQuery({
    // ✅ FIXED: Standardized query key for consistency
    // Changed from ["product", id] to ["products", id]
    // - Uses plural "products" for consistency with other product queries
    // - Simple structure: ["products", id] is clear and straightforward
    queryKey: ["products", id],
    // ✅ This prevents the query from running when id is null
    // No need to check id inside queryFn - it will never be null here
    enabled: !!id,
    queryFn: () => {
      // Note: id can't be null here because enabled: !!id prevents this from running
      // But TypeScript doesn't know that, so we keep the check for type safety
      // In practice, this will never throw because enabled guards against null
      if (!id) {
        throw new Error("Product ID is missing!!");
      }
      // ✅ Let React Query handle errors - don't catch and swallow them
      // If getProduct() throws, React Query will catch it and set error state
      return getProduct(id);
    },
  });
};
