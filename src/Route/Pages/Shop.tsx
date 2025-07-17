import { useProducts } from "../../Store/useProducts";
import loadingSpinner from "/public/loadingSpinner.svg";
import { useError } from "../../Store/useError";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { ShopItems } from "../../Components/Shop/ShopItems";
import { ShopFilter } from "../../Components/Shop/ShopFilter";
import { PageSection } from "../../Components/PageSection";

export const Shop = () => {
  const products = useProducts((state: any) => state.products);
  const apiError = useError((state) => state.apiError);
  const [shopList, setShopList] = useState(products);

  if (apiError !== "")
    return (
      <div className="flex flex-col w-full items-center mt-28">
        <p>{apiError}</p>
        <p className="text-red-600">Something is wrong.</p>
        <p>
          Please go to{" "}
          <NavLink to="/" className="font-bold underline	">
            Home
          </NavLink>{" "}
          and try it later.
        </p>
      </div>
    );

  if (products.length == 0)
    return (
      <div className="flex w-full justify-center mt-28">
        <img className="w-12" src={loadingSpinner} alt="loading" />
      </div>
    );

  return (
    <section>
      <PageSection>Shop</PageSection>
      <div className="flex flex-col items-center py-5">
        <div className="w-full max-w-screen-lg flex justify-between px-3">
          <div className="flex">
            <p>Showing 1 - {shopList.length} results</p>
          </div>
          <ShopFilter setShopList={setShopList} />
        </div>
      </div>
      <ShopItems shopList={shopList} />
    </section>
  );
};
