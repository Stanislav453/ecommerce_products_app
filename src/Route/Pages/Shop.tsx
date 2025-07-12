// import { UseFetchData } from "../../api/ApiActions/FetchProducts";

import { useProducts } from "../../Store/useProducts";
import type { ProductType } from "../../type";

export const Shop = () => {
  const products = useProducts((state: any) => state.products);

  // if (!products) return "Loading...";

  const getShopList = () => {
    if (products.length != 0) {
      return products.map((product: ProductType, index: number) => {
        return (
          <>
            <h3>{product.title}</h3>
            <img src={product.thumbnail} alt={product.title} />
          </>
        );
      });
    } else {
      return <div>Loading...</div>;
    }
  };

  return <div>{getShopList()}</div>;
};
