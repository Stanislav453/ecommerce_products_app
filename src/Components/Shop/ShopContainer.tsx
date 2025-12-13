import { useState } from "react";
import { useGetCategoryQuery } from "../../queries/useGetCategoryQuery";
import { Category } from "../../type";
import { PageSection } from "../PageSection";
import { ApiCallError } from "../ui/ApiCallError";
import { ApiCallLoading } from "../ui/ApiCallLoading";
import { ShopFilter } from "./ShopFilter";
import { ShopItems } from "./ShopItems";

export const ShopContainer = () => {
  // ✅ FIXED: Changed from setselectedValue to setSelectedValue (camelCase)
  //
  // WHY THE ORIGINAL IMPLEMENTATION WAS INCORRECT:
  // The original code had: const [selectFilterValue, setselectedValue] = useState<Category>("all");
  //
  // PROBLEMS:
  // 1. Naming convention violation: React setState functions should be camelCase
  //    - setselectedValue should be setSelectedValue (capital S)
  // 2. Inconsistency: Doesn't follow React/JavaScript naming conventions
  // 3. Confusing: Harder to read and understand
  //
  // WHY THE NEW IMPLEMENTATION WORKS:
  // - Follows React naming convention: setState functions are camelCase with capital letter
  // - Consistent with React ecosystem standards
  // - More readable and professional
  //
  // LEARN MORE:
  // - React useState: https://react.dev/reference/react/useState
  // - JavaScript naming conventions: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#variables
  // - Code style guides: https://google.github.io/styleguide/jsguide.html
  const [selectFilterValue, setSelectedValue] = useState<Category>("all");

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
            <ShopFilter setselectedValue={setSelectedValue} />
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
