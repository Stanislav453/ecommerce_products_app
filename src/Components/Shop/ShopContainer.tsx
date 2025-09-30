import { useState } from "react";
import { ShopItems } from "../../Components/Shop/ShopItems";
import { PageSection } from "../../Components/PageSection";
import { Category, ProductSummaryResponse } from "../../type";
import { Link, NavLink } from "react-router";
import { ShopFilter } from "./ShopFilter";
import loadingSpinner from "../../../public/loadingSpinner.svg";
import { fetchShopArgs } from "./fetchShopArgs";
import { fetchProducts } from "../../api/fetchProducts";
import { useQuery } from "@tanstack/react-query";

export const ShopContainer = () => {
  const [selectedValue, setselectedValue] = useState<Category>(Category.All);

  const { args } = fetchShopArgs({ selectedValue });

  // const { data, loading, error } = useFetch<ProductSummaryResponse>(args);

  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (data == null) return null;

  console.log(data?.data.products);

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

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <img className="w-11" src={loadingSpinner} alt="loadingSpinner" />
      </div>
    );
  }

  if (data === null) return null;

  return (
    <section>
      <PageSection>
        {/* <ul className="flex gap-2 mb-3">
          <li>
            <Link to="/">
              <span className="underline text-theme-gray-font">Home</span> /{" "}
            </Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
        </ul> */}
        <h1 className="font-bold text-3xl">Shop</h1>
      </PageSection>
      <div className="flex flex-col items-center py-4 sm:py-0 sm:pb-4 sm:pt-20">
        <div className="w-full  max-w-screen-xl flex flex-col sm:flex-row  gap-12 sm:gap-0 justify-center sm:justify-between items-center px-3">
          <div className="flex">
            This is products
            <p>Showing 1 - {data.data.products.length} results</p>
          </div>
          <ShopFilter setselectedValue={setselectedValue} />
        </div>
      </div>
      <ShopItems shopList={data.data.products} />
    </section>
  );
};
