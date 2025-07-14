import { useEffect, useState } from "react";
import { useProducts } from "../../Store/useProducts";
import type { ProductType } from "../../type";

interface shopFilterType {
  setShopList: (product: ProductType) => void;
}

export const ShopFilter = ({ setShopList }: shopFilterType) => {
  const products = useProducts((state: any) => state.products);

  const shopListCategory = [
    "All",
    ...new Set(products.map((product: any) => product.category)),
  ];

  const [categorySelect, setCategorySelect] = useState(shopListCategory[0]);

  const categorySelectHandler = (event: any) => {
    setCategorySelect(event.target.value);
  };

  const filterList =
    categorySelect == shopListCategory[0]
      ? products
      : products.filter((product: any) => product.category == categorySelect);

  useEffect(() => {
    setShopList(filterList);
  }, [categorySelect]);

  return (
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
  );
};
