import { NavLink } from "react-router-dom";
import { useState } from "react";
import { ShopItems } from "../../Components/Shop/ShopItems";
import { PageSection } from "../../Components/PageSection";
import type { ProductSummary } from "../../type";
import { ShopFilter } from "../../Components/Shop/ShopFilter";

export const Shop = () => {
  const [shopList, setShopList] = useState<ProductSummary[]>([]);

  if (shopList == null)
    return (
      <div className="flex flex-col w-full items-center mt-28">
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

  return (
    <section>
      <PageSection>Shop</PageSection>
      <div className="flex flex-col items-center py-5">
        <div className="w-full max-w-screen-lg flex justify-between px-3">
          <div className="flex">
            <p>Showing 1 - {shopList?.length} results</p>
          </div>
          <ShopFilter setShopList={setShopList} />
        </div>
      </div>
      <ShopItems shopList={shopList} />
    </section>
  );
};
