import { useParams } from "react-router";
import { ProdDescContainer } from "./ProdDescContainer";
import { ProdDetailViews } from "./ProdDetailViews";
import { ApiCallError } from "../ui/ApiCallError";
import { ApiCallLoading } from "../ui/ApiCallLoading";
import { useGetProduct } from "../../queries/useGetProduct";

/**
 * Product Detail Container Component
 *
 * ✅ FIXED: Changed from search params to path params (RESTful routing)
 *
 * WHY THE ORIGINAL IMPLEMENTATION WAS INCORRECT:
 * The original code used:
 *   const [searchParams] = useSearchParams();
 *   const id = searchParams.get("id");  // ❌ Search param: /product-detail?id=123
 *
 * PROBLEMS:
 * 1. Not RESTful: Resource IDs should be in the path, not query params
 *    - REST convention: /product-detail/:id (path param)
 *    - Query params should be for filtering/sorting, not resource identification
 * 2. Poor SEO: Search engines prefer clean URLs with path parameters
 *    - /product-detail/123 is better indexed than /product-detail?id=123
 * 3. Less semantic: Path parameters are more intuitive and readable
 * 4. Harder to bookmark/share: Path params are more user-friendly
 * 5. Inconsistent with REST conventions: Industry standard is path params for resources
 *
 * WHY THE NEW IMPLEMENTATION WORKS:
 * - Uses path parameter: useParams() gets id from /product-detail/:id
 * - Creates clean URLs: /product-detail/123 (RESTful)
 * - Better SEO: Search engines prefer path parameters
 * - More intuitive: Easier to read and understand
 * - Type-safe: React Router validates path params
 * - Combined null check: if (data == null || id == null) return null;
 *    - This uses TypeScript's type narrowing: after this check, TypeScript knows
 *      both data and id are non-null in the return statement
 *
 * LEARN MORE:
 * - REST API conventions: https://restfulapi.net/resource-naming/
 * - React Router params: https://reactrouter.com/en/main/hooks/use-params
 * - TypeScript type narrowing: https://www.typescriptlang.org/docs/handbook/2/narrowing.html
 * - URL design: https://www.w3.org/Provider/Style/URI
 */
export const ProdDetailContainer = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, isFetching } = useGetProduct(id ?? null);

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
