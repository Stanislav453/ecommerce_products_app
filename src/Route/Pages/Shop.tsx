import { NavLink } from "react-router-dom";
import { useState } from "react";
import { ShopItems } from "../../Components/Shop/ShopItems";
import { PageSection } from "../../Components/PageSection";
import { Category, type ProductSummaryResponse } from "../../type";
import { CategoryFilter } from "../../Components/Shop/CategoryFilter";
import { useFetchData } from "../../api/ApiActions/UseFetchData";

export const Shop = () => {

  const [filterValue, setFilterValue] = useState<Category>(
    Category.all
  );

const categoriesURL =
    filterValue === Category.all
      ? "/products?select=id,title,thumbnail,price,rating,description"
      : `/products/category/${filterValue}?select=id,title,thumbnail,price,rating,description`;

  const { data, loading, error } = useFetchData<ProductSummaryResponse>(categoriesURL);

  if(error !== null) {
    return (
      <div className="flex flex-col w-full items-center mt-28">
        <p className="text-red-600">Something is wrong.</p>
        <p className="text-red-600">{error}</p>
        <p>
          Please go to{" "}
          <NavLink to="/" className="font-bold underline	">
            Home
          </NavLink>{" "}
          and try it later.
        </p>
      </div>
    );
  }


  if(loading) {
    return (
      <div className="flex flex-col w-full items-center mt-28">
        <p className="text-blue-600">Loading...</p>
      </div>
    );
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
            <p>Showing 1 - {data?.products?.length} results</p>
          </div>
          <CategoryFilter selectedValue={filterValue} onChange={setFilterValue} />
        </div>
      </div>
      <ShopItems shopList={data?.products} />
    </section>
  );
};
