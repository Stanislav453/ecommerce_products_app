import React from "react";
import { useProducts } from "../../Store/useProducts";

export const ShopFilter = () => {
  const products = useProducts((state: any) => state.products);

  const shopList =
    categorySelect == shopListCategory[0]
      ? products
      : products.filter((product) => product.category == categorySelect);

  const [categorySelect, setCategorySelect] = useState(shopListCategory[0]);

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
