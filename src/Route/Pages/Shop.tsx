import { useProducts } from "../../Store/useProducts";
import loadingSpinner from "/public/loadingSpinner.svg";
import type { ProductType } from "../../type";
import { useError } from "../../Store/useError";
import { NavLink } from "react-router-dom";
import { PageSection } from "../../Components/PageSection";
import { useState } from "react";
import { ShopItems } from "../../Components/Shop/ShopItems";

export const Shop = () => {
  const products = useProducts((state: any) => state.products);
  const apiError = useError((state) => state.apiError);

  const shopListCategory = [
    "All",
    ...new Set(products.map((product: any) => product.category)),
  ];

  const [categorySelect, setCategorySelect] = useState(shopListCategory[0]);

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

  const shopList =
    categorySelect == shopListCategory[0]
      ? products
      : products.filter((product) => product.category == categorySelect);

  const categorySelectHandler = (event) => {
    setCategorySelect(event.target.value);
  };

  return (
    <section>
      <PageSection>Shop</PageSection>
      <div className="flex flex-col items-center py-5">
        <div className="w-full max-w-screen-lg flex justify-between">
          <div className="flex">
            <p>Showing 1 - {shopList.length} results</p>
          </div>
          <select name="category-filter" onChange={categorySelectHandler}>
            <option value="">Please filter category</option>
            {shopListCategory.map((category: any, index: number) => {
              return (
                <option key={index} value={category}>
                  {category}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <ShopItems shopList={shopList} />
    </section>
  );
};
