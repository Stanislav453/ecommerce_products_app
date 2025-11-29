import { useQuery } from '@tanstack/react-query';
import { getProduct } from '../../api/apiRequestRepository';

export const UseGetProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });
}

