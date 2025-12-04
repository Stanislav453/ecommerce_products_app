import { useQuery } from '@tanstack/react-query';
import { getProduct } from '../../api/apiRequestRepository';

export const useGetProduct = (id: string | null) => {

   return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id || ''),
  });
}

