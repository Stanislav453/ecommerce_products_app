import { useEffect, useMemo, useRef, useState } from "react";
import { Category } from "../../type";
import { useGetCategoryQuery } from "../../querys/useGetQuery/useGetCategoryQuery";
import { ShopItems } from "./ShopItems";
import { ApiCallError } from "../ui/ApiCallError";
import { ApiCallLoading } from "../ui/ApiCallLoading";
import { PageSection } from "../PageSection";
import { ShopFilter } from "./ShopFilter";
import { observe } from "./observe";

export const ShopContainer = () => {
  const [selectFilterValue, setselectedValue] = useState<Category>("all");

  const {
    data,
    error,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetCategoryQuery(selectFilterValue);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const products = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((p) => p.products);
  }, [data]);

  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el) return;

    const observerValue = observe({
      hasNextPage,
      isFetchingNextPage,
      fetchNextPage,
    });

    observerValue.observe(el);

    return () => observerValue.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isError) return <ApiCallError error={error} />;

  if (isLoading) return <ApiCallLoading />;

  if (!data) return null;

  const total = data.pages[0].total 

  return (
    <section>
      <PageSection>
        <h1 className="font-bold text-3xl">Shop</h1>
      </PageSection>

      <div className="flex flex-col items-center py-4 sm:py-0 sm:pb-4 sm:pt-20">
        <div className="w-full max-w-screen-xl flex flex-col sm:flex-row gap-12 sm:gap-0 justify-center sm:justify-between items-center px-3">
          <div className="flex flex-col">
            <p>
              {products.length} results of {total}
            </p>
          </div>

          <div>
            <ShopFilter setselectedValue={setselectedValue} />
          </div>
        </div>
      </div>

      <ShopItems shopList={products} />

      <div ref={loadMoreRef} className="h-10 w-full" />

      <div className="py-6 flex justify-center">
        {isFetchingNextPage && <div>Loading more...</div>}
        {!hasNextPage && <div>No more products</div>}
      </div>
    </section>
  );
};
