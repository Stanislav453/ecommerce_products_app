import { useState } from "react";
import { ShopItems } from "../../Components/Shop/ShopItems";
import { PageSection } from "../../Components/PageSection";
import { Category, type ProductSummaryResponse } from "../../type";
import { NavLink } from "react-router";
import { ShopFilter } from "./ShopFilter";
import { useFetch } from "../../api/ApiActions/useFetch";
import { fetchArgs } from "../../fetchArgs";

export const ShopContainer = () => {
  const [selectedValue, setselectedValue] = useState<Category>(Category.All);

  const { args } = fetchArgs({ selectedValue });

  const { data, loading, error } = useFetch<ProductSummaryResponse>(args);

  if (error)
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (data === null) return null;

  return (
    <section>
      <PageSection>
        <h1 className="font-bold text-3xl">Shop</h1>
      </PageSection>
      <div className="flex flex-col items-center py-4 sm:py-0 sm:pb-4 sm:pt-20">
        <div className="w-full  max-w-screen-xl flex flex-col sm:flex-row  gap-12 sm:gap-0 justify-center sm:justify-between items-center px-3">
          <div className="flex">
            This is products
            {/* <p>Showing 1 - {response.products.length} results</p> */}
          </div>
          <ShopFilter setselectedValue={setselectedValue} />
        </div>
      </div>
      //
      <ShopItems shopList={data.products} />
    </section>
  );
};
