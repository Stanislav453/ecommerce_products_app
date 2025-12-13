import { useSearchParams } from "react-router";
import { ProdDescContainer } from "./ProdDescContainer";
import { ProdDetailViews } from "./ProdDetailViews";
import { ApiCallError } from "../ui/ApiCallError";
import { ApiCallLoading } from "../ui/ApiCallLoading";
import { useGetProduct } from "../../queries/useGetProduct";

/**
 * Product Detail Container Component
 * 
 * ✅ FIXED: Removed duplicate id declaration and added proper null checks
 * 
 * WHY THE ORIGINAL IMPLEMENTATION WAS INCORRECT:
 * The original code had:
 *   export const ProdDetailContainer = ({id}: {id: string}) => {
 *     const [searchParams] = useSearchParams();
 *     const id = searchParams.get("id");  // ❌ ERROR: Duplicate identifier!
 * 
 * PROBLEMS:
 * 1. Duplicate identifier: 'id' was declared twice (once as prop, once from searchParams)
 *    - TypeScript error: "Duplicate identifier 'id'"
 *    - The prop was never used, making it pointless
 * 2. Missing null check: searchParams.get() returns string | null, but id was passed
 *    to ProdDescContainer which expects string (not nullable)
 * 3. Type mismatch: Could pass null to components expecting string
 * 
 * WHY THE NEW IMPLEMENTATION WORKS:
 * - Removed id prop (not needed - we get it from URL)
 * - Get id from searchParams (the actual source of truth)
 * - Combined null check: if (data == null || id == null) return null;
 *    - This uses TypeScript's type narrowing: after this check, TypeScript knows
 *      both data and id are non-null in the return statement
 *    - No need for type assertions or additional checks
 * - Type-safe: id is guaranteed to be string when passed to child components
 * 
 * LEARN MORE:
 * - TypeScript type narrowing: https://www.typescriptlang.org/docs/handbook/2/narrowing.html
 * - React Router search params: https://reactrouter.com/en/main/hooks/use-search-params
 * - React component props: https://react.dev/learn/passing-props-to-a-component
 */
export const ProdDetailContainer = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { data, error, isFetching } = useGetProduct(id);
  
  if (error) return <ApiCallError error={error} />;

  if (isFetching) return <ApiCallLoading />;

  // ✅ Type narrowing: After this check, TypeScript knows both data and id are non-null
  // This is better than separate checks because it's more concise and still type-safe
  if (data == null || id == null) return null;

  return (
    <section>
      <div className="flex flex-col items-center">
        <ProdDetailViews data={data} />
        <ProdDescContainer
          title={data.title}
          description={data.description}
          reviews={data.reviews}
          id={id}
        />
      </div>
    </section>
  );
};
