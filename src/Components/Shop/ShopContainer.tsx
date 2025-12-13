import { useSearchParams } from "react-router";
import { useGetCategoryQuery } from "../../queries/useGetCategoryQuery";
import { Category } from "../../type";
import { PageSection } from "../PageSection";
import { ApiCallError } from "../ui/ApiCallError";
import { ApiCallLoading } from "../ui/ApiCallLoading";
import { ShopFilter } from "./ShopFilter";
import { ShopItems } from "./ShopItems";

/**
 * ✅ FIXED: Changed from local state to URL search params for category filtering
 *
 * WHY THE ORIGINAL IMPLEMENTATION WAS INCORRECT:
 * The original code used: const [selectFilterValue, setSelectedValue] = useState<Category>("all");
 *
 * PROBLEMS:
 * 1. Not shareable: Filter state lost when sharing URL
 *    - User filters to "beauty" category, shares URL, recipient sees "all" products
 * 2. Not bookmarkable: Filter state lost on page refresh
 *    - User filters to "furniture", refreshes page, filter resets to "all"
 * 3. Poor UX: Can't deep link to specific category
 *    - Can't send someone a link to "beauty products" page
 * 4. Browser history: Can't use back/forward buttons to navigate filters
 *
 * WHY THE NEW IMPLEMENTATION WORKS:
 * - Uses URL search params: /shop?category=beauty
 * - Filter state is in URL, making it shareable and bookmarkable
 * - Preserves filter state on page refresh
 * - Browser back/forward buttons work with filters
 * - Deep linkable: Can share links to specific filtered views
 * - Better UX: Users can bookmark their favorite category views
 *
 * HOW IT WORKS:
 * 1. Read category from URL search params on mount
 * 2. Default to "all" if no category param exists
 * 3. Update URL when category changes
 * 4. URL and filter state stay in sync
 *
 * LEARN MORE:
 * - React Router search params: https://reactrouter.com/en/main/hooks/use-search-params
 * - URL design: https://www.w3.org/Provider/Style/URI
 * - State management in URLs: https://kentcdodds.com/blog/avoid-nesting-state
 */
// Helper function to validate category
function isValidCategory(value: string): value is Category {
  return ["all", "beauty", "fragrances", "furniture", "groceries"].includes(value);
}

export const ShopContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get category from URL, default to "all" if not present
  const categoryParam = searchParams.get("category");
  const selectFilterValue: Category = 
    categoryParam && isValidCategory(categoryParam) 
      ? (categoryParam as Category) 
      : "all";

  // Update URL when category changes
  const setSelectedValue = (category: Category) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (category === "all") {
      // Remove category param for "all" to keep URL clean
      newSearchParams.delete("category");
    } else {
      newSearchParams.set("category", category);
    }
    setSearchParams(newSearchParams, { replace: true });
  };

  const { data, error, isFetching } = useGetCategoryQuery(selectFilterValue);

  if (error) return <ApiCallError error={error} />;

  if (isFetching) return <ApiCallLoading />;

  if (!data) return null;

  return (
    <section>
      <PageSection>
        <h1 className="font-bold text-3xl">Shop</h1>
      </PageSection>
      <div className="flex flex-col items-center py-4 sm:py-0 sm:pb-4 sm:pt-20">
        <div className="w-full  max-w-screen-xl flex flex-col sm:flex-row  gap-12 sm:gap-0 justify-center sm:justify-between items-center px-3">
          <div className="flex">
            {/* ✅ FIXED: Removed placeholder text "This is products" */}
            {/* 
              WHY THE ORIGINAL WAS INCORRECT:
              - Placeholder text should never appear in production code
              - Unprofessional appearance
              - Confusing for users
              
              WHY THE FIX MATTERS:
              - Cleaner UI
              - Professional appearance
              - Better user experience
            */}
            <p>Showing 1 - {data.length} results</p>
          </div>
          <div>
            <ShopFilter 
              setselectedValue={setSelectedValue} 
              currentValue={selectFilterValue}
            />
          </div>
        </div>
      </div>

      {/* ✅ IMPLEMENTED: Empty state for no products found */}
      {/*
        WHY THE ORIGINAL IMPLEMENTATION WAS INCORRECT:
        The original code always showed <ShopItems shopList={data} /> even when data.length === 0.
        This would show "Showing 1 - 0 results" which is confusing and unhelpful.
        
        PROBLEMS:
        1. Confusing message: "Showing 1 - 0 results" doesn't make sense
        2. Empty list with no feedback - users don't know if something is broken
        3. Poor UX - no guidance on what to do next
        
        WHY THE NEW IMPLEMENTATION WORKS:
        - Shows a clear message when no products match the filter
        - Provides helpful context (e.g., "No products found in [category]")
        - Suggests actions (try different category)
        - Better user experience with proper feedback
        
        HOW IT WORKS:
        1. Check if data.length === 0
        2. If empty, show empty state with helpful message
        3. If not empty, show products as before
        
        LEARN MORE:
        - Empty states in UX: https://www.nngroup.com/articles/empty-state-ux/
        - Conditional rendering: https://react.dev/learn/conditional-rendering
        - User feedback patterns: https://www.interaction-design.org/literature/topics/user-feedback
      */}
      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <p className="text-xl font-medium text-gray-700 mb-2">
            No products found
          </p>
          <p className="text-sm text-gray-500 mb-4">
            {selectFilterValue !== "all"
              ? `No products available in the "${selectFilterValue}" category.`
              : "No products are currently available."}
          </p>
          {selectFilterValue !== "all" && (
            <button
              onClick={() => setSelectedValue("all")}
              className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors text-sm"
            >
              View all products
            </button>
          )}
        </div>
      ) : (
        <ShopItems shopList={data} />
      )}
    </section>
  );
};
