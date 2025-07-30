import { useEffect, useState, type ChangeEvent } from "react";
import type {
  Category,
  ProductSummary,
  ProductSummaryResponse,
} from "../../type";
import { UseFetchData } from "../../api/ApiActions/UseFetchData";

interface ShopFilterProps {
  setShopList: (product: ProductSummary[]) => void;
}

export const ShopFilter = ({ setShopList }: ShopFilterProps) => {
  const [actualFilterValue, setActualFilterValue] = useState<string | null>(
    "All"
  );

  const shopListCategory = [
    "All",
    "beauty",
    "fragrances",
    "furniture",
    "groceries",
  ] as Category[];

  const categoriesURL =
    actualFilterValue === "All"
      ? "/products?select=id,title,thumbnail,price,rating,description"
      : `/products/category/${actualFilterValue}?select=id,title,thumbnail,price,rating,description`;

  const { data: response } =
    UseFetchData<ProductSummaryResponse>(categoriesURL);

  const categorySelectHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setActualFilterValue(event.target.value);
    if (response) {
      setShopList(response.products);
    }
  };

  useEffect(() => {
    if (response) {
      setShopList(response.products);
    }
  }, [response]);

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
