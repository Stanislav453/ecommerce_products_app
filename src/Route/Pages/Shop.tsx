// import { UseFetchData } from "../../api/ApiActions/FetchProducts";

import { useProducts } from "../../Store/useProducts";
import loadingSpinner from "/public/loadingSpinner.svg";
import type { ProductType } from "../../type";

export const Shop = () => {
  const products = useProducts((state: any) => state.products);

  if (products.length == 0)
    return (
      <div className="flex w-full justify-center mt-28">
        <img className="w-12" src={loadingSpinner} alt="loading" />
      </div>
    );

  return (
    <div>
      {products.map((product: ProductType, index: number) => {
        return (
          <>
            <h3>{product.title}</h3>
            <img src={product.thumbnail} alt={product.title} />
          </>
        );
      })}
    </div>
  );
};
