import { useInfiniteQuery } from "@tanstack/react-query";
import { getProductsCategory } from "../../api/apiRequestRepository";
import { Category, ProductPage } from "../../type";

export const useGetCategoryQuery = (category: Category) => {
  return useInfiniteQuery<ProductPage, Error>({
    queryKey: ["product", category],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      getProductsCategory(category, Number(pageParam)),
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.limit;
      if (nextSkip >= lastPage.total) return undefined;
      return nextSkip;
    },
  });
};
