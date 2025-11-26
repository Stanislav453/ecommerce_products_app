import { useQuery } from "@tanstack/react-query";
import { getProductsCategory } from "../../../apiRequestRepository";
import { Category } from "../../../type";

export const UseGetCategoryQuery = (category: Category) => {
  return useQuery({
    queryKey: ["product", category],
    queryFn: () => getProductsCategory(category),
  });
};
