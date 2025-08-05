import { NavLink } from "react-router-dom";
import { useState } from "react";
import { ShopItems } from "../../Components/Shop/ShopItems";
import { PageSection } from "../../Components/PageSection";
import type { ProductSummary } from "../../type";
import { ShopFilterFetcher } from "../../Components/Shop/ShopFilterFetcher";

export const ShopContainer = () => {
  const [shopList, setShopList] = useState<ProductSummary[]>([]);

  if (shopList == null)
    return (
      <div className="flex flex-col w-full items-center mt-28">
        <p className="text-red-600">Something is wrong.</p>
        <p>
          Please go to
          <NavLink to="/" className="font-bold underline	">
            Home
          </NavLink>
          and try it later.
        </p>
      </div>
    );

  return (
    <section>
      <PageSection>
        <h1 className="font-bold text-3xl">Shop</h1>
      </PageSection>
      <div className="flex flex-col items-center py-4 sm:py-0 sm:pb-4 sm:pt-20">
        <div className="w-full  max-w-screen-xl flex flex-col sm:flex-row  gap-12 sm:gap-0 justify-center sm:justify-between items-center px-3">
          <div className="flex">
            <p>Showing 1 - {shopList?.length} results</p>
          </div>
          <ShopFilterFetcher setShopList={setShopList} />
        </div>
      </div>
      <ShopItems shopList={shopList} />
    </section>
  );
};
