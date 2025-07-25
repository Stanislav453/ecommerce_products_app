import { useEffect, useState, type ChangeEvent } from "react";
import { useProducts } from "../../Store/useProducts";
import type { ProductType } from "../../type";
import type { useProductsType } from "../../Store/useProducts";

interface shopFilterType {
  setShopList: (product: ProductType[]) => void;
}

export const ShopFilter = ({ setShopList }: shopFilterType) => {
  const products = useProducts((state: useProductsType) => state.products);

  const shopListCategory = [
    "All",
    ...new Set(products.map((product: ProductType) => product.category)),
  ];

  const [categorySelect, setCategorySelect] = useState(shopListCategory[0]);

  const categorySelectHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategorySelect(event.target.value);
  };

  const filterList =
    categorySelect == shopListCategory[0]
      ? products
      : products.filter(
          (product: ProductType) => product.category == categorySelect
        );

  useEffect(() => {
    setShopList(filterList);
  }, [categorySelect]);

  return (
    <select name="category-filter" onChange={categorySelectHandler}>
      <option value="">Please filter category</option>
      {shopListCategory.map((category: string, index: number) => {
        return (
          <option key={index} value={category}>
            {category}
          </option>
        );
      })}
    </select>
  );
};
