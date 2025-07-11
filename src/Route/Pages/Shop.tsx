// import { UseFetchData } from "../../api/ApiActions/FetchProducts";

import { useProducts } from "../../Store/useProducts";

export const Shop = () => {
  const products = useProducts((state: any) => state.products);


  if (!products) return "Loading...";

  return (
    <div>
      {/* {shopList.products.map((product, index) => {
        return <h3>{product.title}</h3>;
      })} */}
    </div>
  );
};
