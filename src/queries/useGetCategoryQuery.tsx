import { useQuery } from "@tanstack/react-query";
import { getProductsCategory } from "../api/apiRequestRepository";
import { Category } from "../type";

export const useGetCategoryQuery = (category: Category) => {
  return useQuery({
    queryKey: ["product", category],
    queryFn: () => getProductsCategory(category),
  });
};
