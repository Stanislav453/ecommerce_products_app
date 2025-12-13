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

  const { data, error, isFetching } =
    useGetCategoryQuery(selectFilterValue);

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
      <ShopItems shopList={data} />
    </section>
  );
};
