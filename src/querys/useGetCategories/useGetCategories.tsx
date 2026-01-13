import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../api/apiRequestRepository";

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};
