import { useQuery } from '@tanstack/react-query';
import { getProduct } from '../../Api/apiRequestRepository';

export const useGetProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });
}

