import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../api/apiRequestRepository";

export const useGetProduct = (id: string | null) => {
  return useQuery({
    queryKey: ["product", id],
    enabled: !!id,
    queryFn: () => {
      try {
        if (!id) {
          throw new Error("Product ID is missing!!");
        }
        return getProduct(id);
      } catch (e) {
        console.error(e, "Error fetching product data");
      }
    },
  });
};
